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
  createSSSA,
  deleteSSSA,
  getMaterialCharacteristicValue,
  updateSSSA,
} from "./material-characteristic-value.service";
import { getMaterial } from "../material/material.service";
import { getCharacteristicValue } from "../characteristic-value/characteristic-value.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};

  if (!values.Material_id) {
    errors.Material_id = "Please, provide Material_id";
  }

  if (!values.CharacteristicValue_id) {
    errors.CharacteristicValue_id = "Please, provide CharacteristicValue_id";
  }
  console.info("Errors validation", errors);
  return errors;
};
const MaterialCharacteristicValue = () => {
  const [loading, setLoading] = React.useState(true);
  const [material, setMaterial] = React.useState([]);
  const [characteristicValue, setCharacteristicValue] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const m = await getMaterial();
    const cv = await getCharacteristicValue();
    setMaterial(m || []);
    setCharacteristicValue(cv || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      getMaterialCharacteristicValue().then(mcv => console.log(mcv));
      return Promise.resolve(getMaterialCharacteristicValue());
    },
    create: (data) => {
      return Promise.resolve(createSSSA({
        ...data,
        Material_id: +data.Material_id,
        CharacteristicValue_id: +data.CharacteristicValue_id
        })
      );
    },
    update: (data) => {
      const id = data.Material_id;
      return Promise.resolve(
        updateSSSA(
          _.pick({
            ...data,
            Material_id: +data.Material_id,
            CharacteristicValue_id: +data.CharacteristicValue_id
            }, [
            "Material_id",
            "CharacteristicValue_id",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteSSSA(data.Material_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="MaterialCharacteristicValue"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field
            name="Material_id"
            label="Material"
            placeholder="Material"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                material,
                "Select Material",
                "Material_id",
                "Name"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                material,
                "Material_id",
                "Name"
              )
            }
          />
          <Field
            name="CharacteristicValue_id"
            label="CharacteristicValue"
            placeholder="CharacteristicValue"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                characteristicValue,
                "Select CharacteristicValue",
                "CharacteristicValue_id",
                "CharacteristicValue"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                characteristicValue,
                "CharacteristicValue_id",
                "CharacteristicValue"
              )
            }
          />
        </Fields>
        <CreateForm
          title="MaterialCharacteristicValue Creation"
          message="Create a new MaterialCharacteristicValue!"
          trigger="Create MaterialCharacteristicValue"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="MaterialCharacteristicValue Update Process"
          message="Update MaterialCharacteristicValue"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="MaterialCharacteristicValue Delete Process"
          message="Are you sure you want to delete the MaterialCharacteristicValue?"
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

export default MaterialCharacteristicValue;
