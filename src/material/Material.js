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
import { getSort } from "../sort/sort.service";
import { getSoil } from "../Soil/soil.service";
import {
  createMaterial,
  deleteMaterial,
  getMaterial,
  updateMaterial,
} from "./material.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Name) {
    errors.Name = "Please, provide Name";
  }

  if (!values.Price) {
    errors.Price = "Please, provide Price";
  }

  if (!values.TimeToGrow) {
    errors.TimeToGrow = "Please, provide TimeToGrow";
  }

  if (!values.WateringFrequency) {
    errors.WateringFrequency = "Please, provide WateringFrequency";
  }

  if (!values.BrightnessPreffered) {
    errors.BrightnessPreffered = "Please, provide BrightnessPreffered";
  }

  if (!values.SortRef) {
    errors.SortRef = "Please, provide SortRef";
  }

  if (!values.SoilRef) {
    errors.SoilRef = "Please, provide SoilRef";
  }

  console.info("Errors validation", errors);
  return errors;
};
const Material = () => {
  const [loading, setLoading] = React.useState(true);
  const [sort, setSort] = React.useState([]);
  const [soil, setSoil] = React.useState([]);

  const fetchAgents = async () => {
    setLoading(true);
    const sort = await getSort();
    const soil = await getSoil();
    setSort(sort || []);
    setSoil(soil || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAgents();
  }, []);

  const service = {
    fetchItems: (payload) => {
      getMaterial().then(mat => console.log(mat));
      return Promise.resolve(getMaterial());
    },
    create: (data) => {
      return Promise.resolve(createMaterial({...data, Price: +data.Price, SoilRef: +data.SoilRef, SortRef: +data.SortRef}));
    },

    update: (data) => {
      const id = data.Material_id;
      return Promise.resolve(
        updateMaterial(
          _.pick({...data, Price: +data.Price, SoilRef: +data.SoilRef, SortRef: +data.SortRef}, [
            "Name",
            "Price",
            "TimeToGrow",
            "WateringFrequency",
            "BrightnessPreffered",
            "SortRef",
            "SoilRef",
            "CharacteristicValueRef",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteMaterial(data.Material_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Materials"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="Name" label="Name" placeholder="Name" />
          <Field name="Price" label="Price" placeholder="Price" />
          <Field name="TimeToGrow" label="TimeToGrow" placeholder="TimeToGrow" />
          <Field name="WateringFrequency" label="WateringFrequency" placeholder="WateringFrequency" />
          <Field name="BrightnessPreffered" label="BrightnessPreffered" placeholder="BrightnessPreffered" />
          <Field
            name="SortRef"
            label="Sort"
            placeholder="Sort"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                sort,
                "Select Sort",
                "SortRef",
                "Sort"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, sort, "SortRef", "Sort")
            }
          />
          <Field
            name="SoilRef"
            label="Soil"
            placeholder="Soil"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                soil,
                "Select Soil",
                "SoilRef",
                "Soil"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                soil,
                "SoilRef",
                "Soil"
              )
            }
          />
        </Fields>
        <CreateForm
          title="Material Creation"
          message="Create a new Material!"
          trigger="Create Material"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Material Update Process"
          message="Update Material"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Material Delete Process"
          message="Are you sure you want to delete the Material?"
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

export default Material;
