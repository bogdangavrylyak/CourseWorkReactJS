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
import "./index.css";
import Loader from "./Loader";
import {
  getCityList,
  createCity,
  deleteCity,
  updateCity,
} from "./services/city.service";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.cityName) {
    errors.cityName = "Please, provide city's name";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Cityes = () => {
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
      const id = data.cityId;
      return Promise.resolve(updateCity(_.pick(data, ["cityName"]), id));
    },
    delete: (data) => {
      return Promise.resolve(deleteCity(data.cityId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Cityes"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="cityName" label="Name" placeholder="Name" />
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

export default Cityes;
