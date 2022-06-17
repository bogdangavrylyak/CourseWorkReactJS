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
  createWorkHistory,
  deleteWorkHistory,
  getWorkHistoryList,
  updateWorkHistory,
} from "./work-process-material.service";
import { getWorkProcess } from "../work-process/work-process.service";
import { getMaterial } from "../material/material.service";
import {
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Count) {
    errors.Count = "Please, provide Count";
  }
  if (!values.WorkProcess_id) {
    errors.basketCWorkProcess_idlubId = "Please, provide WorkProcess_id";
  }
  if (!values.Material_id) {
    errors.Material_id = "Please, provide Material_id";
  }

  console.info("Errors validation", errors);
  return errors;
};
const WorkProcessMaterial = () => {
  const [loading, setLoading] = React.useState(true);
  const [workProcess, setWorkProcess] = React.useState([]);
  const [material, setMaterial] = React.useState([]);

  const fetchPlayerClubManager = async () => {
    setLoading(true);
    const l = await getWorkProcess();
    const c = await getMaterial();

    setWorkProcess(l || []);
    setMaterial(c || []);
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
      return Promise.resolve(createWorkHistory({
        ...data,
        WorkProcess_id: +data.WorkProcess_id,
        Material_id: +data.Material_id,
        Count: +data.Count
        })
      );
    },
    update: (data) => {
      const id = data.WorkProcessMaterial_id;
      return Promise.resolve(
        updateWorkHistory(
          _.pick({
            ...data,
            WorkProcess_id: +data.WorkProcess_id,
            Material_id: +data.Material_id,
            Count: +data.Count
            }, [
            "Count",
            "WorkProcess_id",
            "Material_id",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteWorkHistory(data.WorkProcessMaterial_id));
    },
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div style={styles.container}>
      <CRUDTable
        caption="WorkProcessMaterial"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="Count" label="Count" placeholder="Count" />
          <Field
            name="WorkProcess_id"
            label="Description"
            placeholder="Description"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                workProcess,
                "Select WorkProcess_id",
                "WorkProcess_id",
                "Description"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, workProcess, "WorkProcess_id", "Description")
            }
          />
          <Field
            name="Material_id"
            label="Name"
            placeholder="Name"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                material,
                "Select Material",
                "Material_id",
                "Name"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                material,
                "Material_id",
                "Name"
              )
            }
          />
        </Fields>
        <CreateForm
          title="WorkProcessMaterial Creation"
          message="Create a new WorkProcessMaterial!"
          trigger="Create WorkProcessMaterial"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="WorkProcessMaterial Update Process"
          message="Update WorkProcessMaterial"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="WorkProcessMaterial Delete Process"
          message="Are you sure you want to delete the WorkProcessMaterial?"
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

export default WorkProcessMaterial;
