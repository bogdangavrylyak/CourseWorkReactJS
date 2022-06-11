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
  getSponsorList,
  createSponsor,
  deleteSponsor,
  updateSponsor,
} from "./services/sponsor.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.sponsorName) {
    errors.sponsorName = "Please, provide Sponsor's name";
  }
  if (!values.email) {
    errors.email = "Please, provide Sponsor's email";
  }
  if (!values.phone) {
    errors.phone = "Please, provide Sponsor's phone";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Sponsors = () => {
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
      return Promise.resolve(getSponsorList());
    },
    create: (data) => {
      return Promise.resolve(createSponsor(data));
    },
    update: (data) => {
      const id = data.sponsorId;
      return Promise.resolve(
        updateSponsor(_.pick(data, ["sponsorName", "email", "phone"]), id)
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteSponsor(data.sponsorId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Sponsors"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="sponsorName"
            label="sponsorName"
            placeholder="sponsorName"
          />
          <Field name="email" label="email" placeholder="email" />
          <Field name="phone" label="phone" placeholder="phone" />
        </Fields>
        <CreateForm
          title="Sponsor Creation"
          message="Create a new Sponsor!"
          trigger="Create Sponsor"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Sponsor Update Process"
          message="Update Sponsor"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Sponsor Delete Process"
          message="Are you sure you want to delete the Sponsor?"
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

export default Sponsors;
