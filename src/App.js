import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Employee from "./Employee";
import Test from "./Test";
import Login from "./Login";
import React from "react";

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

  const isAdmin = !!user;
  // const isAdmin = user?.officeRoleName === "Admin";
  // const isManager = user?.officeRoleName === "Manager";
  // const isDirector = user?.officeRoleName === "Director";
  const navigate = useNavigate();
  const tabs = [
    "Employees", // 0
    // "Leagues", // 1
    // "Cityes", // 2
    // "Positions", // 3
    // "Nationalityes", // 4
    // "ClubManagers", // 5
    // "OfficeRoles", //6
    // "SpecialConditions", //7
    // "Sponsors", //8
    // "SponsorsServices", //9
    // "CoachResponsibilities", //10
    // "PCSC", //11
    // "TCSC", //12
    // "TCCR", //13
    // "Players", //14
    // "PlayerContracts", //15
    // "TransferHistories", //16
    // "WorkHistories", //17
    // "SponsorAgreements", //18
    // "SSSA", //19
    // "Stats", //20
    // "Agents", //21
    // "Trainers", //22
    // "TrainerContracts", //23
  ];
  const adminTabs = [
    0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 22,
  ];
  // const managerTabs = [5, 15, 18, 23];
  // const directorTabs = [5, 20, 15, 18, 23];

  const displayTabs = isAdmin
    ? adminTabs
    // : isManager
    // ? managerTabs
    // : isDirector
    // ? directorTabs
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
          path="employees"
          element={
            <RequireAuth logged={logged}>
              <Employee />
            </RequireAuth>
          }
        />
        {/*<Route
          path="cityes"
          element={
            <RequireAuth logged={logged}>
              <Cityes />
            </RequireAuth>
          }
        />
        <Route
          path="stats"
          element={
            <RequireAuth logged={logged}>
              <Stats />
            </RequireAuth>
          }
        />

        <Route
          path="leagues"
          element={
            <RequireAuth logged={logged}>
              <Leagues />
            </RequireAuth>
          }
          />
          <Route
          path="nationalityes"
          element={
            <RequireAuth logged={logged}>
            <Nationalityes />
          </RequireAuth>
          }
        />
        <Route
          path="positions"
          element={
            <RequireAuth logged={logged}>
              <Positions />
            </RequireAuth>
          }
        />
        <Route
          path="agents"
          element={
            <RequireAuth logged={logged}>
              <Agents />
            </RequireAuth>
          }
        />
        <Route
          path="trainers"
          element={
            <RequireAuth logged={logged}>
              <Trainers />
            </RequireAuth>
          }
        />
        {/* <br /> */}
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
