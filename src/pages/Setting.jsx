import ThemeToggler from "../components/inputs/ThemeToggler";
import LastSeen from "../components/chat/LastSeen";
import DeleteAccount from "../components/common/DeleteAccount";
import Logout from "../components/common/Logout";
import chat from "../assets/Chat.svg";
import { useSelector } from "react-redux";

const Setting = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-base-100">
      <div className="w-full lg:w-[30%] p-8 bg-base-100 shadow-lg min-h-full">
        <h1 className="text-3xl font-bold mb-8">Setting</h1>
        <div className="flex items-center mb-8">
          <img
            src={userInfo.avatar}
            alt="User Profile"
            className="w-20 h-20 rounded-full mr-6"
          />
          <span className="text-xl font-semibold">{userInfo.username}</span>
        </div>
        <ThemeToggler />
        <LastSeen />
        <DeleteAccount />
        <Logout />
      </div>

      <div className="hidden lg:flex flex-1 bg-primary justify-center items-center p-8 min-h-full">
        <div className="text-center">
          <img
            src={chat} 
            alt="Chat Illustration"
            className="w-100 h-100 mx-auto mt-8" 
          />
          <h2 className="text-4xl font-bold text-white mt-6">Welcome To Chat Community</h2>
          <p className="text-xl text-white mt-4">
            This website is to cover all people against world to talk with each others
          </p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
