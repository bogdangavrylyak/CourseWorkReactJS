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
import { getSpecialConditionList } from "./services/specialCondition.servise";
import {
  createTCSC,
  deleteTCSC,
  getTCSCList,
  updateTCSC,
} from "./services/tcsc.servise";
import { getTrainerContractList } from "./services/trainerContract.servise";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};

  if (!values.trainerContractId) {
    errors.trainerContractId = "Please, provide documentNumber";
  }

  if (!values.specialConditionsId) {
    errors.specialConditionsId = "Please, provide conditions";
  }

  console.info("Errors validation", errors);
  return errors;
};
const TCSC = () => {
  const [loading, setLoading] = React.useState(true);
  const [trainerContracts, setTrainerContracts] = React.useState([]);
  const [specialConditions, setSpecialConditions] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getTrainerContractList();
    const c = await getSpecialConditionList();
    setTrainerContracts(l || []);
    setSpecialConditions(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getTCSCList());
    },
    create: (data) => {
      return Promise.resolve(createTCSC(data));
    },
    update: (data) => {
      const id = data.id;
      return Promise.resolve(
        updateTCSC(
          _.pick(data, ["trainerContractId", "specialConditionsId"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteTCSC(data.id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="TCSC"
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
            name="specialConditionsId"
            label="specialConditions"
            placeholder="specialConditions"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                specialConditions,
                "Select specialConditions",
                "specialConditionsId",
                "conditions"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                specialConditions,
                "specialConditionsId",
                "conditions"
              )
            }
          />
        </Fields>
        <CreateForm
          title="TCSC Creation"
          message="Create a new TCSC!"
          trigger="Create TCSC"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="TCSC Update Process"
          message="Update TCSC"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="TCSC Delete Process"
          message="Are you sure you want to delete the TCSC?"
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

export default TCSC;
