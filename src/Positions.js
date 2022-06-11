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
  getPositionList,
  createPosition,
  deletePosition,
  updatePosition,
} from "./services/position.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.positionName) {
    errors.positionName = "Please, provide position's name";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Positions = () => {
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
      return Promise.resolve(getPositionList());
    },
    create: (data) => {
      return Promise.resolve(createPosition(data));
    },
    update: (data) => {
      const id = data.positionId;
      return Promise.resolve(
        updatePosition(_.pick(data, ["positionName"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deletePosition(data.positionId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Positions"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="positionName" label="Name" placeholder="Name" />
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

export default Positions;
