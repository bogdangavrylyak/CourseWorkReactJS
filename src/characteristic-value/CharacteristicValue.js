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
  createCharacteristicValue,
  deleteCharacteristicValue,
  getCharacteristicValue,
  updateCharacteristicValue,
} from "./characteristic-value.service";
import { getCharacteristic } from "../characteristic/characteristic.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};

  if (!values.CharacteristicValue) {
    errors.CharacteristicValue = "Please, provide CharacteristicValue";
  }

  if (!values.CharacteristicRef) {
    errors.CharacteristicRef = "Please, provide CharacteristicRef";
  }

  console.info("Errors validation", errors);
  return errors;
};
const CharacteristicValue = () => {
  const [loading, setLoading] = React.useState(true);
  const [characteristicRef, setCharacteristicRef] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getCharacteristic();
    setCharacteristicRef(l || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getCharacteristicValue());
    },
    create: (data) => {
      return Promise.resolve(createCharacteristicValue({...data, CharacteristicRef: +data.CharacteristicRef}));
    },
    update: (data) => {
      const id = data.CharacteristicValue_id;
      return Promise.resolve(
        updateCharacteristicValue(
          _.pick({...data, CharacteristicRef: +data.CharacteristicRef}, ["CharacteristicValue", "CharacteristicRef"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteCharacteristicValue(data.CharacteristicValue_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="CharacteristicValue"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="CharacteristicValue" label="CharacteristicValue" placeholder="CharacteristicValue" />
          <Field
            name="CharacteristicRef"
            label="haracteristic"
            placeholder="haracteristic"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                characteristicRef,
                "Select haracteristic",
                "CharacteristicRef",
                "haracteristic"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                characteristicRef,
                "CharacteristicRef",
                "haracteristic"
              )
            }
          />
        </Fields>
        <CreateForm
          title="CharacteristicValue Creation"
          message="Create a new CharacteristicValue!"
          trigger="Create CharacteristicValue"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="CharacteristicValue Update Process"
          message="Update CharacteristicValue"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="CharacteristicValue Delete Process"
          message="Are you sure you want to delete the CharacteristicValue?"
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

export default CharacteristicValue;
