import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import * as _ from "lodash";

// Component's Base CSS
import "../index.css";
import Loader from "../Loader";
import {
  getSort,
  createSort,
  deleteSort,
  updateSort,
} from "./sort.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";
import { getMaterialType } from "../material-type/material-type.service";

const validation = (values) => {
  const errors = {};
  if (!values.Sort) {
    errors.Sort = "Please, provide Sort";
  }
  if (!values.MaterialTypeRef) {
    errors.MaterialTypeRef = "Please, provide MaterialTypeRef";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Sort = () => {
  const [loading, setLoading] = React.useState(true);
  const [materialType, setMaterialType] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    setMaterialType((await getMaterialType()) || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getSort());
    },
    create: (data) => {
      return Promise.resolve(createSort({...data, MaterialTypeRef: +data.MaterialTypeRef}));
    },
    update: (data) => {
      const id = data.Sort_id;
      return Promise.resolve(
        updateSort(
          _.pick({...data, MaterialTypeRef: +data.MaterialTypeRef}, ["Sort", "MaterialTypeRef"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteSort(data.Sort_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Sort"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field
            name="Sort"
            label="Sort"
            placeholder="Sort"
          />
          <Field
            name="MaterialTypeRef"
            label="MaterialType"
            placeholder="MaterialType"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                materialType,
                "Select MaterialType",
                "MaterialTypeRef",
                "MaterialType"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                materialType,
                "MaterialTypeRef",
                "MaterialType"
              )
            }
          />
        </Fields>
        <CreateForm
          title="Sort Creation"
          message="Create a new Sort!"
          trigger="Create Sort"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Sort Update Process"
          message="Update Sort"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Sort Delete Process"
          message="Are you sure you want to delete the Sort?"
          trigger="Delete"
          onSubmit={(task) => service.delete(task)}
          submitText="Delete"
          validate={(values) => {
            return {};
          }}
        />
      </CRUDTable>
    </div>
  );
};

export default Sort;
