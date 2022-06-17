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
import { getCityList } from "../city/city.service";
import {
  createAddress,
  deleteAddress,
  getAddressList,
  updateAddress,
} from "./address.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Address) {
    errors.basketClubName = "Please, provide Address";
  }

  if (!values.CityRef) {
    errors.CityRef = "Please, provide CityRef";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Address = () => {
  const [loading, setLoading] = React.useState(true);
  const [cities, setCities] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const c = await getCityList();
    console.log(c);
    setCities(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getAddressList());
    },
    create: (data) => {
      return Promise.resolve(createAddress({...data, CityRef: +data.CityRef}));
    },
    update: (data) => {
      const id = data.Address_id;
      return Promise.resolve(
        updateAddress(
          _.pick({...data, CityRef: +data.CityRef}, [
            "Address",
            "CityRef",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteAddress(data.Address_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Addresses"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="Address" label="Address" placeholder="Address" />
          <Field
            name="CityRef"
            label="City"
            placeholder="City"
            type="number"
            render={(data) =>
              selectRenderer(data, cities, "Select city", "CityRef", "City")
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, cities, "CityRef", "City")
            }
          />
        </Fields>
        <CreateForm
          title="Address Creation"
          message="Create a new Address!"
          trigger="Create Address"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Address Update Process"
          message="Update Address"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Address Delete Process"
          message="Are you sure you want to delete the Address?"
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

export default Address;
