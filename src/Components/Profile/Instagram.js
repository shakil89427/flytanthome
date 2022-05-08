import axios from "axios";
import React, { useEffect, useState } from "react";
import instagram from "../../Assets/profileSocials/instagram.png";
import Spinner from "../../Components/Spinner/Spinner";
import useConnect from "../../Hooks/Instagram/useConnect";

const Instagram = ({ details }) => {
  const [loading, setLoading] = useState(false);
  const { openPopup } = useConnect(setLoading);

  const getFullData = async ({ username, accessToken }) => {
    // try {
    //   const response = await axios.get(
    //     `https://www.instagram.com/${username}/channel/?__a=1`
    //   );
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    if (details?.linkedAccounts?.Instagram?.accessToken) {
      getFullData(details?.linkedAccounts?.Instagram);
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
