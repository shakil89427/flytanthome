import axios from "axios";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import twitter from "../../Assets/profileSocials/twitter.png";
import useConnect from "../../Hooks/Twitter/useConnect";
import useStore from "../../Store/useStore";

const Twitter = ({ details }) => {
  const { twitterData, setTwitterData } = useStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { openPopup } = useConnect(setLoading);
  const db = getFirestore();

  /* Get user data */
  const getData = async (info) => {
    const userRef = doc(db, "users", details.id);
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/twitterdata",
        info
      );
      if (response?.data?.error) {
        setLoading(false);
        const { Twitter, ...rest } = details.linkedAccounts;
        const updated = { linkedAccounts: rest };
        return await updateDoc(userRef, updated);
      }
      const responseData = { ...response.data.userInfo, validId: details.id };
      setData(responseData);
      setTwitterData([...twitterData, responseData]);
      setLoading(false);
      if (response?.data?.tokenInfo) {
        const updated = {
          linkedAccounts: {
            ...details.linkedAccounts,
            Twitter: response?.data?.tokenInfo,
          },
        };
        await updateDoc(userRef, updated);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  /* Check data exist or not */
  useEffect(() => {
    if (details?.linkedAccounts?.Twitter) {
      const valid = twitterData.find((item) => item.validId === details.id);
      if (valid?.validId) {
        setData(valid);
        setLoading(false);
      } else {
        getData(details?.linkedAccounts?.Twitter);
      }
    } else {
      setLoading(false);
    }
  }, [details]);

  return (
    <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
      <p>No account linked</p>
      <p onClick={openPopup}>
        <img className="w-1/2 mx-auto" src={twitter} alt="" />
      </p>
      <p>Click here to link your twitter</p>
    </div>
  );
};

export default Twitter;
