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
import { getClubManagerList } from "./services/clubManager.servise";
import {
  createSponsorAgreement,
  deleteSponsorAgreement,
  getSponsorAgreementList,
  updateSponsorAgreement,
} from "./services/sponsorAgreement.servise";
import { getSponsorList } from "./services/sponsor.servise";
import {
  dateDisplayRenderer,
  dateRenderer,
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.sponsorId) {
    errors.sponsorId = "Please, provide sponsor's name";
  }

  if (!values.clubManagerId) {
    errors.clubManagerId = "Please, provide clubManager's name";
  }

  if (!values.documentNumber) {
    errors.documentNumber = "Please, provide documentNumber";
  }

  if (values.documentNumber && values.documentNumber.length > 10) {
    errors.documentNumber = "documentNumber should be less than 10 symbols";
  }

  if (!values.startDate) {
    errors.startDate = "Please, provide startDate";
  }
  if (!values.endDate) {
    errors.endDate = "Please, provide endDate";
  }
  if (!values.estimatedAmountPerYear) {
    errors.estimatedAmountPerYear = "Please, provide estimatedAmountPerYear";
  }
  if (!values.agreementDescription) {
    errors.agreementDescription = "Please, provide agreementDescription";
  }

  //   "sponsorAgreementId": 0,

  //   "clubManagerId": 0,
  //   "sponsorId": 0,
  //   "documentNumber": "string",
  //   "startDate": "2022-05-24T23:13:18.858Z",
  //   "endDate": "2022-05-24T23:13:18.858Z",
  //   "estimatedAmountPerYear": "string",
  //   "agreementDescription": "string"

  //   "trainerId",
  //   "clubManagerId",
  //   "documentNumber",
  //   "signatureDate",
  //   "endDate",
  //   "estimatedSalaryPerYear",
  //   "dataOfWorkStart",

  console.info("Errors validation", errors);
  return errors;
};
const SponsorAgreements = () => {
  const [loading, setLoading] = React.useState(true);
  const [sponsors, setSponsors] = React.useState([]);
  const [clubManagers, setClubManagers] = React.useState([]);

  const fetchTrainerClubManager = async () => {
    setLoading(true);
    const l = await getSponsorList();
    const c = await getClubManagerList();
    setSponsors(l || []);
    setClubManagers(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTrainerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getSponsorAgreementList());
    },
    create: (data) => {
      return Promise.resolve(createSponsorAgreement(data));
    },
    update: (data) => {
      const id = data.sponsorAgreementId;
      return Promise.resolve(
        updateSponsorAgreement(
          _.pick(data, [
            "documentNumber",
            "sponsorId",
            "clubManagerId",
            "startDate",
            "endDate",
            "estimatedAmountPerYear",
            "agreementDescription",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteSponsorAgreement(data.sponsorAgreementId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="SponsorAgreement"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="documentNumber"
            label="documentNumber"
            placeholder="documentNumber"
          />
          <Field
            name="sponsorId"
            label="sponsor"
            placeholder="sponsor"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                sponsors,
                "Select sponsor",
                "sponsorId",
                "sponsorName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, sponsors, "sponsorId", "sponsorName")
            }
          />
          <Field
            name="clubManagerId"
            label="clubManager"
            placeholder="clubManager"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                clubManagers,
                "Select clubManager",
                "clubManagerId",
                "clubManagerName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                clubManagers,
                "clubManagerId",
                "clubManagerName"
              )
            }
          />

          <Field
            name="startDate"
            label="startDate Date"
            placeholder="startDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "startDate")
            }
          />
          <Field
            name="endDate"
            label="End Date"
            placeholder="endDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) => dateDisplayRenderer(data, "endDate")}
          />
          <Field
            name="estimatedAmountPerYear"
            label="estimatedAmountPerYear"
            placeholder="estimatedAmountPerYear"
          />
          <Field
            name="agreementDescription"
            label="agreementDescription"
            placeholder="agreementDescription"
          />
        </Fields>
        <CreateForm
          title="SponsorAgreement Creation"
          message="Create a new SponsorAgreement!"
          trigger="Create SponsorAgreement"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="SponsorAgreement Update Process"
          message="Update SponsorAgreement"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="SponsorAgreement Delete Process"
          message="Are you sure you want to delete the SponsorAgreement?"
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

export default SponsorAgreements;
