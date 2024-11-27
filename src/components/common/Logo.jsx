import logo from "../../assets/Logo.png";
import { PropTypes } from "prop-types";
import siteMap from "../../sitemap";
import { Link } from "react-router-dom";

export default function Logo({ containerClass, imgClass }) {
  return (
    <div className={containerClass}>
      <Link to={siteMap.home.path}>
        <img width={0} height={0} src={logo} alt="Logo" className={imgClass} />
      </Link>
    </div>
  );
}

Logo.propTypes = {
  containerClass: PropTypes.string.isRequired,
  imgClass: PropTypes.string.isRequired
};
