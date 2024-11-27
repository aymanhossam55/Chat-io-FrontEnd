import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const ChatSkelton = () => {
  const isDark = useSelector((state) => state.theme.darkMode);

  // Choose appropriate colors for dark and light modes
  const baseColor = isDark ? "#2c3e50" : "#e9ecef"; // dark blue / light grey
  const highlightColor = isDark ? "#34495e" : "#f1f3f5"; // light blue / light grey

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Circular skeleton for the image */}
      <Skeleton
        height={50}
        width={50}
        circle={true}
        baseColor={baseColor}
        highlightColor={highlightColor}
        

      />

      {/* Text skeletons */}
      <div className="flex flex-col w-full">
        <Skeleton
        className="rounded-xl"
          height={20}
          width="40%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
        className="rounded-xl"
          height={20}
          width="80%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
    </div>
  );
};

export default ChatSkelton;
