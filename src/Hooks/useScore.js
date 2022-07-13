import { useEffect } from "react";

const useScore = ({ setSocialScore, details }) => {
  const getData = async () => {};

  useEffect(() => {
    getData();
  }, [details]);
};

export default useScore;
