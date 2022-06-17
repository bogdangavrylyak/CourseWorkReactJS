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
  createWorkProcessEmployee,
  deleteWorkProcessEmployee,
  getWorkProcessEmployee,
  updateWorkProcessEmployee,
} from "./work-process-employee.service";
import { getWorkProcess } from "../work-process/work-process.service";
import { getEmployee } from "../employee/employee.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};

  if (!values.Employee_id) {
    errors.Employee_id = "Please, provide Employee_id";
  }

  if (!values.WorkProcess_id) {
    errors.WorkProcess_id = "Please, provide WorkProcess_id";
  }
  console.info("Errors validation", errors);
  return errors;
};
const WorkProcessEmployee = () => {
  const [loading, setLoading] = React.useState(true);
  const [employee, setEmployee] = React.useState([]);
  const [workProcess, setWorkProcess] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const m = await getEmployee();
    const cv = await getWorkProcess();
    setEmployee(m || []);
    setWorkProcess(cv || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      getWorkProcessEmployee().then(mcv => console.log(mcv));
      return Promise.resolve(getWorkProcessEmployee());
    },
    create: (data) => {
      return Promise.resolve(createWorkProcessEmployee({
        ...data,
        Employee_id: +data.Employee_id,
        WorkProcess_id: +data.WorkProcess_id
        })
      );
    },
    update: (data) => {
      const id = data.WorkProcess_id;
      return Promise.resolve(
        updateWorkProcessEmployee(
          _.pick({
            ...data,
            Employee_id: +data.Employee_id,
            WorkProcess_id: +data.WorkProcess_id
            }, [
            "Employee_id",
            "WorkProcess_id",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteWorkProcessEmployee(data.WorkProcess_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="WorkProcessEmployee"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field
            name="Employee_id"
            label="Name"
            placeholder="Name"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                employee,
                "Select Employee",
                "Employee_id",
                "Name"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                employee,
                "Employee_id",
                "Name"
              )
            }
          />
          <Field
            name="WorkProcess_id"
            label="Description"
            placeholder="WorkProcess"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                workProcess,
                "Select WorkProcess",
                "WorkProcess_id",
                "Description"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                workProcess,
                "WorkProcess_id",
                "Description"
              )
            }
          />
        </Fields>
        <CreateForm
          title="WorkProcessEmployee Creation"
          message="Create a new WorkProcessEmployee!"
          trigger="Create WorkProcessEmployee"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="WorkProcessEmployee Update Process"
          message="Update WorkProcessEmployee"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="WorkProcessEmployee Delete Process"
          message="Are you sure you want to delete the WorkProcessEmployee?"
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

export default WorkProcessEmployee;
