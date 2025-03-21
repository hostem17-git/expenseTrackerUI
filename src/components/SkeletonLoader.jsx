import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = (circle) => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton width={100} height={16} className=" backdrop-blur-lg !bg-white/40  shadow-md" />
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
