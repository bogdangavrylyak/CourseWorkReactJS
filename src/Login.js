import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./services/auth.service";

function Login({ logged, setLogged }) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  //eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  const previous  = usePrevious(logged);

  useEffect(() => {
    if(previous === logged) {
      return;
    }
    console.log(logged);
    if (logged) {
      navigate("/employees");
    }
    console.log("login useeffect");
    //eslint-disable-next-line
  }, [logged]);

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    console.log('test submit')

    setLoading(true);
    console.log("auth payload: ", { Email: email, Password: password });
    const res = await auth({ email, password });

    console.log("response: ", res);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
      setErrorMessages({ name: "pass", message: "" });
      setLogged(true);
      // navigate("/employees", { replace: true });
    } else {
      setLogged(false);
      setErrorMessages({ name: "pass", message: res });
      alert("Wrong name or password");
    }

    setLoading(false);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.error}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="uname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="login-sbm"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;



    // if (res.success === false) {
    //   setLogged(false);
    //   setErrorMessages({ name: "pass", message: res });
    //   alert("Wrong name or password");
    // } else if (res) {
    //   localStorage.setItem("user", JSON.stringify(res));
    //   setErrorMessages({ name: "pass", message: "" });
    //   setLogged(true);
    // } else {
    //   setLogged(false);
    //   setErrorMessages({ name: "pass", message: res });
    //   alert("Wrong name or password");
    // }

    // setLoading(false);

    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);

    // // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }