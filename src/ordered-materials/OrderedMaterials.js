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
  getCoachResponsibilityList,
  createCoachResponsibility,
  deleteCoachResponsibility,
  updateCoachResponsibility,
} from "./ordered-materials.service";
import { getOrder } from "../order/order.service";
import { getMaterial } from "../material/material.service";
import { styles, selectRenderer, selectDisplayRenderer } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.OrderRef) {
    errors.OrderRef = "Please, provide OrderRef";
  }
  if (!values.MaterialRef) {
    errors.MaterialRef = "Please, provide MaterialRef";
  }
  if (!values.Price) {
    errors.Price = "Please, provide Price";
  }
  if (!values.Count) {
    errors.Count = "Please, provide Count";
  }
  console.info("Errors validation", errors);
  return errors;
};
const OrderedMaterials = () => {
  const [loading, setLoading] = React.useState(true);
  const [order, setOrder] = React.useState(true);
  const [material, setMaterial] = React.useState(true);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const o = await getOrder();
    setOrder(o || []);
    const e = await getMaterial();
    setMaterial(e || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getCoachResponsibilityList());
    },
    create: (data) => {
      return Promise.resolve(createCoachResponsibility({
        ...data, 
        OrderRef: +data.OrderRef,
        MaterialRef: +data.MaterialRef,
        Price: +data.Price,
        Count: +data.Count,
      }));
    },
    update: (data) => {
      const id = data.OrderedMaterials_id;
      return Promise.resolve(
        updateCoachResponsibility(
          _.pick({
            ...data, 
            OrderRef: +data.OrderRef,
            MaterialRef: +data.MaterialRef,
            Price: +data.Price,
            Count: +data.Count,
          }, ["OrderRef", "MaterialRef", "Price", "Count"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(
        deleteCoachResponsibility(data.OrderedMaterials_id)
      );
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="OrderedMaterial"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="Price"
            label="Price"
            placeholder="Price"
          />
          <Field name="Count" label="Count" placeholder="Count" />
          <Field
            name="OrderRef"
            label="OrderNumber"
            placeholder="OrderNumber"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                order,
                "Select OrderNumber",
                "OrderRef",
                "OrderNumber"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                order,
                "OrderRef",
                "OrderNumber"
              )
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
                "Select Name",
                "MaterialRef",
                "Name"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                material,
                "MaterialRef",
                "Name"
              )
            }
          />
        </Fields>
        <CreateForm
          title="OrderedMaterial Creation"
          message="Create a new OrderedMaterial!"
          trigger="Create OrderedMaterial"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="OrderedMaterial Update Process"
          message="Update OrderedMaterial"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="OrderedMaterial Delete Process"
          message="Are you sure you want to delete the OrderedMaterial?"
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

export default OrderedMaterials;
