import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import siteMap from "./../../sitemap";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.userInfo);
  if (!user) {
    return <Navigate to={siteMap.login.path} replace />;
  } else {
    return children;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
};
