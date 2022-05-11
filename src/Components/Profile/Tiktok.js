import axios from "axios";
import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaTiktok } from "react-icons/fa";
import useConnect from "../../Hooks/Tiktok/useConnect";
const Tiktok = ({ details }) => {
  const [loading, setLoading] = useState(false);
  const { openPopup } = useConnect(setLoading);

  const getData = async (info) => {
    // const userRef = doc(db, "users", details.id);
    try {
      const response = await axios.post(
        "http://localhost:5000/tiktokdata",
        info
      );
      console.log(response);
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
    if (details?.linkedAccounts?.Tiktok) {
      getData(details?.linkedAccounts?.Tiktok);
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
