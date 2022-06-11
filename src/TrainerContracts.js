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
import { getClubManagerList } from "./services/clubManager.servise";
import {
  createTrainerContract,
  deleteTrainerContract,
  getTrainerContractList,
  updateTrainerContract,
} from "./services/trainerContract.servise";
import { getTrainerList } from "./services/trainer.servise";
import {
  dateDisplayRenderer,
  dateRenderer,
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.trainerId) {
    errors.trainerId = "Please, provide trainer's name";
  }

  if (!values.clubManagerId) {
    errors.clubManagerId = "Please, provide clubManager's name";
  }

  if (!values.documentNumber) {
    errors.documentNumber = "Please, provide documentNumber";
  }

  if (values.documentNumber && values.documentNumber.length > 10) {
    errors.documentNumber = "documentNumber should be less than 10 symbols";
  }

  if (!values.signatureDate) {
    errors.signatureDate = "Please, provide signatureDate";
  }
  if (!values.endDate) {
    errors.endDate = "Please, provide endDate";
  }
  if (!values.estimatedSalaryPerYear) {
    errors.estimatedSalaryPerYear = "Please, provide estimatedSalaryPerYear";
  }
  if (!values.dataOfWorkStart) {
    errors.dataOfWorkStart = "Please, provide dataOfWorkStart";
  }

  //   "trainerId",
  //   "clubManagerId",
  //   "documentNumber",
  //   "signatureDate",
  //   "endDate",
  //   "estimatedSalaryPerYear",
  //   "dataOfWorkStart",

  console.info("Errors validation", errors);
  return errors;
};
const TrainerContracts = () => {
  const [loading, setLoading] = React.useState(true);
  const [trainers, setTrainers] = React.useState([]);
  const [clubManagers, setClubManagers] = React.useState([]);

  const fetchTrainerClubManager = async () => {
    setLoading(true);
    const l = await getTrainerList();
    const c = await getClubManagerList();
    setTrainers(l || []);
    setClubManagers(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTrainerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getTrainerContractList());
    },
    create: (data) => {
      return Promise.resolve(createTrainerContract(data));
    },
    update: (data) => {
      const id = data.trainerContractId;
      return Promise.resolve(
        updateTrainerContract(
          _.pick(data, [
            "documentNumber",
            "trainerId",
            "clubManagerId",
            "signatureDate",
            "endDate",
            "estimatedSalaryPerYear",
            "dataOfWorkStart",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteTrainerContract(data.trainerContractId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="TrainerContract"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="documentNumber"
            label="documentNumber"
            placeholder="documentNumber"
          />
          <Field
            name="trainerId"
            label="trainer"
            placeholder="trainer"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                trainers,
                "Select trainer",
                "trainerId",
                "trainerName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, trainers, "trainerId", "trainerName")
            }
          />
          <Field
            name="clubManagerId"
            label="clubManager"
            placeholder="clubManager"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                clubManagers,
                "Select clubManager",
                "clubManagerId",
                "clubManagerName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                clubManagers,
                "clubManagerId",
                "clubManagerName"
              )
            }
          />

          <Field
            name="signatureDate"
            label="Signature Date"
            placeholder="signatureDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "signatureDate")
            }
          />
          <Field
            name="endDate"
            label="End Date"
            placeholder="endDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) => dateDisplayRenderer(data, "endDate")}
          />
          <Field
            name="estimatedSalaryPerYear"
            label="Estimated Salary PerYear"
            placeholder="estimatedSalaryPerYear"
          />
          <Field
            name="dataOfWorkStart"
            label="Date Of WorkStart"
            placeholder="Date Of Work Start"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "dataOfWorkStart")
            }
          />
        </Fields>
        <CreateForm
          title="TrainerContract Creation"
          message="Create a new TrainerContract!"
          trigger="Create TrainerContract"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="TrainerContract Update Process"
          message="Update TrainerContract"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="TrainerContract Delete Process"
          message="Are you sure you want to delete the TrainerContract?"
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

export default TrainerContracts;
