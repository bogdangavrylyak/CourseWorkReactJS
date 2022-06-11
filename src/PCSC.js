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
  createPCSC,
  deletePCSC,
  getPCSCList,
  updatePCSC,
} from "./services/pcsc.sersive";
import { getPlayerContractList } from "./services/playerContract.servise";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};

  if (!values.playerContractId) {
    errors.playerContractId = "Please, provide documentNumber";
  }

  if (!values.specialConditionsId) {
    errors.specialConditionsId = "Please, provide conditions";
  }

  console.info("Errors validation", errors);
  return errors;
};
const PCSC = () => {
  const [loading, setLoading] = React.useState(true);
  const [playerContracts, setPlayerContracts] = React.useState([]);
  const [specialConditions, setSpecialConditions] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getPlayerContractList();
    const c = await getSpecialConditionList();
    setPlayerContracts(l || []);
    setSpecialConditions(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getPCSCList());
    },
    create: (data) => {
      return Promise.resolve(createPCSC(data));
    },
    update: (data) => {
      const id = data.id;
      return Promise.resolve(
        updatePCSC(
          _.pick(data, ["playerContractId", "specialConditionsId"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deletePCSC(data.id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="PCSC"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="playerContractId"
            label="playerContract"
            placeholder="playerContract"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                playerContracts,
                "Select playerContract",
                "playerContractId",
                "documentNumber"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                playerContracts,
                "playerContractId",
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
          title="PCSC Creation"
          message="Create a new PCSC!"
          trigger="Create PCSC"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="PCSC Update Process"
          message="Update PCSC"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="PCSC Delete Process"
          message="Are you sure you want to delete the PCSC?"
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

export default PCSC;
