import { Link } from "react-router-dom";
import siteMap from "../../sitemap";

export default function NotFound() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1489619547086-641e1c87c3ff?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">404 - Page Not Found</h1>
          <p className="mb-5">
            We are sorry, the page you are looking for could not be found.
          </p>
          <Link to={siteMap.home.path}>
            <button className="btn btn-primary">Back to Home </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
