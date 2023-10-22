import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = !!Cookies.get("jwt_access");

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: props.location }} replace />
  );
};

export default PrivateRoute;
