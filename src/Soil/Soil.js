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
  getSoil,
  createSoil,
  deleteSoil,
  updateSoil,
} from "./soil.service";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Soil) {
    errors.Soil = "Please, provide Soil";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Soil = () => {
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
      return Promise.resolve(getSoil());
    },
    create: (data) => {
      return Promise.resolve(createSoil(data));
    },
    update: (data) => {
      const id = data.Soil_id;
      return Promise.resolve(updateSoil(_.pick(data, ["Soil"]), id));
    },
    delete: (data) => {
      return Promise.resolve(deleteSoil(data.Soil_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <div>
        <CRUDTable
          caption="Soil"
          fetchItems={(payload) => service.fetchItems(payload)}
        >
          <Fields>
            <Field name="Soil" label="Soil" placeholder="Soil" />
          </Fields>
          <CreateForm
            title="Soil Creation"
            message="Create a new Soil!"
            trigger="Create Soil"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              return validation(values);
            }}
          />

          <UpdateForm
            title="Soil Update Process"
            message="Update Soil"
            trigger="Update"
            onSubmit={(task) => service.update(task)}
            submitText="Update"
            validate={(values) => {
              return validation(values);
            }}
          />

          <DeleteForm
            title="Soil Delete Process"
            message="Are you sure you want to delete the Soil?"
            trigger="Delete"
            onSubmit={(task) => service.delete(task)}
            submitText="Delete"
            validate={(values) => {
              return {};
            }}
          />
        </CRUDTable>
      </div>
    </div>
  );
};

export default Soil;
