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
  getSpecialConditionList,
  createSpecialCondition,
  deleteSpecialCondition,
  updateSpecialCondition,
} from "./services/specialCondition.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.conditions) {
    errors.conditions = "Please, provide conditions";
  }
  console.info("Errors validation", errors);
  return errors;
};
const SpecialConditions = () => {
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
      return Promise.resolve(getSpecialConditionList());
    },
    create: (data) => {
      return Promise.resolve(createSpecialCondition(data));
    },
    update: (data) => {
      const id = data.specialConditionsId;
      return Promise.resolve(
        updateSpecialCondition(_.pick(data, ["conditions"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteSpecialCondition(data.specialConditionsId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="SpecialConditions"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="conditions"
            label="conditions"
            placeholder="conditions"
            // hideInCreateForm={!isAdmin}
            // hideInUpdateForm: boolean;
            // hideFromTable
          />
        </Fields>
        <CreateForm
          title="SpecialCondition Creation"
          message="Create a new SpecialCondition!"
          trigger="Create SpecialCondition"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="SpecialCondition Update Process"
          message="Update SpecialCondition"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="SpecialCondition Delete Process"
          message="Are you sure you want to delete the SpecialCondition?"
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

export default SpecialConditions;
