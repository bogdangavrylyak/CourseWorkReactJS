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
  getLandscapeWork,
  createLandscapeWork,
  deleteLandscapeWork,
  updateLandscapeWork,
} from "./landscape-work.service";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.LandscapeWork) {
    errors.LandscapeWork = "Please, provide LandscapeWork";
  }
  if (!values.Price) {
    errors.Price = "Please, provide Price";
  }
  if (!values.LandscapeWorkDescription) {
    errors.LandscapeWorkDescription = "Please, provide LandscapeWorkDescription";
  }
  console.info("Errors validation", errors);
  return errors;
};
const LandscapeWork = () => {
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
      return Promise.resolve(getLandscapeWork());
    },
    create: (data) => {
      return Promise.resolve(createLandscapeWork({...data, Price: +data.Price}));
    },
    update: (data) => {
      const id = data.LandscapeWork_id;
      return Promise.resolve(
        updateLandscapeWork(_.pick({...data, Price: +data.Price},
           ["LandscapeWork", "Price", "LandscapeWorkDescription"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteLandscapeWork(data.LandscapeWork_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="LandscapeWork"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="LandscapeWork" label="LandscapeWork" placeholder="LandscapeWork" />
          <Field name="Price" label="Price" placeholder="Price" />
          <Field name="LandscapeWorkDescription" label="LandscapeWorkDescription" placeholder="LandscapeWorkDescription" />
        </Fields>
        <CreateForm
          title="Sponsor LandscapeWork"
          message="Create a new LandscapeWork!"
          trigger="Create LandscapeWork"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="LandscapeWork Update Process"
          message="Update LandscapeWork"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="LandscapeWork Delete Process"
          message="Are you sure you want to delete the LandscapeWork?"
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

export default LandscapeWork;
