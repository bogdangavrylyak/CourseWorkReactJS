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
  getClubManagerList,
  createClubManager,
  deleteClubManager,
  updateClubManager,
} from "./services/clubManager.servise";
import { getOfficeRoleList } from "./services/officeRole.servise";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.officeRoleId) {
    errors.officeRoleId = "Please, provide officeRoleId";
  }
  if (!values.clubManagerName) {
    errors.clubManagerName = "Please, provide clubManager's name";
  }
  if (!values.clubManagerAddress) {
    errors.clubManagerAddress = "Please, provide clubManager's Address";
  }
  if (!values.email) {
    errors.email = "Please, provide clubManager's email";
  }
  if (!values.phone) {
    errors.phone = "Please, provide clubManager's phone";
  }
  if (!values.password) {
    errors.password = "Please, provide clubManagerName's password";
  }
  console.info("Errors validation", errors);
  return errors;
};
const ClubManagers = ({ isAdmin }) => {
  const [loading, setLoading] = React.useState(true);
  const [officeRoles, setOfficeRole] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getOfficeRoleList();
    setOfficeRole(l || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getClubManagerList());
    },
    create: (data) => {
      return Promise.resolve(createClubManager(data));
    },
    update: (data) => {
      const id = data.clubManagerId;
      return Promise.resolve(
        updateClubManager(
          _.pick(data, [
            "officeRoleId",
            "clubManagerName",
            "clubManagerAddress",
            "email",
            "phone",
            "password",
          ]),
          id
        )
      );
    },

    // "clubManagerId": 1,
    // "officeRoleId": 1,
    // "officeRoleName": "Admin",
    // "clubManagerName": "RudnytskyiIvan",
    // "clubManagerAddress": "Shevchenka.3",
    // "email": "Rivan@email.com",
    // "phone": "34567",
    // "password": "1234"
    delete: (data) => {
      return Promise.resolve(deleteClubManager(data.clubManagerId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="ClubManagers"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="officeRoleId"
            label="officeRole"
            placeholder="officeRole"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                officeRoles,
                "Select office role",
                "officeRoleId",
                "officeRoleName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                officeRoles,
                "officeRoleId",
                "officeRoleName"
              )
            }
          />

          <Field
            name="clubManagerName"
            label="Club Manager Name"
            placeholder="club Manager Name"
          />
          <Field
            name="clubManagerAddress"
            label="clubManagerAddress"
            placeholder="clubManagerAddress"
          />
          <Field name="email" label="email" placeholder="email" />
          <Field name="phone" label="phone" placeholder="phone" />
          <Field
            name="password"
            label="password"
            placeholder="password"
            hideInCreateForm={!isAdmin}
            hideInUpdateForm={!isAdmin}
            hideFromTable={!isAdmin}
          />
        </Fields>

        {isAdmin && (
          <CreateForm
            title="ClubManager Creation"
            message="Create a new ClubManager!"
            trigger="Create ClubManager"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              return validation(values);
            }}
          />
        )}

        {isAdmin && (
          <UpdateForm
            title="ClubManager Update Process"
            message="Update ClubManager"
            trigger="Update"
            onSubmit={(task) => service.update(task)}
            submitText="Update"
            validate={(values) => {
              return validation(values);
            }}
          />
        )}

        {isAdmin && (
          <DeleteForm
            title="ClubManager Delete Process"
            message="Are you sure you want to delete the ClubManager?"
            trigger="Delete"
            onSubmit={(task) => service.delete(task)}
            submitText="Delete"
            validate={(values) => {
              return {};
            }}
          />
        )}
      </CRUDTable>
    </div>
  );
};

export default ClubManagers;
