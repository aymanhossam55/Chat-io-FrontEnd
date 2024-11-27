import leftImage from "../../assets/Verify_photo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import siteMap from "./../../sitemap";
import Logo from "./../../components/common/Logo";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      const response = await fetch("/api/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, verificationCode: code })
      });
      const data = await response.json();
      toast.success(data.message);

      navigate(siteMap.login.path);
    } catch (error) {
      toast.error(error.message || "Verification failed!");
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
          imgClass="w-10 lg:w-16 rounded-full"
        />

        <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
          Verify Code
        </h2>
        <p className="text-sm mb-4 lg:mb-6">
          An authentication code has been sent to your email.
        </p>

        <div className="mb-5">
          <label className="block text-sm mb-2 font-semibold text-neutral">
            Enter Your Email
          </label>
          <input
            type="text"
            placeholder="Enter the Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm mb-2 font-semibold text-neutral">
            Enter Code
          </label>
          <input
            type="text"
            placeholder="Enter the code"
            className="input input-bordered w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <button
          onClick={handleVerify}
          className="btn btn-primary w-full h-12 text-lg mb-4"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
