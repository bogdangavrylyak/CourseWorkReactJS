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
  getCoachResponsibilityList,
  createCoachResponsibility,
  deleteCoachResponsibility,
  updateCoachResponsibility,
} from "./services/coachResponsibility.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.responsibilities) {
    errors.responsibilities = "Please, provide responsibilities";
  }
  if (!values.goal) {
    errors.goal = "Please, provide goal";
  }
  console.info("Errors validation", errors);
  return errors;
};
const CoachResponsibilities = () => {
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
      return Promise.resolve(getCoachResponsibilityList());
    },
    create: (data) => {
      return Promise.resolve(createCoachResponsibility(data));
    },
    update: (data) => {
      const id = data.coachResponsibilitiesId;
      return Promise.resolve(
        updateCoachResponsibility(
          _.pick(data, ["responsibilities", "goal"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(
        deleteCoachResponsibility(data.coachResponsibilitiesId)
      );
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="CoachResponsibilities"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="responsibilities"
            label="Responsibilities"
            placeholder="Responsibilities"
          />
          <Field name="goal" label="Goal" placeholder="Goal" />
        </Fields>
        <CreateForm
          title="CoachResponsibility Creation"
          message="Create a new CoachResponsibility!"
          trigger="Create CoachResponsibility"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="CoachResponsibility Update Process"
          message="Update CoachResponsibility"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="CoachResponsibility Delete Process"
          message="Are you sure you want to delete the CoachResponsibility?"
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

export default CoachResponsibilities;
