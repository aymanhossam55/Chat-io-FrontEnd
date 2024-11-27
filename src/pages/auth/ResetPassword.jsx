import { useState } from "react";
import leftImg from "../../assets/Verify_photo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa";
import siteMap from "../../sitemap";
import Logo from "../../components/common/Logo";

const intialState = {
  password: "",
  confirmPassword: ""
};

export default function ResetPassword() {
  const [passwordViability, setPasswordViability] = useState(false);
  const [confirmPasswordViability, setConfirmPasswordViability] =
    useState(false);
  const [formError, setFormError] = useState(null);
  const { restToken } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(intialState);
  const handleChange = (e) => {
    if (e.target.name === "confirmPassword") {
      if (formData.password !== e.target.value) {
        setFormError("Password does not match");
      } else {
        setFormError(null);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/reset-password/${restToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate(siteMap.login.path);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
      {/* Left side */}
      <div className="flex flex-col md:flex-row w-full lg:w-1/2 bg-primary p-8 text-white justify-center items-center">
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
        <div className="mb-6 self-start">
          <h1 className="text-2xl font-bold text-left capitalize">
            set new password
          </h1>
          <p className="text-xs capitalize">
            Your previous password has been rested. Please set a new password
            for your account.
          </p>
        </div>
        <form
          method="post"
          className="w-full self-start flex flex-col gap-5"
          onSubmit={handleOnSubmit}
        >
          <label
            htmlFor="password"
            className="relative flex flex-col gap-3 w-full"
          >
            <span className="text-xl capitalize">new password</span>
            <div className="relative w-full">
              <input
                type={passwordViability ? "text" : "password"}
                className="input input-bordered w-full"
                name="password"
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setPasswordViability((prev) => !prev)}
              >
                <FaRegEyeSlash />
              </span>
            </div>
          </label>
          <label
            htmlFor="confirmPassword"
            className="relative flex flex-col gap-3 w-full"
          >
            <span className="text-xl capitalize">confirm password</span>
            <div className="relative w-full">
              <input
                type={confirmPasswordViability ? "text" : "password"}
                className="input input-bordered w-full"
                name="confirmPassword"
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setConfirmPasswordViability((prev) => !prev)}
              >
                <FaRegEyeSlash />
              </span>
            </div>
            {formError && (
              <span className="text-error text-sm">{formError}</span>
            )}
          </label>
          <button type="submit" className="btn btn-primary w-full capitalize">
            set password
          </button>
        </form>
      </div>
    </div>
  );
}
