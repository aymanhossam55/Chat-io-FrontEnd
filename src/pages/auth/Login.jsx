import leftImage from "../../assets/Login_photo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/userReducer";
import { useState } from "react";
import { toast } from "react-toastify";
import siteMap from "../../sitemap";
import Logo from "../../components/common/Logo";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Send a POST request to the backend for login
        const response = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok) {
          // Handle non-OK responses
          if (data.errors) {
            // Display error messages
            data.errors.forEach((error) => {
              toast.error(error.msg);
            });
          } else {
            if (data.message === "Verify your email") {
              toast.error(data.message);
              navigate(siteMap.verify.path, { replace: true });
            } else {
              // Display error message
              toast.error(data.message || "Login failed");
            }
          }
          return;
        }

        // Dispatch login action with user data
        dispatch(login(data.user));

        // Navigate to home or dashboard
        navigate(siteMap.home.path, { replace: true });
      } catch (error) {
        // Handle errors
        toast.error(error.message || "Login failed");
      }
    } else {
      toast.error("Please enter valid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100">
      {/* Left side */}
      <div className="flex w-full lg:w-1/2 bg-primary p-8 lg:p-12 text-white justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src={leftImage}
            alt="Welcome Image"
            className="w-2/3 lg:w-3/4 mb-4 lg:mb-8"
          />
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6 text-center">
            Welcome To Chat Community
          </h1>
          <p className="text-sm lg:text-lg text-center">
            This website to cover all people against world to talk with each
            others
          </p>
        </div>
      </div>

      {/* Right side (Login form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 relative">
        <Logo
          containerClass="absolute top-8 right-8"
          imgClass="w-10 md:w-16 rounded-full"
        />

        <h2 className="text-2xl lg:text-3xl font-bold">Login</h2>
        <p className="text-sm mb-4 lg:mb-6">Login to access your account</p>

        <div className="mb-5">
          <label className="block text-sm mb-2 font-semibold text-neutral">
            Email or Username or Phone
          </label>
          <input
            type="email"
            placeholder="example@gmail.com or 0123456789 or username"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm mb-2 font-semibold text-neutral">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <Link
            to={siteMap.forgotPassword.path}
            className="text-sm text-primary hover:underline"
          >
            Forgot Password
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="btn btn-primary w-full h-12 text-lg mb-4"
        >
          Login
        </button>

        <div className="text-center">
          <p>
            Don&apos;t have an account?
            <Link
              to={siteMap.register.path}
              className="text-primary hover:underline"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
