import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import siteMap from "../../sitemap";

export default function PublicRoute({ children }) {
  const user = useSelector((state) => state.user.userInfo);
  if (user) {
    return <Navigate to={siteMap.home.path} replace />;
  } else {
    return children;
  }
}

PublicRoute.propTypes = {
  children: PropTypes.node
};
