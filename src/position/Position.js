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
  getPosition,
  createPosition,
  deletePosition,
  updatePosition,
} from "./position.service";
import { styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Position) {
    errors.Position = "Please, provide Position";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Position = () => {
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
      return Promise.resolve(getPosition());
    },
    create: (data) => {
      return Promise.resolve(createPosition(data));
    },
    update: (data) => {
      const id = data.Position_id;
      return Promise.resolve(
        updatePosition(_.pick(data, ["Position"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deletePosition(data.Position_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Position"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field
            name="Position"
            label="Position"
            placeholder="Position"
          />
        </Fields>
        <CreateForm
          title="Position Creation"
          message="Create a new Position!"
          trigger="Create Position"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Position Update Process"
          message="Update Position"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Position Delete Process"
          message="Are you sure you want to delete the Position?"
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

export default Position;
