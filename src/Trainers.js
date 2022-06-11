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
import { getEmployee } from "./services/employee.service";
import {
  createTrainer,
  deleteTrainer,
  getTrainerList,
  updateTrainer,
} from "./services/trainer.servise";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.trainerName) {
    errors.trainerName = "Please, provide trainer's name";
  }

  if (!values.agentId) {
    errors.agentId = "Please, provide club's agent";
  }

  if (!values.trainerAddress) {
    errors.trainerAddress = "Please, provide trainer's adress";
  }

  if (!values.email) {
    errors.email = "Please, provide trainer's email";
  }
  if (!values.phone) {
    errors.phone = "Please, provide trainer's phone";
  }
  if (!values.careerStartYear) {
    errors.careerStartYear = "Please, provide trainer's careerStartYear";
  }
  // "agentId": 1,
  // "agentName": "LionelMessi",
  // "trainerName": "ZinedineZidan",
  // "trainerAddress": "Lviv_Shevchenka,11",
  // "email": "ZinedineZidan@email.com",
  // "phone": "38631",
  // "careerStartYear": "1996"

  console.info("Errors validation", errors);
  return errors;
};
const Trainers = () => {
  const [loading, setLoading] = React.useState(true);
  const [agents, setAgents] = React.useState([]);

  const fetchAgents = async () => {
    setLoading(true);
    const l = await getEmployee();
    setAgents(l || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAgents();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getTrainerList());
    },
    create: (data) => {
      return Promise.resolve(createTrainer(data));
    },

    // "agentId": 1,
    // "agentName": "LionelMessi",
    // "trainerName": "ZinedineZidan",
    // "trainerAddress": "Lviv_Shevchenka,11",
    // "email": "ZinedineZidan@email.com",
    // "phone": "38631",
    // "careerStartYear": "1996"
    update: (data) => {
      const id = data.trainerId;
      return Promise.resolve(
        updateTrainer(
          _.pick(data, [
            "agentId",
            "trainerName",
            "trainerAddress",
            "email",
            "phone",
            "careerStartYear",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteTrainer(data.trainerId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Trainers"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="agentId"
            label="Agent"
            placeholder="Agent"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                agents,
                "Select agent",
                "agentId",
                "agentName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, agents, "agentId", "agentName")
            }
          />
          <Field
            name="trainerName"
            label="trainerName"
            placeholder="trainerName"
          />

          <Field
            name="trainerAddress"
            label="Trainer Address"
            placeholder="Trainer Address"
          />
          <Field name="email" label="email" placeholder="email" />
          <Field name="phone" label="phone" placeholder="phone" />
          <Field
            name="careerStartYear"
            label="Career Start Year"
            placeholder="careerStartYear"
          />
        </Fields>
        <CreateForm
          title="Trainer Creation"
          message="Create a new Trainer!"
          trigger="Create Trainer"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Trainer Update Process"
          message="Update Trainer"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Trainer Delete Process"
          message="Are you sure you want to delete the Trainer?"
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

export default Trainers;
