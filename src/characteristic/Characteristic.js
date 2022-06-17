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
  getCharacteristic,
  createCharacteristic,
  deleteCharacteristic,
  updateCharacteristic,
} from "./characteristic.service";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.haracteristic) {
    errors.haracteristic = "Please, provide haracteristic";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Characteristic = () => {
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
      return Promise.resolve(getCharacteristic());
    },
    create: (data) => {
      return Promise.resolve(createCharacteristic(data));
    },
    update: (data) => {
      const id = data.haracteristic_id;
      return Promise.resolve(
        updateCharacteristic(_.pick(data, ["haracteristic"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteCharacteristic(data.haracteristic_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Characteristic"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="haracteristic" label="Characteristic" placeholder="haracteristic" />
        </Fields>
        <CreateForm
          title="Characteristic Creation"
          message="Create a new Characteristic!"
          trigger="Create Characteristic"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Characteristic Update Process"
          message="Update Characteristic"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Characteristic Delete Process"
          message="Are you sure you want to delete the Characteristic?"
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

export default Characteristic;
