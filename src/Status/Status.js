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
  getStatus,
  createStatus,
  deleteStatus,
  updateStatus,
} from "./status.service";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Status) {
    errors.Status = "Please, provide Status";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Status = () => {
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
      return Promise.resolve(getStatus());
    },
    create: (data) => {
      return Promise.resolve(createStatus(data));
    },
    update: (data) => {
      const id = data.Status_id;
      return Promise.resolve(
        updateStatus(
          _.pick(data, ["Status"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteStatus(data.Status_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Status"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="Status" label="Status" placeholder="Status" />
        </Fields>
        <CreateForm
          title="Status Creation"
          message="Create a new Status!"
          trigger="Create Status"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Status Update Process"
          message="Update Status"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Status Delete Process"
          message="Are you sure you want to delete the Status?"
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

export default Status;
