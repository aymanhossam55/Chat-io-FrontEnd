import { useState } from "react";
import leftImg from "../../assets/forgot-password.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import siteMap from "../../sitemap";
import Logo from "../../components/common/Logo";

const intialState = {
  username: ""
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formDate, setFormData] = useState(intialState);
  const handleChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDate)
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || data.errors[0].msg);
      } else {
        toast.success(data.message);
        navigate(siteMap.login.path);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100">
      {/* Left side */}
      <div className="w-full flex flex-col md:flex-row lg:w-1/2 bg-primary p-8 text-white justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src={leftImg}
            alt="Welcome Image"
            className="w-1/2 lg:w-1/3 mb-4 lg:mb-8"
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

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 relative">
        <Logo
          containerClass="absolute top-8 right-8"
          imgClass="w-10 md:w-16 rounded-full"
        />

        <Link
          className="link link-primary flex justify-start self-start items-center"
          to={siteMap.login.path}
        >
          <IoIosArrowBack className="text-primary" />
          Back to Login
        </Link>

        <h2 className="text-2xl lg:text-3xl font-bold mt-2 capitalize">
          forgot your password
        </h2>
        <p className="text-sm mb-4 lg:mb-6">
          Don&apos;t worry, happens to all of us. Enter your email below to
          recover your password.
        </p>

        <form
          method="post"
          className="w-full self-start flex flex-col gap-5"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="username" className="flex flex-col gap-3 w-full">
            <span className="text-xl">Email</span>
            <input
              placeholder="example@gmail.com"
              type="text"
              className="input input-bordered w-full"
              name="username"
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn-primary w-full capitalize">
            Reset Your Password
          </button>
        </form>
      </div>
    </div>
  );
}
