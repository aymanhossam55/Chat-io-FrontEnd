import chat from "../../assets/Chat.svg";

export default function RightSide() {
  return (
    <div className="min-h-screen h-screen flex flex-col bg-base-100">
      <div className="flex w-full h-full bg-primary p-8 lg:p-12 text-white justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src={chat}
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
    </div>
  );
}
