import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/userReducer";
import { toast } from "react-toastify";

const EditPersonalInfo = () => {
  const [isUpdateInfo, setUpdateInfo] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [editInfo, setEditInfoState] = useState({ ...userInfo });
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleUpdateInfo = () => {
    if (isSmallScreen) {
      setUpdateInfo(!isUpdateInfo);
    }
  };

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled); // Toggle the disabled state
  };

  const submitForm = async (e) => {
    e.preventDefault();

    dispatch(updateUser(editInfo));

    setUserInfo(editInfo);
    setIsDisabled(false);
    toggleDisabled();
    toast.success("User information updated successfully");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfoState((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const openToEdit = () => {
    setIsDisabled(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row light:text-base-100 font-roboto w-full">
      {/* Sidebar Section */}
      <div
        className={`w-full md:w-[40%] lg:w-[30%] p-8 bg-base-100 shadow-lg border-r-2 border-b-neutral s:border-0 ${
          isUpdateInfo && isSmallScreen ? "hidden" : "block"
        }`}
      >
        <h1 className="text-3xl font-bold mb-8">Personal Information</h1>

        <div className="flex items-center mb-8">
          <img
            src={userInfo.avatar}
            alt="User Profile"
            className="w-20 h-20 rounded-full mr-6"
          />
          <span className="text-xl font-semibold">
            {userInfo.name || "Loading..."}
          </span>
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
                d="M4 7v16m4-16v16m4-16v16m4-16v16m4-16v16"
              />
            </svg>
            <span className="text-lg">Change Profile Picture</span>
          </div>

          <div
            className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary"
            onClick={toggleUpdateInfo}
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
                d="M12 11V8m0 6h.01M6.5 8H18l2 7-4 4.5H8.5l-4-4.5 2-7z"
              />
            </svg>
            <span className="text-lg">Edit Personal Info</span>
          </div>

          <div>
            <Link to="/app/change-password">
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
                    d="M4 7V3a1 1 0 011-1h6.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0115.414 4H20a1 1 0 011 1v10a1 1 0 01-1 1h-1"
                  />
                </svg>
                <span className="text-lg">Change Password</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          isUpdateInfo && isSmallScreen ? "block" : "hidden md:block"
        } w-full bg-base-100 justify-center items-center p-12 md:w-[60%] lg:w-[70%]`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="mb-4 text-4xl">Edit Personal Info</h2>
          <CgClose
            className="text-primary text-3xl s:text-2xl s:block hidden hover:cursor-pointer"
            onClick={toggleUpdateInfo}
          />
        </div>

        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              disabled={isDisabled}
              type="text"
              id="name"
              name="name"
              value={editInfo.name}
              onChange={handleChange}
              className="input input-bordered w-full p-3 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="username"
            >
              UserName
            </label>
            <input
              disabled={isDisabled}
              type="text"
              id="username"
              name="username"
              value={editInfo.username}
              onChange={handleChange}
              className="input input-bordered w-full p-3 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              disabled={isDisabled}
              type="email"
              id="email"
              name="email"
              value={editInfo.email}
              onChange={handleChange}
              className="input input-bordered w-full p-3 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="mobilePhone"
            >
              Phone Number
            </label>
            <input
              disabled={isDisabled}
              type="text"
              id="mobilePhone"
              name="phone"
              value={editInfo.phone}
              onChange={handleChange}
              className="input input-bordered w-full p-3 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            {isDisabled ? (
              <div
                onClick={openToEdit}
                className="btn btn-primary px-6 py-3 rounded-md text-lg font-medium"
              >
                Change Info.
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-primary px-6 py-3 rounded-md text-lg font-medium"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
