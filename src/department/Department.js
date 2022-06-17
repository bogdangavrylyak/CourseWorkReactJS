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
  createDepartment,
  deleteDepartment,
  getDepartment,
  updateDepartment,
} from "./department.service";
import { getAddressList } from "../address/address.service";
import {
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.DepartmentName) {
    errors.DepartmentName = "Please, provide DepartmentName";
  }

  if (!values.AddressRef) {
    errors.AddressRef = "Please, provide AddressRef";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Department = () => {
  const [loading, setLoading] = React.useState(true);
  const [address, setAddress] = React.useState([]);

  const fetchTrainerClubManager = async () => {
    setLoading(true);
    const a = await getAddressList();
    console.log(a)
    setAddress(a || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTrainerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getDepartment());
    },
    create: (data) => {
      return Promise.resolve(createDepartment({...data, AddressRef: +data.AddressRef}));
    },
    update: (data) => {
      const id = data.Department_id;
      return Promise.resolve(
        updateDepartment(
          _.pick({...data, AddressRef: +data.AddressRef}, [
            "DepartmentName",
            "AddressRef",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteDepartment(data.Department_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Department"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="DepartmentName"
            label="DepartmentName"
            placeholder="DepartmentName"
          />
          <Field
            name="AddressRef"
            label="Address"
            placeholder="Address"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                address,
                "Select AddressRef",
                "AddressRef",
                "Address"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, address, "AddressRef", "Address")
            }
          />
        </Fields>
        <CreateForm
          title="Department Creation"
          message="Create a new Department!"
          trigger="Create Department"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Department Update Process"
          message="Update Department"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Department Delete Process"
          message="Are you sure you want to delete the Department?"
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

export default Department;
