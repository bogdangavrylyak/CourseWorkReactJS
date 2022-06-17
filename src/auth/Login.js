import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./auth.service";

function Login({ logged, setLogged }) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  //eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      navigate("/employee");
    }
    //eslint-disable-next-line
  }, [logged]);

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    setLoading(true);
    const res = await auth({ email, password });

    if (Object.keys(res).length <= 0) {
      setErrorMessages({ name: "pass", message: "Bad credentials" });
      alert('Wrong credentials')
      setLogged(false);
    } if (Object.keys(res).length > 1) {
      localStorage.setItem("user", JSON.stringify(res));
      setErrorMessages({ name: "pass", message: "" });
      setLogged(true);
    } else {
      setLogged(false);
      setErrorMessages({ name: "pass", message: "Bad credentials" });
    }

    setLoading(false);

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
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          {renderErrorMessage("email")}
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
