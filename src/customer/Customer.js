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
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "./customer.servise";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Name) {
    errors.Name = "Please, provide Name";
  }
  if (!values.Surname) {
    errors.Surname = "Please, provide Surname";
  }
  if (!values.Phone) {
    errors.Phone = "Please, provide Phone";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Customer = () => {
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
      return Promise.resolve(getCustomer());
    },
    create: (data) => {
      return Promise.resolve(createCustomer(data));
    },
    update: (data) => {
      const id = data.Customer_id;
      return Promise.resolve(
        updateCustomer(_.pick(data, ["Name", "Surname", "Phone"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteCustomer(data.Customer_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Customer"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="Name" label="Name" placeholder="Name" />
          <Field name="Surname" label="Surname" placeholder="Surname" />
          <Field name="Phone" label="Phone" placeholder="Phone" />
        </Fields>
        <CreateForm
          title="Customer Creation"
          message="Create a new Customer!"
          trigger="Create Customer"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Customer Update Process"
          message="Update Customer"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Customer Delete Process"
          message="Are you sure you want to delete the Customer?"
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

export default Customer;
