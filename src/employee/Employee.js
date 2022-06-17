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
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "./employee.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";
import { getDepartment } from "../department/department.service";
import { getPosition } from "../position/position.service";

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
  if (!values.DepartmentRef) {
    errors.DepartmentRef = "Please, provide employee's DepartmentRef";
  }
  if (!values.PositionRef) {
    errors.PositionRef = "Please, provide employee's PositionRef";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Employee = () => {
  const [loading, setLoading] = React.useState(true);
  const [departments, setDepartments] = React.useState([]);
  const [positions, setPositions] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    setDepartments((await getDepartment()) || []);
    setPositions((await getPosition()) || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      getEmployee().then((res) => {
        console.log(res);
      });
      return Promise.resolve(getEmployee());
    },
    create: (data) => {
      return Promise.resolve(createEmployee({...data, DepartmentRef: +data.DepartmentRef, PositionRef: +data.PositionRef}));
    },
    update: (data) => {
      const id = data.Employee_id;
      return Promise.resolve(
        updateEmployee(
          _.pick({...data, DepartmentRef: +data.DepartmentRef, PositionRef: +data.PositionRef},
             ["Name", "Surname", "Password", "DepartmentRef", "PositionRef"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteEmployee(data.Employee_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Employee"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="Name" label="Name" placeholder="Name" />
          <Field name="Surname" label="Surname" placeholder="Surname" />
          <Field name="Email" label="Email" placeholder="Email" />
          <Field name="Password" label="Password" placeholder="Password" />
          <Field
            name="DepartmentRef"
            label="Department"
            placeholder="Department"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                departments,
                "Select department name",
                "DepartmentRef",
                "DepartmentName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                departments,
                "DepartmentRef",
                "DepartmentName"
              )
            }
          />
          <Field
            name="PositionRef"
            label="Position"
            placeholder="Position"
            type="number"
            render={(data) =>{
              console.log('postiton: ', data);
              return selectRenderer(
                data,
                positions,
                "Select position name",
                "PositionRef",
                "Position"
              )}
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                positions,
                "PositionRef",
                "Position"
              )
            }
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
