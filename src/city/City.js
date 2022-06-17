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
  getCityList,
  createCity,
  deleteCity,
  updateCity,
} from "./city.service";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.City) {
    errors.City = "Please, provide City";
  }
  console.info("Errors validation", errors);
  return errors;
};
const City = () => {
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
      return Promise.resolve(getCityList());
    },
    create: (data) => {
      return Promise.resolve(createCity(data));
    },
    update: (data) => {
      const id = data.City_id;
      return Promise.resolve(updateCity(_.pick(data, ["City"]), id));
    },
    delete: (data) => {
      return Promise.resolve(deleteCity(data.City_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="City"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="City" label="City" placeholder="City" />
        </Fields>
        <CreateForm
          title="City Creation"
          message="Create a new city!"
          trigger="Create city"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="City Update Process"
          message="Update City"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="City Delete Process"
          message="Are you sure you want to delete the city?"
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

export default City;
