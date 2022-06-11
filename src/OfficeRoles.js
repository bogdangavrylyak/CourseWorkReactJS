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
  getOfficeRoleList,
  createOfficeRole,
  deleteOfficeRole,
  updateOfficeRole,
} from "./services/officeRole.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.officeRoleName) {
    errors.officeRoleName = "Please, provide OfficeRole's name";
  }
  console.info("Errors validation", errors);
  return errors;
};
const OfficeRoles = () => {
  const [loading, setLoading] = React.useState(true);

  const fetchOfficeRoles = async () => {
    setLoading(true);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchOfficeRoles();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getOfficeRoleList());
    },
    create: (data) => {
      return Promise.resolve(createOfficeRole(data));
    },
    update: (data) => {
      const id = data.officeRoleId;
      return Promise.resolve(
        updateOfficeRole(_.pick(data, ["officeRoleName"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteOfficeRole(data.officeRoleId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="OfficeRoles"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="officeRoleName"
            label="officeRoleName"
            placeholder="officeRoleName"
            // hideInCreateForm={!isAdmin}
            // hideInUpdateForm: boolean;
            // hideFromTable
          />
        </Fields>
        <CreateForm
          title="OfficeRole Creation"
          message="Create a new OfficeRole!"
          trigger="Create OfficeRole"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="OfficeRole Update Process"
          message="Update OfficeRole"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="OfficeRole Delete Process"
          message="Are you sure you want to delete the OfficeRole?"
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

export default OfficeRoles;
