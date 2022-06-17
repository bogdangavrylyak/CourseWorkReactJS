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
  createMaterialLandscapeWork,
  deleteMaterialLandscapeWork,
  getMaterialLandscapeWork,
  updateMaterialLandscapeWork,
} from "./material-contract-landscape-work.service";
import { getLandscapeWork } from "../landscape-work/landscape-work.service";
import { getMaterial } from "../material/material.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};

  if (!values.MaterialRef) {
    errors.MaterialRef = "Please, provide MaterialRef";
  }

  if (!values.LandscapeWorkRef) {
    errors.LandscapeWorkRef = "Please, provide LandscapeWorkRef";
  }

  if (!values.Count) {
    errors.Count = "Please, provide Count";
  }

  console.info("Errors validation", errors);
  return errors;
};
const MaterialContractLandscapeWork = () => {
  const [loading, setLoading] = React.useState(true);
  const [contractLandscapeWork, setContractLandscapeWork] = React.useState([]);
  const [material, setMaterial] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getMaterial();
    const c = await getLandscapeWork();
    setMaterial(l || []);
    setContractLandscapeWork(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      getMaterialLandscapeWork().then(el => console.log(el))
      return Promise.resolve(getMaterialLandscapeWork());
    },
    create: (data) => {
      return Promise.resolve(createMaterialLandscapeWork({
        ...data, 
        Count: +data.Count,
        MaterialRef: +data.MaterialRef,
        LandscapeWorkRef: +data.LandscapeWorkRef,
      }));
    },
    update: (data) => {
      const id = data.MaterialContractLandscapeWork_id;
      return Promise.resolve(
        updateMaterialLandscapeWork(
          _.pick({
            ...data, 
            Count: +data.Count,
            MaterialRef: +data.MaterialRef,
            LandscapeWorkRef: +data.LandscapeWorkRef,
          }, ["MaterialRef", "ContractLandscapeWorkRef", "Count"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteMaterialLandscapeWork(data.MaterialContractLandscapeWork_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="MaterialLandscapeWork"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="Count" label="Count" placeholder="Count" />
          <Field
            name="MaterialRef"
            label="Material"
            placeholder="Material"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                material,
                "Select Material",
                "MaterialRef",
                "Name"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                material,
                "MaterialRef",
                "Name"
              )
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
                contractLandscapeWork,
                "Select LandscapeWork",
                "LandscapeWorkRef",
                "LandscapeWork"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                contractLandscapeWork,
                "LandscapeWorkRef",
                "LandscapeWork"
              )
            }
          />
        </Fields>
        <CreateForm
          title="MaterialLandscapeWork Creation"
          message="Create a new MaterialLandscapeWork!"
          trigger="Create MaterialLandscapeWork"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="MaterialLandscapeWork Update Process"
          message="Update MaterialLandscapeWork"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="MaterialLandscapeWork Delete Process"
          message="Are you sure you want to delete the MaterialLandscapeWork?"
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

export default MaterialContractLandscapeWork;
