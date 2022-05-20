import axios from "axios";
import { useEffect } from "react";
import useStore from "../Store/useStore";
import publicIp from "public-ip";

const useLocationCheck = () => {
  const { setCountryCode } = useStore();

  const getBasic = async () => {
    try {
      const ip = await publicIp.v4();
      const res = await axios.post("https://flytant.herokuapp.com/basic", {
        ip,
      });
      setCountryCode(res.data.country_code);
    } catch (err) {}
  };

  useEffect(() => {
    getBasic();
  }, []);
};

export default useLocationCheck;
