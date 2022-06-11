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
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "./services/employee.service";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.Name) {
    errors.Name = "Please, provide employee's Name";
  }
  if (!values.Surname) {
    errors.Surname = "Please, provide employee's Surname";
  }
  if (!values.Password) {
    errors.Email = "Please, provide employee's Password";
  }
  if (!values.Position) {
    errors.phone = "Please, provide employee's Position";
  }
  if (!values.DepartmentName) {
    errors.phone = "Please, provide employee's DepartmentName";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Employee = () => {
  // const [loading, setLoading] = React.useState(true);

  // const fetchLeaguesAndCities = async () => {
  //   setLoading(true);
  //   setLoading(false);
  // };

  React.useEffect(() => {
    // fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      getEmployee().then((res) => {
        console.log(res);
      });
      return Promise.resolve(getEmployee());
    },
    create: (data) => {
      return Promise.resolve(createEmployee(data));
    },
    update: (data) => {
      const id = data.agentId;
      return Promise.resolve(
        updateEmployee(
          _.pick(data, ["Name", "Surname", "Password", "Position"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteEmployee(data.Employee_id));
    },
  };

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Employee"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="Name" label="Name" placeholder="Name" />
          <Field name="Surname" label="Surname" placeholder="Surname" />
          <Field name="Password" label="Password" placeholder="Password" />
          <Field name="Position" label="Position" placeholder="Position" />
          <Field
            name="DepartmentName"
            label="DepartmentName"
            placeholder="DepartmentName"
          />
        </Fields>
        <CreateForm
          title="Employee Creation"
          message="Create a new Employee!"
          trigger="Create Employee"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Employee Update Process"
          message="Update Employee"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Employee Delete Process"
          message="Are you sure you want to delete the Employee?"
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

export default Employee;
