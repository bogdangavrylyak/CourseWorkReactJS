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
  getMaterialType,
  createMaterialType,
  updateMaterialType,
  deleteMaterialType,
} from "./material-type.service";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.MaterialType) {
    errors.MaterialType = "Please, provide MaterialType";
  }
  console.info("Errors validation", errors);
  return errors;
};
const MaterialType = () => {
  const [loading, setLoading] = React.useState(true);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getMaterialType());
    },
    create: (data) => {
      return Promise.resolve(createMaterialType(data));
    },
    update: (data) => {
      const id = data.MaterialType_id;
      return Promise.resolve(
        updateMaterialType(_.pick(data, ["MaterialType"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteMaterialType(data.MaterialType_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="MaterialType"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="MaterialType" label="MaterialType" placeholder="MaterialType" />
        </Fields>
        <CreateForm
          title="MaterialType Creation"
          message="Create a new MaterialType!"
          trigger="Create MaterialType"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="MaterialType Update Process"
          message="Update MaterialType"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="MaterialType Delete Process"
          message="Are you sure you want to delete the MaterialType?"
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

export default MaterialType;
