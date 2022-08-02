import axios from "axios";
import { useEffect } from "react";
import useStore from "../Store/useStore";
import publicIp from "public-ip";

const useLocationCheck = () => {
  const { countryCode, setCountryCode, authState } = useStore();

  const getBasic = async () => {
    try {
      const ip = await publicIp.v4();
      const res = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/basic",
        {
          ip,
        }
      );
      setCountryCode(res.data.country_code);
    } catch (err) {}
  };

  useEffect(() => {
    if (!countryCode && !authState) {
      getBasic();
    }
  }, [authState]);
};

export default useLocationCheck;
