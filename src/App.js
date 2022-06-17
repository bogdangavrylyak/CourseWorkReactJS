import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React from "react";
import "./App.css";
import Employee from "./employee/Employee";
import City from "./city/City";
import Test from "./Test";
import Login from "./auth/Login";
import Address from "./address/Address";
import Position from "./position/Position";
import Department from "./department/Department";
import Customer from "./customer/Customer";
import Soil from "./Soil/Soil";
import LandscapeWork from "./landscape-work/LandscapeWork";
import MaterialType from "./material-type/MaterialType";
import Sort from "./sort/Sort";
import Characteristic from "./characteristic/Characteristic";
import CharacteristicValue from "./characteristic-value/CharacteristicValue";
import Material from "./material/Material";
import MaterialCharacteristicValue from "./material-characteristic-value/MaterialCharacteristicValue";
import Contract from "./contract/Contract";
import ContractLandscapeWork from "./contract-landscape-work/ContractLandscapeWork";
import MaterialContractLandscapeWork from "./material-contract-landscape-work/MaterialContractLandscapeWork";
import CompanySupplier from "./company-supplier/CompanySupplier";
import Order from "./order/Order";
import OrderedMaterials from "./ordered-materials/OrderedMaterials";
import Status from "./Status/Status";
import WorkProcess from "./work-process/WorkProcess";
import WorkProcessEmployee from "./work-process-employee/WorkProcessEmployee";
import DeliveredMaterials from "./delivered-materials/DeliveredMaterials";
import WorkProcessMaterial from "./work-process-material/WorkProcessMaterial";

function App() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [logged, setLogged] = React.useState(
    !!JSON.parse(localStorage.getItem("user"))
  );

  React.useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem("user");
      if (!item) {
        setLogged(false);
      }
    }
    window.addEventListener("storage", checkUserData);
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);

  React.useEffect(() => {
    if (logged) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [logged]);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  // const isAdmin = !!user;
  const isAdmin = user?.Position === "Admin";
  const isCManager = user?.Position === "CManager";
  const isVPManager = user?.Position === "VPManager";
  const navigate = useNavigate();
  const tabs = [
    "Employee", // 0
    "Address", // 1
    "City", // 2
    "Position", // 3
    "Test", // 4
    "Department", //5
    "Customer", //6
    "Soil", //7
    "LandscapeWork", //8
    "MaterialType", //9
    "Sort", //10
    "Characteristic", //11
    "CharacteristicValue", //12
    "Material", //13
    "MaterialCharacteristicValue", //14
    "Test", // 15
    "Contract", //16
    "ContractLandscapeWork", //17
    "Test", //18
    "MaterialLandscapeWork", //19
    "Test", // 20
    "CompanySupplier", //21
    "Order", //22
    "OrderedMaterials", //23
    "Status", //24
    "WorkProcess", //25
    "WorkProcessEmployee", //26
    "DeliveredMaterials", //27
    "WorkProcessMaterial", // 28
  ];
  const adminTabs = [
    0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28
  ];
  const CManagerTabs = [1, 2, 6, 8, 13, 14, 16, 17, 19];
  const VPManagerTabs = [1, 2, 6, 8, 13, 14, 16, 17, 19, 21, 22, 23, 24, 25, 26, 28, 28];

  const displayTabs = isAdmin
    ? adminTabs
    : isCManager
    ? CManagerTabs
    : isVPManager
    ? VPManagerTabs
    : [];

  const logout = () => {
    localStorage.removeItem("user");
    setLogged(false);
    navigate("login");
  };

  function RequireAuth({ children, logged }) {
    let location = useLocation();

    if (!logged) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (
      displayTabs.some(
        (dt) =>
          tabs[dt].toLowerCase() === location.pathname.slice(1).toLowerCase()
      )
    ) {
      return children;
    } else {
      return (
        <Navigate
          to={"/" + tabs[displayTabs[0]]}
          state={{ from: location }}
          replace
        />
      );
    }
  }
  return (
    <div className="App">
      <div className="header">
        {displayTabs.map((dt) => (
          <Link to={`/${tabs[dt]}`} className="link">
            <div>{tabs[dt]}</div>
          </Link>
        ))}
        {!!displayTabs.length && (
          <div className="link" onClick={logout}>
            <div>Logout</div>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route
          path="/login"
          element={<Login setLogged={setLogged} logged={logged} />}
        />
        <Route
          path="employee"
          element={
            <RequireAuth logged={logged}>
              <Employee />
            </RequireAuth>
          }
        />
        <Route
          path="city"
          element={
            <RequireAuth logged={logged}>
              <City />
            </RequireAuth>
          }
        />
        <Route
          path="address"
          element={
            <RequireAuth logged={logged}>
              <Address />
            </RequireAuth>
          }
        />

        <Route
          path="position"
          element={
            <RequireAuth logged={logged}>
              <Position />
            </RequireAuth>
          }
        />
        <Route
            path="department"
            element={
            <RequireAuth logged={logged}>
              <Department />
            </RequireAuth>
          }
        />
        <Route
          path="customer"
          element={
            <RequireAuth logged={logged}>
              <Customer />
            </RequireAuth>
          }
        />
        <Route
          path="soil"
          element={
            <RequireAuth logged={logged}>
              <Soil />
            </RequireAuth>
          }
        />
        <Route
          path="landscapeWork"
          element={
            <RequireAuth logged={logged}>
              <LandscapeWork />
            </RequireAuth>
          }
        />MaterialType
        <Route
          path="materialType"
          element={
            <RequireAuth logged={logged}>
              <MaterialType />
            </RequireAuth>
          }
        />
        <Route
          path="sort"
          element={
            <RequireAuth logged={logged}>
              <Sort />
            </RequireAuth>
          }
        />Characteristic
        <Route
          path="characteristic"
          element={
            <RequireAuth logged={logged}>
              <Characteristic />
            </RequireAuth>
          }
        />
        <Route
          path="characteristicValue"
          element={
            <RequireAuth logged={logged}>
              <CharacteristicValue />
            </RequireAuth>
          }
        />
        <Route
          path="material"
          element={
            <RequireAuth logged={logged}>
              <Material />
            </RequireAuth>
          }
        />
        <Route
          path="materialCharacteristicValue"
          element={
            <RequireAuth logged={logged}>
              <MaterialCharacteristicValue />
            </RequireAuth>
          }
        />
        <Route
          path="contract"
          element={
            <RequireAuth logged={logged}>
              <Contract />
            </RequireAuth>
          }
        />
        <Route
          path="contractLandscapeWork"
          element={
            <RequireAuth logged={logged}>
              <ContractLandscapeWork />
            </RequireAuth>
          }
        />
        <Route
          path="materialLandscapeWork"
          element={
            <RequireAuth logged={logged}>
              <MaterialContractLandscapeWork />
            </RequireAuth>
          }
        />
        <Route
          path="companySupplier"
          element={
            <RequireAuth logged={logged}>
              <CompanySupplier />
            </RequireAuth>
          }
        />
        <Route
          path="order"
          element={
            <RequireAuth logged={logged}>
              <Order />
            </RequireAuth>
          }
        />
        <Route
          path="orderedMaterials"
          element={
            <RequireAuth logged={logged}>
              <OrderedMaterials />
            </RequireAuth>
          }
        />
        <Route
          path="status"
          element={
            <RequireAuth logged={logged}>
              <Status />
            </RequireAuth>
          }
        />
        <Route
          path="workProcess"
          element={
            <RequireAuth logged={logged}>
              <WorkProcess />
            </RequireAuth>
          }
        />
        <Route
          path="workProcessEmployee"
          element={
            <RequireAuth logged={logged}>
              <WorkProcessEmployee />
            </RequireAuth>
          }
        />
        <Route
          path="deliveredMaterials"
          element={
            <RequireAuth logged={logged}>
              <DeliveredMaterials />
            </RequireAuth>
          }
        />
        <Route
          path="workProcessMaterial"
          element={
            <RequireAuth logged={logged}>
              <WorkProcessMaterial />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={
                "/" + logged && !!displayTabs?.length
                  ? tabs[displayTabs[0]]
                  : "login"
              }
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
