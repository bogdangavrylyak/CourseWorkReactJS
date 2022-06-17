import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import * as _ from "lodash";
// import ReactToPdf from "react-to-pdf";
// Component's Base CSS
import "../index.css";
import Loader from "../Loader";
import {
  createContract,
  deleteContract,
  getContract,
  updateContract,
} from "./contract.service";
import { getAddressList } from "../address/address.service";
import { getEmployee } from "../employee/employee.service";
import { getCustomer } from "../customer/customer.servise";
import {
  booleanDisplayRenderer,
  dateDisplayRenderer,
  dateRenderer,
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.ContractNumber) {
    errors.ContractNumber = "Please, provide ContractNumber";
  }
  if (!values.Price) {
    errors.Price = "Please, provide Price";
  }
  if (!values.Deadline) {
    errors.Deadline = "Please, provide Deadline";
  }
  // if (!values.IsDone) {
  //   errors.IsDone = "Please, provide IsDone";
  // }
  if (!values.CustomerRef) {
    errors.CustomerRef = "Please, provide CustomerRef";
  }
  if (!values.EmployeeRef) {
    errors.EmployeeRef = "Please, provide EmployeeRef";
  }
  if (!values.AddressRef) {
    errors.AddressRef = "Please, provide AddressRef";
  }

  console.info("Errors validation", errors);
  return errors;
};
const Contract = () => {
  const [loading, setLoading] = React.useState(true);
  const [address, setAddress] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);

  const fetchPlayerClubManager = async () => {
    setLoading(true);
    const a = await getAddressList();
    const e = await getEmployee();
    const c = await getCustomer();
    setAddress(a || []);
    setEmployee(e || []);
    setCustomer(c || []);
    console.log('employee: ', employee);
    console.log('customer: ', customer);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPlayerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getContract());
    },
    create: (data) => {
      return Promise.resolve(createContract({
          ...data, 
          Price: +data.Price,
          CustomerRef: +data.CustomerRef,
          EmployeeRef: +data.EmployeeRef,
          AddressRef: +data.AddressRef,
          IsDone: data.IsDone ?? false,
        })
      );
    },
    update: (data) => {
      const id = data.Contract_id;
      return Promise.resolve(
        updateContract(
          _.pick({
            ...data, 
            Price: +data.Price,
            CustomerRef: +data.CustomerRef,
            EmployeeRef: +data.EmployeeRef,
            AddressRef: +data.AddressRef,
          }, [
            "ContractNumber",
            "Price",
            "Deadline",
            "IsDone",
            "CustomerRef",
            "EmployeeRef",
            "AddressRef",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteContract(data.Contract_id));
    },
  };

  if (loading) {
    return <Loader />;
  }
  // const ref = React.createRef();

  // const name = "player_contracts_" + Date.now();

  return (
    <div style={styles.container}>
      {/* <ReactToPdf
        targetRef={ref}
        filename={`${name}.pdf`}
        options={{ orientation: "landscape" }}
        scale={1.1}
      >
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf> */}
      {/* <div ref={ref}> */}
        <CRUDTable
          caption="Contract"
          fetchItems={(payload) => service.fetchItems(payload)}
        >
          <Fields>
            <Field name="ContractNumber" label="ContractNumber" placeholder="ContractNumber" />
            <Field name="Price" label="Price" placeholder="Price" />
            <Field name="IsDone" label="IsDone" placeholder="IsDone" type="checkbox"
             tableValueResolver={(data) =>
                booleanDisplayRenderer(data, "IsDone")
              } />
            <Field
              name="Deadline"
              label="Deadline"
              placeholder="Deadline"
              type="date"
              render={dateRenderer}
              tableValueResolver={(data) =>
                dateDisplayRenderer(data, "Deadline")
              }
            />
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
            <Field
              name="EmployeeRef"
              label="Employee"
              placeholder="Employee"
              type="number"
              render={(data) =>
                selectRenderer(
                  data,
                  employee,
                  "Select Employee",
                  "EmployeeRef",
                  "Name"
                )
              }
              tableValueResolver={(data) =>
                selectDisplayRenderer(
                  data,
                  employee,
                  "EmployeeRef",
                  "Name"
                )
              }
            />
            <Field
              name="CustomerRef"
              label="Customer"
              placeholder="Customer"
              type="number"
              render={(data) =>
                selectRenderer(
                  data,
                  customer,
                  "Select Customer",
                  "CustomerRef",
                  "Name"
                )
              }
              tableValueResolver={(data) =>
                selectDisplayRenderer(
                  data,
                  customer,
                  "CustomerRef",
                  "Name"
                )
              }
            />
          </Fields>
          <CreateForm
            title="Contract Creation"
            message="Create a new Contract!"
            trigger="Create Contract"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              return validation(values);
            }}
          />

          <UpdateForm
            title="Contract Update Process"
            message="Update Contract"
            trigger="Update"
            onSubmit={(task) => service.update(task)}
            submitText="Update"
            validate={(values) => {
              return validation(values);
            }}
          />

          <DeleteForm
            title="Contract Delete Process"
            message="Are you sure you want to delete the Contract?"
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

export default Contract;
