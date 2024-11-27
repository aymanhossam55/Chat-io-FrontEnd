import leftImage from "../../assets/Login_photo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import siteMap from "../../sitemap";
import Logo from "../../components/common/Logo";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const userData = {
        username: userName,
        name: fullName,
        email,
        phone,
        password
      };

      try {
        const response = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
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
            // Display error message
            toast.error(data.message || "Registration failed!");
          }
          return;
        }

        toast.success(data.message);

        e.target.reset();
        navigate(siteMap.verify.path, { replace: true });
      } catch (error) {
        toast.error(error.message || "Registration failed!");
      }
    } else {
      toast.error("Passwords do not match!");
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

      {/* Right side (Register form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 relative">
        <Logo
          containerClass="absolute top-8 right-8"
          imgClass="w-10 lg:w-16 rounded-full"
        />

        <h2 className="text-2xl lg:text-3xl font-bold">Register</h2>
        <p className="text-sm mb-4 lg:mb-6">
          Lets get you all set up so you can access your personal account.
        </p>

        <form onSubmit={handleRegister}>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-5">
            <div className="flex flex-col w-full">
              <label className="block text-sm mb-2 font-semibold text-neutral">
                Full Name
              </label>
              <input
                type="text"
                placeholder="ex: Amr Osama"
                className="input input-bordered w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="block text-sm mb-2 font-semibold text-neutral">
                UserName
              </label>
              <input
                type="text"
                placeholder="ex: Amr"
                className="input input-bordered w-full"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-5">
            <div className="flex flex-col w-full">
              <label className="block text-sm mb-2 font-semibold text-neutral">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-sm mb-2 font-semibold text-neutral">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="ex: 0123456789"
                className="input input-bordered w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm mb-2 font-semibold text-neutral">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <label className="flex items-center mb-4 mt-6">
            <input type="checkbox" className="checkbox mr-2" />I agree to all
            the Terms and Privacy Policies
          </label>

          <button
            type="submit"
            className="btn btn-primary w-full h-12 text-lg mb-4"
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <p>
            Already have an Account?{" "}
            <Link
              to={siteMap.login.path}
              className="text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
