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
import { getSponsorsServiceList } from "./services/sponsorsService.servise";
import {
  createSSSA,
  deleteSSSA,
  getSSSAList,
  updateSSSA,
} from "./services/sssa.servise";
import { getSponsorAgreementList } from "./services/sponsorAgreement.servise";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};

  if (!values.sponsorAgreementId) {
    errors.sponsorAgreementId = "Please, provide documentNumber";
  }

  if (!values.sponsorsServicesId) {
    errors.sponsorsServicesId = "Please, provide serviceName";
  }

  if (!values.sssadescription) {
    errors.sssadescription = "Please, provide sssadescription";
  }
  //   "id": 0,
  //   "sponsorAgreementId": 0,
  //   "sponsorsServicesId": 0,
  //   "sssadescription": "string"
  console.info("Errors validation", errors);
  return errors;
};
const SSSA = () => {
  const [loading, setLoading] = React.useState(true);
  const [sponsorAgreements, setSponsorAgreements] = React.useState([]);
  const [sponsorsServices, setSponsorsServices] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getSponsorAgreementList();
    const c = await getSponsorsServiceList();
    setSponsorAgreements(l || []);
    setSponsorsServices(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getSSSAList());
    },
    create: (data) => {
      return Promise.resolve(createSSSA(data));
    },
    update: (data) => {
      const id = data.id;
      return Promise.resolve(
        updateSSSA(
          _.pick(data, [
            "sponsorAgreementId",
            "sponsorsServicesId",
            "sssadescription",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteSSSA(data.id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="SSSA"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="sssadescription"
            label="sssadescription"
            placeholder="sssadescription"
          />
          <Field
            name="sponsorAgreementId"
            label="sponsorAgreement"
            placeholder="sponsorAgreement"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                sponsorAgreements,
                "Select sponsorAgreement",
                "sponsorAgreementId",
                "documentNumber"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                sponsorAgreements,
                "sponsorAgreementId",
                "documentNumber"
              )
            }
          />
          <Field
            name="sponsorsServicesId"
            label="sponsorsServices"
            placeholder="sponsorsServices"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                sponsorsServices,
                "Select sponsorsServices",
                "sponsorsServicesId",
                "serviceName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                sponsorsServices,
                "sponsorsServicesId",
                "serviceName"
              )
            }
          />
        </Fields>
        <CreateForm
          title="SSSA Creation"
          message="Create a new SSSA!"
          trigger="Create SSSA"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="SSSA Update Process"
          message="Update SSSA"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="SSSA Delete Process"
          message="Are you sure you want to delete the SSSA?"
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

export default SSSA;
