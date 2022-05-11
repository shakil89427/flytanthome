import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTiktok } from "react-icons/fa";
import useConnect from "../../Hooks/Tiktok/useConnect";
const Tiktok = ({ details }) => {
  const [loading, setLoading] = useState(false);
  const { openPopup } = useConnect(setLoading);

  const getData = async (userId) => {
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/tiktokdata",
        {
          userId,
        }
      );
      console.log(response.data);
      // if (response?.data?.error) {
      //   setLoading(false);
      //   const { Twitter, ...rest } = details.linkedAccounts;
      //   const updated = { linkedAccounts: rest };
      //   return await updateDoc(userRef, updated);
      // }
      // const responseData = { ...response.data.userInfo, validId: details.id };
      // setData(responseData);
      // setTwitterData([...twitterData, responseData]);
      // setLoading(false);
      // if (response?.data?.tokenInfo) {
      //   const updated = {
      //     linkedAccounts: {
      //       ...details.linkedAccounts,
      //       Twitter: response?.data?.tokenInfo,
      //     },
      //   };
      //   await updateDoc(userRef, updated);
      // }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (details?.linkedAccounts?.Tiktok?.access_token) {
      getData(details?.id);
    } else {
      setLoading(false);
    }
  }, [details]);
  return (
    <>
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
    </>
  );
};

export default Tiktok;
