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
  getNationalityList,
  createNationality,
  deleteNationality,
  updateNationality,
} from "./services/nationality.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.nationalityName) {
    errors.nationalityName = "Please, provide nationality's name";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Nationalityes = () => {
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
      return Promise.resolve(getNationalityList());
    },
    create: (data) => {
      return Promise.resolve(createNationality(data));
    },
    update: (data) => {
      const id = data.nationalityId;
      return Promise.resolve(
        updateNationality(_.pick(data, ["nationalityName"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteNationality(data.nationalityId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Nationalityes"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="nationalityName" label="Name" placeholder="Name" />
        </Fields>
        <CreateForm
          title="Nationality Creation"
          message="Create a new Nationality!"
          trigger="Create Nationality"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Nationality Update Process"
          message="Update Nationality"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Nationality Delete Process"
          message="Are you sure you want to delete the Nationality?"
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

export default Nationalityes;
