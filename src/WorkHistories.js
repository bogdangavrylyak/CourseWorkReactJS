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
import { getClubList } from "./services/club.service";
import {
  createWorkHistory,
  deleteWorkHistory,
  getWorkHistoryList,
  updateWorkHistory,
} from "./services/workHistory.servise";
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
    errors.trainerId = "Please, provide player's name";
  }

  if (!values.basketClubId) {
    errors.basketClubId = "Please, provide basketClubId";
  }
  if (!values.workStartDate) {
    errors.workStartDate = "Please, provide workStartDate";
  }
  if (!values.workEndDate) {
    errors.workEndDate = "Please, provide workEndDate";
  }

  console.info("Errors validation", errors);
  return errors;
};
const WorkHistories = () => {
  const [loading, setLoading] = React.useState(true);
  const [trainers, setTrainers] = React.useState([]);
  const [clubs, setClubs] = React.useState([]);

  const fetchPlayerClubManager = async () => {
    setLoading(true);
    const l = await getTrainerList();
    const c = await getClubList();

    setTrainers(l || []);
    setClubs(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPlayerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getWorkHistoryList());
    },
    create: (data) => {
      return Promise.resolve(createWorkHistory(data));
    },
    update: (data) => {
      const id = data.workHistoryId;
      return Promise.resolve(
        updateWorkHistory(
          _.pick(data, [
            "trainerId",
            "basketClubId",
            "workStartDate",
            "workEndDate",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteWorkHistory(data.workHistoryId));
    },
  };

  if (loading) {
    return <Loader />;
  }
  //   "workHistoryId": 0,
  //   "trainerId": 0,
  //   "basketClubId": 0,
  //   "workStartDate": "2022-05-24T22:50:56.262Z",
  //   "workEndDate": "2022-05-24T22:50:56.262Z"
  return (
    <div style={styles.container}>
      <CRUDTable
        caption="WorkHistory"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
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
            name="basketClubId"
            label="basketClub"
            placeholder="basketClub"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                clubs,
                "Select basketClub",
                "basketClubId",
                "basketClubName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                clubs,
                "basketClubId",
                "basketClubName"
              )
            }
          />

          <Field
            name="workStartDate"
            label="workStartDate"
            placeholder="workStartDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "workStartDate")
            }
          />
          <Field
            name="workEndDate"
            label="workEndDate"
            placeholder="workEndDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "workEndDate")
            }
          />
        </Fields>
        <CreateForm
          title="WorkHistory Creation"
          message="Create a new WorkHistory!"
          trigger="Create WorkHistory"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="WorkHistory Update Process"
          message="Update WorkHistory"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="WorkHistory Delete Process"
          message="Are you sure you want to delete the WorkHistory?"
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

export default WorkHistories;
