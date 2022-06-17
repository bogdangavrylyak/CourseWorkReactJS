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
  getCompanySupplier,
  createCompanySupplier,
  updateCompanySupplier,
  deleteCompanySupplier,
} from "./company-supplier.service";
import { getAddressList } from "../address/address.service";
import { selectDisplayRenderer, selectRenderer, styles } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.Name) {
    errors.Name = "Please, provide Name";
  }

  if (!values.Email) {
    errors.Email = "Please, provide Email";
  }

  if (!values.BankAccount) {
    errors.BankAccount = "Please, provide BankAccount";
  }

  if (!values.AddressRef) {
    errors.AddressRef = "Please, provide AddressRef";
  }

  console.info("Errors validation", errors);
  return errors;
};
const CompanySupplier = () => {
  const [loading, setLoading] = React.useState(true);
  const [address, setAddressList] = React.useState([]);

  const fetchAgents = async () => {
    setLoading(true);
    const l = await getAddressList();
    setAddressList(l || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAgents();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getCompanySupplier());
    },
    create: (data) => {
      return Promise.resolve(createCompanySupplier({...data, AddressRef: +data.AddressRef}));
    },

    update: (data) => {
      const id = data.CompanySupplier_id;
      return Promise.resolve(
        updateCompanySupplier(
          _.pick({...data, AddressRef: +data.AddressRef}, [
            "Name",
            "Email",
            "BankAccount",
            "AddressRef",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteCompanySupplier(data.CompanySupplier_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="CompanySupplier"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="Name" label="Name" placeholder="Name" />
          <Field name="Email" label="Email" placeholder="Email" />
          <Field name="BankAccount" label="BankAccount" placeholder="BankAccount" />
          <Field
            name="AddressRef"
            label="Address"
            placeholder="Address"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                address,
                "Select Address",
                "AddressRef",
                "Address"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, address, "AddressRef", "Address")
            }
          />
        </Fields>
        <CreateForm
          title="CompanySupplier Creation"
          message="Create a new CompanySupplier!"
          trigger="Create CompanySupplier"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="CompanySupplier Update Process"
          message="Update CompanySupplier"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="CompanySupplier Delete Process"
          message="Are you sure you want to delete the CompanySupplier?"
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

export default CompanySupplier;
