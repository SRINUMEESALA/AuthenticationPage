import { connect } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./index.css";

const Authenticate = (props) => {
  const navigate = useNavigate();

  const onClickSignUpButton = () => {
    navigate("/auth/register");
  };

  const onClickLoginUpButton = () => {
    navigate("/auth/login");
  };

  return (
    <div className="authCon min-vh-100 d-flex justify-content-center align-items-center">
      <div className="LoginOrRegisterCon col-md-5 col-lg-3 col-8 card shadow text-center p-3 pb-4">
        <div className="mb-4">
          <h1 className="h2 text-dark font-weight-bold">
            Kri<span className="text-primary">dhe</span>
          </h1>
          {/* <img
            className="logoCompany"
            alt=""
            src="https://img.freepik.com/premium-vector/logo-abstract-geometric-business-icon_205544-15460.jpg?size=626&ext=jpg&uid=R96247835&ga=GA1.2.2024764164.1678773257&semt=ais"
          /> */}
          <p className="text-secondary">Hello! How is your day?</p>
        </div>
        <div className="tabsCon">
          <div className="ui buttons w-100 mb-5">
            <button
              className={`ui button ${
                props.activeRoute === "login" && "positive"
              }`}
              onClick={onClickLoginUpButton}>
              <NavLink to="/auth/login" className="navLinkStylesRemover">
                <span className="w-100">Login</span>
              </NavLink>
            </button>
            <div className="or"></div>
            <button
              className={`ui button ${
                props.activeRoute !== "login" && "positive"
              }`}
              onClick={onClickSignUpButton}>
              <NavLink to="/auth/register" className="navLinkStylesRemover">
                <span className="">SignUp</span>
              </NavLink>
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeRoute: state.activeRoute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
