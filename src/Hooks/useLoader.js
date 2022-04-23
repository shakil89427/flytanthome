import useAuthCheck from "./useAuthCheck";
import useLoadSponsorships from "./useLoadSponsorships";

const useLoader = () => {
  useAuthCheck();
  useLoadSponsorships();
};

export default useLoader;
