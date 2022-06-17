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
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "./order.service";
import { getCompanySupplier } from "../company-supplier/company-supplier.service";
import { getEmployee } from "../employee/employee.service";
import { selectDisplayRenderer, selectRenderer, styles, dateRenderer, dateDisplayRenderer } from "../shared";

const validation = (values) => {
  const errors = {};
  if (!values.OrderNumber) {
    errors.OrderNumber = "Please, provide OrderNumber";
  }
  if (!values.DateOfOrder) {
    errors.DateOfOrder = "Please, provide DateOfOrder";
  }
  if (!values.Deadline) {
    errors.Deadline = "Please, provide Deadline";
  }
  if (!values.TotalPrice) {
    errors.TotalPrice = "Please, provide TotalPrice";
  }
  if (!values.CompanySupplierRef) {
    errors.CompanySupplierRef = "Please, provide CompanySupplierRef";
  }
  if (!values.EmployeeRef) {
    errors.EmployeeRef = "Please, provide EmployeeRef";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Order = ({ isAdmin }) => {
  const [loading, setLoading] = React.useState(true);
  const [companySupplier, setCompanySupplier] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getCompanySupplier();
    const e = await getEmployee();
    setCompanySupplier(l || []);
    setEmployee(e || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getOrder());
    },
    create: (data) => {
      return Promise.resolve(createOrder({
        ...data, 
        CompanySupplierRef: +data.CompanySupplierRef,
        EmployeeRef: +data.EmployeeRef,
        TotalPrice: +data.TotalPrice,
      }));
    },
    update: (data) => {
      const id = data.Order_id;
      return Promise.resolve(
        updateOrder(
          _.pick({
            ...data, 
            CompanySupplierRef: +data.CompanySupplierRef,
            EmployeeRef: +data.EmployeeRef,
            TotalPrice: +data.TotalPrice,
          }, [
            "OrderNumber",
            "DateOfOrder",
            "Deadline",
            "TotalPrice",
            "CompanySupplierRef",
            "EmployeeRef",
          ]),
          id
        )
      );
    },

    delete: (data) => {
      return Promise.resolve(deleteOrder(data.Order_id));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Order"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="OrderNumber" label="OrderNumber" placeholder="OrderNumber" />
          <Field
            name="DateOfOrder"
            label="DateOfOrder"
            placeholder="DateOfOrder"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "DateOfOrder")
            }
          />
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
          <Field name="TotalPrice" label="TotalPrice" placeholder="TotalPrice" />
          <Field
            name="CompanySupplierRef"
            label="CompanySupplier"
            placeholder="CompanySupplier"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                companySupplier,
                "Select CompanySupplier",
                "CompanySupplierRef",
                "Name"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                companySupplier,
                "CompanySupplierRef",
                "Name"
              )
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
        </Fields>

        <CreateForm
          title="Order Creation"
          message="Create a new Order!"
          trigger="Create Order"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Order Update Process"
          message="Update Order"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Order Delete Process"
          message="Are you sure you want to delete the Order?"
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

export default Order;
