import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import * as _ from "lodash";
// import { DownloadTableExcel } from "react-export-table-to-excel";

// Component's Base CSS
import "./index.css";
import Loader from "./Loader";
import {
  getLeagueList,
  createLeague,
  deleteLeague,
  updateLeague,
} from "./services/league.service";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.leagueName) {
    errors.leagueName = "Please, provide league's name";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Leagues = () => {
  const [loading, setLoading] = React.useState(true);

  const tableRef = React.useRef(null);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getLeagueList());
    },
    create: (data) => {
      return Promise.resolve(createLeague(data));
    },
    update: (data) => {
      const id = data.leagueId;
      return Promise.resolve(updateLeague(_.pick(data, ["leagueName"]), id));
    },
    delete: (data) => {
      return Promise.resolve(deleteLeague(data.leagueId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <div>
        <CRUDTable
          caption="Leagues"
          fetchItems={(payload) => service.fetchItems(payload)}
          // items={clubs}
          ref={tableRef}
          id="leagues-table"
        >
          <Fields>
            <Field
              name="leagueName"
              label="Name"
              placeholder="Name"
              // hideInCreateForm={!isAdmin}
              // hideInUpdateForm: boolean;
              // hideFromTable
            />
          </Fields>
          <CreateForm
            title="League Creation"
            message="Create a new League!"
            trigger="Create League"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              return validation(values);
            }}
          />

          <UpdateForm
            title="League Update Process"
            message="Update League"
            trigger="Update"
            onSubmit={(task) => service.update(task)}
            submitText="Update"
            validate={(values) => {
              return validation(values);
            }}
          />

          <DeleteForm
            title="League Delete Process"
            message="Are you sure you want to delete the League?"
            trigger="Delete"
            onSubmit={(task) => service.delete(task)}
            submitText="Delete"
            validate={(values) => {
              return {};
            }}
          />
        </CRUDTable>
      </div>
    </div>
  );
};

export default Leagues;
