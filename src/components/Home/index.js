import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="">
        <h1 className="h1">Home</h1>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              Cookies.remove("jwtToken");
              navigate("/auth/login");
            }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
