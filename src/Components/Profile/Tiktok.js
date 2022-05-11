import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTiktok } from "react-icons/fa";
import useConnect from "../../Hooks/Tiktok/useConnect";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
const Tiktok = ({ details }) => {
  const { tiktokData, setTiktokData } = useStore();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { openPopup } = useConnect(setLoading);

  const getData = async (userId) => {
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/tiktokdata",
        {
          userId,
        }
      );
      console.log("From fetched", response.data);
      const responseData = { ...response.data, validId: details.id };
      setData(responseData);
      setTiktokData([...tiktokData, responseData]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (details?.linkedAccounts?.Tiktok?.access_token) {
      const valid = tiktokData.find((item) => item.validId === details.id);
      if (valid?.validId) {
        setData(valid);
        console.log("From stored", valid);
        setLoading(false);
      } else {
        getData(details?.id);
      }
    } else {
      setLoading(false);
    }
  }, [details]);

  return (
    <>
      {loading && <Spinner />}
      {!loading &&
        !details?.linkedAccounts?.Tiktok?.access_token &&
        details?.access && (
          <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
            <p>No account linked</p>
            <p
              onClick={openPopup}
              className="bg-black text-white text-3xl p-5 rounded-full cursor-pointer"
            >
              <FaTiktok />
            </p>
            <p>Click here to link your tiktok</p>
          </div>
        )}
      {!loading &&
        !details?.linkedAccounts?.Tiktok?.access_token &&
        !details?.access && <p className="mt-20 text-center">No data found</p>}
    </>
  );
};

export default Tiktok;
