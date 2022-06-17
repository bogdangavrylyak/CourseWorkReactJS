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
  createContractLandscapeWork,
  deleteContractLandscapeWork,
  getContractLandscapeWork,
  updateContractLandscapeWork,
} from "./contract-landscape-work.service";
import { getLandscapeWork } from "../landscape-work/landscape-work.service";
import { getContract } from "../contract/contract.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};

  if (!values.LandscapeWorkRef) {
    errors.LandscapeWorkRef = "Please, provide LandscapeWorkRef";
  }

  if (!values.ContractRef) {
    errors.ContractRef = "Please, provide ContractRef";
  }

  if (!values.Count) {
    errors.Count = "Please, provide Count";
  }

  console.info("Errors validation", errors);
  return errors;
};
const ContractLandscapeWork = () => {
  const [loading, setLoading] = React.useState(true);
  const [landscapeWork, setLandscapeWork] = React.useState([]);
  const [contract, setContract] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getLandscapeWork();
    const c = await getContract();
    console.log(c)
    setLandscapeWork(l || []);
    setContract(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      getContractLandscapeWork().then(el => console.log(el))
      return Promise.resolve(getContractLandscapeWork());
    },
    create: (data) => {
      return Promise.resolve(createContractLandscapeWork({
        ...data, 
        Count: +data.Count,
        LandscapeWorkRef: +data.LandscapeWorkRef,
        ContractRef: +data.ContractRef,
      }));
    },
    update: (data) => {
      const id = data.ContractLandscapeWork_id;
      return Promise.resolve(
        updateContractLandscapeWork(
          _.pick({
            ...data, 
            Count: +data.Count,
            LandscapeWorkRef: +data.LandscapeWorkRef,
            ContractRef: +data.ContractRef,
          }, ["Count", "LandscapeWorkRef", "ContractRef"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteContractLandscapeWork(data.ContractLandscapeWork_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="ContractLandscapeWork"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field
            name="ContractRef"
            label="ContractNumber"
            placeholder="ContractNumber"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                contract,
                "Select ContractNumber",
                "ContractRef",
                "ContractNumber"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                contract,
                "ContractRef",
                "ContractNumber"
              )
            }
          />
          <Field name="Count" label="Count" placeholder="Count" />
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
          title="ContractLandscapeWork Creation"
          message="Create a new ContractLandscapeWork!"
          trigger="Create ContractLandscapeWork"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="ContractLandscapeWork Update Process"
          message="Update ContractLandscapeWork"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="ContractLandscapeWork Delete Process"
          message="Are you sure you want to delete the ContractLandscapeWork?"
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

export default ContractLandscapeWork;
