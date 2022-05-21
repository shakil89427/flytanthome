import axios from "axios";
import React, { useEffect, useState } from "react";
import instagram from "../../Assets/profileSocials/instagram.png";
import Spinner from "../../Components/Spinner/Spinner";
import useConnect from "../../Hooks/Instagram/useConnect";

const Instagram = ({ details }) => {
  const [loading, setLoading] = useState(true);
  const { openPopup } = useConnect(setLoading);
  const [data, setData] = useState(false);

  const getFullData = async (username) => {
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/instadata",
        {
          username,
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (details?.linkedAccounts?.Instagram?.username) {
      getFullData(details?.linkedAccounts?.Instagram?.username);
    } else {
      setLoading(false);
    }
  }, [details]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !details?.linkedAccounts?.Instagram && details?.access && (
        <div className="flex flex-col items-center gap-5 mt-40 text-gray-500 text-sm font-medium">
          <p>No account linked</p>

          <p onClick={openPopup}>
            <img className="w-1/2 mx-auto" src={instagram} alt="" />
          </p>
          <p>Click here to link your instagram</p>
        </div>
      )}
    </>
  );
};

export default Instagram;
