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
import { getCoachResponsibilityList } from "./services/coachResponsibility.servise";
import {
  createTCCR,
  deleteTCCR,
  getTCCRList,
  updateTCCR,
} from "./services/tccr.servise";
import { getTrainerContractList } from "./services/trainerContract.servise";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};

  if (!values.trainerContractId) {
    errors.trainerContractId = "Please, provide documentNumber";
  }

  if (!values.coachResponsibilitiesId) {
    errors.coachResponsibilitiesId = "Please, provide coachResponsibilities";
  }

  console.info("Errors validation", errors);
  return errors;
};
const TCCR = () => {
  const [loading, setLoading] = React.useState(true);
  const [trainerContracts, setTrainerContracts] = React.useState([]);
  const [coachResponsibilities, setCoachResponsibilities] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getTrainerContractList();
    const c = await getCoachResponsibilityList();
    setTrainerContracts(l || []);
    setCoachResponsibilities(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getTCCRList());
    },
    create: (data) => {
      return Promise.resolve(createTCCR(data));
    },
    update: (data) => {
      const id = data.id;
      return Promise.resolve(
        updateTCCR(
          _.pick(data, ["trainerContractId", "coachResponsibilitiesId"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteTCCR(data.id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="TCCR"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="trainerContractId"
            label="trainerContract"
            placeholder="trainerContract"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                trainerContracts,
                "Select trainerContract",
                "trainerContractId",
                "documentNumber"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                trainerContracts,
                "trainerContractId",
                "documentNumber"
              )
            }
          />
          <Field
            name="coachResponsibilitiesId"
            label="coachResponsibilities"
            placeholder="coachResponsibilities"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                coachResponsibilities,
                "Select coachResponsibilities",
                "coachResponsibilitiesId",
                "responsibilities"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                coachResponsibilities,
                "coachResponsibilitiesId",
                "responsibilities"
              )
            }
          />
        </Fields>
        <CreateForm
          title="TCCR Creation"
          message="Create a new TCCR!"
          trigger="Create TCCR"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="TCCR Update Process"
          message="Update TCCR"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="TCCR Delete Process"
          message="Are you sure you want to delete the TCCR?"
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

export default TCCR;
