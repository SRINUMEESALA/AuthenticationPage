import "./index.css";
import { apiStatusConstants } from "../Login";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { url } from "../../Sources";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRegisterApiStatus, setUserRegisterApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [name, setaName] = useState("");
  const navigate = useNavigate();

  const onSubmitRegisterForm = async (event) => {
    event.preventDefault();
    setUserRegisterApiStatus(apiStatusConstants.load);
    console.log("form submitted", email, password);
    // we can make api call here
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    };
    try {
      const CurrentUrl = `${url}/register`;
      const response = await fetch(CurrentUrl, options);
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setEmail("");
        setPassword("");
        setaName("");
        setUserRegisterApiStatus(apiStatusConstants.success);
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else {
        setUserRegisterApiStatus(apiStatusConstants.fail);
      }
    } catch (error) {
      setUserRegisterApiStatus(apiStatusConstants.fail);
      console.log(error);
    }
  };

  return (
    <form
      className="d-flex flex-column align-items-center w-100"
      onSubmit={onSubmitRegisterForm}>
      <div className="ui left icon input inputCon">
        <input
          type="text"
          placeholder="Username"
          className="styleInput w-100"
          required
          value={name}
          onChange={(event) => setaName(event.target.value)}
        />
        <i className="user circle icon"></i>
      </div>
      <div className="ui left icon input inputCon mt-3">
        <input
          type="email"
          placeholder="Enter Email"
          className="styleInput w-100"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <i className="envelope icon"></i>
      </div>
      <div className="ui left icon input inputCon mt-3">
        <input
          type="password"
          placeholder="Enter your password"
          className="styleInput w-100"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <i className="lock icon"></i>
      </div>
      <div className=" text-center inputCon mb-4">
        <button className="btn btn-primary w-100 loginButton" type="submit">
          {userRegisterApiStatus === apiStatusConstants.load ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : (
            "Register"
          )}
        </button>
        <p className="text-danger small">
          {userRegisterApiStatus === apiStatusConstants.fail &&
            "Check entered details!"}
        </p>
        <p className="text-success small">
          {userRegisterApiStatus === apiStatusConstants.success &&
            "Registration successful"}
        </p>
      </div>
    </form>
  );
};

export default Register;
