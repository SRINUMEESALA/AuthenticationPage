import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  let jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined) {
    return props.children;
  }
  return <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
