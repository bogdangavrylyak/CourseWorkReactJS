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
  getDeliveredMaterials,
  createDeliveredMaterials,
  updateDeliveredMaterials,
  deleteDeliveredMaterials,
} from "./delivered-materials.service";
import { getMaterial } from "../material/material.service";
import {
  dateDisplayRenderer,
  dateRenderer,
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.DeliveredCount) {
    errors.DeliveredCount = "Please, provide DeliveredCount";
  }
  if (!values.DeliveryDate) {
    errors.DeliveryDate = "Please, provide DeliveryDate";
  }
  if (!values.MaterialRef) {
    errors.MaterialRef = "Please, provide MaterialRef";
  }

  console.info("Errors validation", errors);
  return errors;
};
const DeliveredMaterials = () => {
  const [loading, setLoading] = React.useState(true);
  const [material, setMaterial] = React.useState([]);

  const fetchPlayerClubManager = async () => {
    setLoading(true);
    const l = await getMaterial();
    setMaterial(l || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPlayerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getDeliveredMaterials());
    },
    create: (data) => {
      return Promise.resolve(createDeliveredMaterials({
        ...data,
        DeliveredCount: +data.DeliveredCount, 
        MaterialRef: +data.MaterialRef
        })
      );
    },
    update: (data) => {
      const id = data.DeliveredMaterials_id;
      return Promise.resolve(
        updateDeliveredMaterials(
          _.pick({
            ...data,
            DeliveredCount: +data.DeliveredCount, 
            MaterialRef: +data.MaterialRef
            }, [
            "DeliveredCount",
            "DeliveryDate",
            "MaterialRef",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteDeliveredMaterials(data.DeliveredMaterials_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="DeliveredMaterials"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="DeliveredCount" label="DeliveredCount" placeholder="DeliveredCount" />
          <Field
            name="DeliveryDate"
            label="DeliveryDate"
            placeholder="DeliveryDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "DeliveryDate")
            }
          />
          <Field
            name="MaterialRef"
            label="Name"
            placeholder="Name"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                material,
                "Select MaterialRef",
                "MaterialRef",
                "Name"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, material, "MaterialRef", "Name")
            }
          />
        </Fields>
        <CreateForm
          title="DeliveredMaterials Creation"
          message="Create a new DeliveredMaterials!"
          trigger="Create DeliveredMaterials"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="DeliveredMaterials Update Process"
          message="Update DeliveredMaterials"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="DeliveredMaterials Delete Process"
          message="Are you sure you want to delete the DeliveredMaterials?"
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

export default DeliveredMaterials;
