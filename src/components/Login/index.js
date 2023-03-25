import "./index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { url } from "../../Sources";
import Cookies from "js-cookie";

const loginUiStatusConstants = {
  initial: "defaultLoginPage",
  facebook: "facebookLogin",
  google: "googleLogin",
  linkedin: "linkedInLogin",
  forgotPassword: "resetPasswordPage",
};

export const apiStatusConstants = {
  initial: "initial",
  load: "loading",
  success: "succeeded",
  fail: "failed",
};

const Login = () => {
  const [loginUiStatus, setLoginUiStatus] = useState(
    loginUiStatusConstants.initial
  );

  const [resetPasswordApiStatus, setResetPasswordApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLoginApiStatus, setUserLoginApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [newPasswordOne, setNewPasswordOne] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const navigate = useNavigate();
  const backBtnRef = useRef(null);

  const setStatusDefault = () => {
    setLoginUiStatus(loginUiStatusConstants.initial);
    setResetPasswordApiStatus(apiStatusConstants.initial);
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    setResetPasswordApiStatus(apiStatusConstants.load);
    // we can make api call here
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        newPassword: newPasswordOne,
      }),
    };
    try {
      if (newPasswordOne !== newPasswordTwo) {
        throw new Error("Entered passwords mismatched");
      }
      const CurrentUrl = `${url}/user?forgotPassword=true`;
      const response = await fetch(CurrentUrl, options);
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setResetPasswordApiStatus(apiStatusConstants.success);
        setNewPasswordOne("");
        setNewPasswordTwo("");
        setTimeout(() => {
          backBtnRef.current.click();
        }, 2000);
      } else {
        setResetPasswordApiStatus(apiStatusConstants.fail);
      }
    } catch (error) {
      console.log(error);
      setResetPasswordApiStatus(apiStatusConstants.fail);
    }
  };

  const onSubmitLoginForm = async (event) => {
    event.preventDefault();
    setUserLoginApiStatus(apiStatusConstants.load);
    // we can make api call here
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    try {
      const CurrentUrl = `${url}/login`;
      const response = await fetch(CurrentUrl, options);
      const result = await response.json();
      if (response.ok) {
        setUserLoginApiStatus(apiStatusConstants.success);
        Cookies.set("jwtToken", result.jwtToken, { expires: 30 });
        navigate("/");
      } else {
        setUserLoginApiStatus(apiStatusConstants.fail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderDefaultLoginView = () => (
    <div className="d-flex flex-column align-items-center">
      <form
        className="d-flex flex-column align-items-center w-100"
        onSubmit={onSubmitLoginForm}>
        <div className="ui left icon input inputCon">
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
        <div className=" text-center inputCon">
          <button className="btn btn-primary w-100 loginButton" type="submit">
            {userLoginApiStatus === apiStatusConstants.load ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </button>
          <p className="text-danger small">
            {userLoginApiStatus === apiStatusConstants.fail &&
              "Enter valid credentials!"}
          </p>
          <p className="text-success small">
            {userLoginApiStatus === apiStatusConstants.success &&
              "Login successful"}
          </p>
        </div>
        <p
          className="small text-primary inputCon mt-1 text-end "
          onClick={() =>
            setLoginUiStatus(loginUiStatusConstants.forgotPassword)
          }>
          <button className="forgotpswdButton">Forgot password?</button>
        </p>
      </form>
      <div className="ui horizontal divider w-75 align-self-center text-secondary">
        <span className="small">or</span>
      </div>
      <div className="d-flex socialLoginCon align-self-center justify-content-between">
        <button
          className="ui circular facebook icon button"
          onClick={() => setLoginUiStatus(loginUiStatusConstants.facebook)}
          fdprocessedid="rc9v9m">
          <i className="facebook icon"></i>
        </button>
        <button
          className="ui circular google plus icon button"
          onClick={() => setLoginUiStatus(loginUiStatusConstants.google)}
          fdprocessedid="dqa26p">
          <i className="google icon"></i>
        </button>
        <button
          onClick={() => setLoginUiStatus(loginUiStatusConstants.linkedin)}
          className="ui circular linkedin icon button"
          fdprocessedid="v1m3pn">
          <i className="linkedin icon"></i>
        </button>
      </div>
      <h1 className="h6 mt-4 text-secondary">
        Don't have an account?{" "}
        <NavLink to="/auth/register" className="font-weight-bold">
          Create now
        </NavLink>
      </h1>
      <p className="small mt-1 text-secondary">
        By signing up,you are agree with our
        <NavLink className="font-weight-bold">Terms & conditions</NavLink>
      </p>
    </div>
  );

  const renderForgotPasswordView = () => {
    return (
      <form className="d-flex flex-column" onSubmit={resetPassword}>
        <div className="d-flex flex-column align-items-center">
          <div className="ui left icon input inputCon">
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
              placeholder="Enter password"
              className="styleInput w-100"
              required
              value={newPasswordOne}
              onChange={(event) => setNewPasswordOne(event.target.value)}
            />
            <i className="lock icon"></i>
          </div>
          <div className="ui left icon input inputCon mt-3">
            <input
              type="password"
              placeholder="Retype password"
              className="styleInput w-100"
              required
              value={newPasswordTwo}
              onChange={(event) => setNewPasswordTwo(event.target.value)}
            />
            <i className="lock icon"></i>
          </div>

          <div className=" text-center inputCon">
            <button type="submit" className="btn btn-primary w-100 loginButton">
              {resetPasswordApiStatus === apiStatusConstants.load ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Reset Password"
              )}
            </button>
            <p className="text-danger small">
              {resetPasswordApiStatus === apiStatusConstants.fail &&
                "Something went wrong!"}
            </p>
            <p className="text-success small">
              {resetPasswordApiStatus === apiStatusConstants.success &&
                "Password successfully changed!"}
            </p>
          </div>
        </div>
        <div className=" align-self-start mt-3">
          <button
            ref={backBtnRef}
            className="btn btn-sm  btn-outline-primary"
            onClick={setStatusDefault}>
            <ArrowBackIcon />
          </button>
        </div>
      </form>
    );
  };

  const renderLoginUi = () => {
    switch (loginUiStatus) {
      case loginUiStatusConstants.forgotPassword:
        return renderForgotPasswordView();

      case loginUiStatusConstants.facebook:
      //  renderFaceBookLoginView();
      // eslint-disable-next-line
      case loginUiStatusConstants.google:
      // renderGoogleLoginView();
      // eslint-disable-next-line
      case loginUiStatusConstants.linkedin:
      // renderLinkedinLoginView/();
      // eslint-disable-next-line
      default:
        return renderDefaultLoginView();
    }
  };

  return <>{renderLoginUi()}</>;
};

export default Login;
