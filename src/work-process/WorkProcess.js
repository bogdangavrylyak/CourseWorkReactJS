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
  getWorkProcess,
  createWorkProcess,
  updateWorkProcess,
  deleteWorkProcess,
} from "./work-process.service";
import { getStatus } from "../Status/status.service";
import { getLandscapeWork } from "../landscape-work/landscape-work.service";
import {
  dateDisplayRenderer,
  dateRenderer,
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Description) {
    errors.Description = "Please, provide Description";
  }

  if (!values.BeginDate) {
    errors.BeginDate = "Please, provide BeginDate";
  }
  if (!values.EndDate) {
    errors.EndDate = "Please, provide EndDate";
  }

  if (!values.StatusRef) {
    errors.StatusRef = "Please, provide StatusRef";
  }

  if (!values.LandscapeWorkRef) {
    errors.LandscapeWorkRef = "Please, provide LandscapeWorkRef";
  }

  console.info("Errors validation", errors);
  return errors;
};
const WorkProcess = () => {
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState([]);
  const [landscapeWork, setLandscapeWork] = React.useState([]);

  const fetchTrainerClubManager = async () => {
    setLoading(true);
    const l = await getStatus();
    const c = await getLandscapeWork();
    setStatus(l || []);
    setLandscapeWork(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTrainerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getWorkProcess());
    },
    create: (data) => {
      return Promise.resolve(createWorkProcess({...data, StatusRef: +data.StatusRef, LandscapeWorkRef: +data.LandscapeWorkRef}));
    },
    update: (data) => {
      const id = data.WorkProcess_id;
      return Promise.resolve(
        updateWorkProcess(
          _.pick({...data, StatusRef: +data.StatusRef, LandscapeWorkRef: +data.LandscapeWorkRef}, [
            "BeginDate",
            "EndDate",
            "Description",
            "StatusRef",
            "LandscapeWorkRef",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteWorkProcess(data.WorkProcess_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="WorkProcess"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field
            name="Description"
            label="Description"
            placeholder="Description"
          />
          <Field
            name="BeginDate"
            label="BeginDate"
            placeholder="BeginDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "BeginDate")
            }
          />
          <Field
            name="EndDate"
            label="EndDate"
            placeholder="EndDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) => dateDisplayRenderer(data, "EndDate")}
          />
          <Field
            name="StatusRef"
            label="Status"
            placeholder="Status"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                status,
                "Select Status",
                "StatusRef",
                "Status"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, status, "StatusRef", "Status")
            }
          />
          <Field
            name="LandscapeWorkRef"
            label="LandscapeWork"
            placeholder="LandscapeWork"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                landscapeWork,
                "Select LandscapeWork",
                "LandscapeWorkRef",
                "LandscapeWork"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                landscapeWork,
                "LandscapeWorkRef",
                "LandscapeWork"
              )
            }
          />
        </Fields>
        <CreateForm
          title="WorkProcess Creation"
          message="Create a new WorkProcess!"
          trigger="Create WorkProcess"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="WorkProcess Update Process"
          message="Update WorkProcess"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="WorkProcess Delete Process"
          message="Are you sure you want to delete the WorkProcess?"
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

export default WorkProcess;
