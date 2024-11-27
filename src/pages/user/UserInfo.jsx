import { Link } from "react-router-dom";
import AmigosChatting from "../../assets/Amigos Chatting.png";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div className="min-h-screen flex flex-col md:flex-row light:text-base-100 font-roboto w-full">
      <div className="w-full md:w-[40%] lg:w-[30%] p-8 bg-base-100 shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Personal Information</h1>

        <div className="flex items-center mb-8">
          <img
            src={userInfo.avatar}
            alt="User Profile"
            className="w-20 h-20 rounded-full mr-6"
          />
          <span className="text-xl font-semibold">{userInfo.username}</span>
        </div>

        <div className="space-y-8">
          <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4 text-primary"
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

          <div>
            <Link to="/app/personal-info">
              <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-primary"
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

          <div>
            <Link to="/app/change-password">
              <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4 text-primary"
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

      <div className="bg-primary text-center light:text-base-100 flex flex-col justify-center items-center p-12 w-full md:w-[60%] lg:w-[70%] s:hidden m:hidden">
        <div className="flex justify-center">
          <img src={AmigosChatting} alt="Illustration" className="mb-8" />
        </div>
        <p className="text-xl text-white">
          Start Chat with your Friends, Make calls, Share your Screen and get
          Faster Now...
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
