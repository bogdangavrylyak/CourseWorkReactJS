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
  getSponsorsServiceList,
  createSponsorsService,
  deleteSponsorsService,
  updateSponsorsService,
} from "./services/sponsorsService.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.serviceName) {
    errors.serviceName = "Please, provide serviceName";
  }
  if (!values.serviceDescription) {
    errors.serviceDescription = "Please, provide serviceDescription";
  }
  console.info("Errors validation", errors);
  return errors;
};
const SponsorsServices = () => {
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
      return Promise.resolve(getSponsorsServiceList());
    },
    create: (data) => {
      return Promise.resolve(createSponsorsService(data));
    },
    update: (data) => {
      const id = data.sponsorsServicesId;
      return Promise.resolve(
        updateSponsorsService(
          _.pick(data, ["serviceName", "serviceDescription"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteSponsorsService(data.sponsorsServicesId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="SponsorsServices"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="serviceName"
            label="serviceName"
            placeholder="serviceName"
          />
          <Field
            name="serviceDescription"
            label="serviceDescription"
            placeholder="serviceDescription"
          />
        </Fields>
        <CreateForm
          title="SponsorsService Creation"
          message="Create a new SponsorsService!"
          trigger="Create SponsorsService"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="SponsorsService Update Process"
          message="Update SponsorsService"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="SponsorsService Delete Process"
          message="Are you sure you want to delete the SponsorsService?"
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

export default SponsorsServices;
