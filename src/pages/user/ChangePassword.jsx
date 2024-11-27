import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/reducers/userReducer"; // Ensure this action is defined in your reducer

const ChangePassword = () => {
  const [isChangePassword, SetChangePassword] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // To store success/error messages

  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.user); // Assuming error handling from the state

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleChangePassword = () => {
    if (isSmallScreen) {
      SetChangePassword(!isChangePassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordPayload = {
      oldPassword,
      newPassword
    };

    const resultAction = await dispatch(changePassword(passwordPayload));

    if (changePassword.fulfilled.match(resultAction)) {
      setMessage("Password changed successfully!");
    } else {
      setMessage("Error changing password: " + error);
    }

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex x:flex-row light:text-base-100 font-roboto w-full">
      <div
        className={`w-full md:w-[40%] lg:w-[30%] p-8 bg-base-100 shadow-lg border-r-2 border-b-neutral s:border-0 ${
          isChangePassword && isSmallScreen ? "hidden" : "block"
        }`}
      >
        <h1 className="text-3xl font-bold mb-8">Change Information</h1>

        <div className="flex items-center mb-8">
          <img
            src={faker.image.avatar()}
            alt="User Profile"
            className="w-20 h-20 rounded-full mr-6"
          />
          <span className="text-xl font-semibold">{userInfo.username}</span>
        </div>

        <div className="space-y-8">
          <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7v16m4-16v16m4-16v16m4-16v16"
              />
            </svg>
            <span className="text-lg">Change Profile Picture</span>
          </div>

          <div>
            <Link to="/app/personal-info">
              <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11V8m0 6h.01M6.5 8H18l2 7-4 4.5H8.5l-4-4.5 2-7z"
                  />
                </svg>
                <span className="text-lg">Edit Personal Info.</span>
              </div>
            </Link>
          </div>

          <div
            className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary"
            onClick={toggleChangePassword}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7V3a1 1 0 011-1h6.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0115.414 4H20a1 1 0 011 1v10a1 1 0 01-1 1h-1"
              />
            </svg>
            <span className="text-lg">Change Password</span>
          </div>
        </div>
      </div>

      <div
        className={`${
          isChangePassword && isSmallScreen ? "block" : "hidden md:block"
        } w-full bg-base-100 justify-center items-center p-12 md:w-[60%] lg:w-[70%]`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="mb-4 text-4xl">Change Password</h2>
          <CgClose
            className="text-primary text-3xl s:text-2xl s:block hidden hover:cursor-pointer"
            onClick={toggleChangePassword}
          />
        </div>
        {message && (
          <p className="text-lg font-medium text-green-600 mb-4">{message}</p>
        )}{" "}
        {/* Display message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="input input-bordered w-full p-3 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full p-3 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full p-3 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary px-6 py-3 rounded-md text-lg font-medium"
            >
              Change The Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
