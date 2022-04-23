import useAuthCheck from "./useAuthCheck";
import useLoadInfluencers from "./useLoadInfluencers";
import useLoadSponsorships from "./useLoadSponsorships";

const useLoader = () => {
  useAuthCheck();
  useLoadInfluencers();
  useLoadSponsorships();
};

export default useLoader;
