import { useSelector } from "react-redux";
import { DotLoader } from "react-spinners";

const Loading = () => {
  const isDark = useSelector((state) => state.theme.darkMode);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <DotLoader size={32} color={isDark ? "#fff" : "#000"} />
    </div>
  );
};

export default Loading;
