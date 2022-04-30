import useAuthCheck from "../../Hooks/useAuthCheck";
import useInstaConnect from "../../Hooks/useInstaConnect";
import useYoutubeConnect from "../../Hooks/useYoutubeConnect";

const ActivityCheck = () => {
  useAuthCheck();
  useInstaConnect();
  useYoutubeConnect();
};

export default ActivityCheck;
