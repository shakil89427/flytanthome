import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Connect from "../Components/Connect/Connect";
import Spinner from "../Components/Spinner/Spinner";
import Error from "./Error";
import useStore from "../Store/useStore";
import useAnalytics from "../Hooks/useAnalytics";
import defaultUser from "../Assets/defaultUser.png";

const User = () => {
  const { user, authLoading } = useStore();
  const { id } = useParams();
  const [cardUser, setCardUser] = useState({});
  const [followData, setFollowData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConnect, setShowConnect] = useState(false);
  const { addLog } = useAnalytics();

  const getData = async () => {
    try {
      const {
        data: { card, follow },
      } = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/getuser",
        {
          cardId: id,
          userId: user?.userId || false,
        }
      );
      setCardUser(card);
      setFollowData(follow);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      getData();
    }
  }, [authLoading]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 inset-0 flex items-center justify-center bg-black z-[999]">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black z-[999] flex items-center justify-center">
      {showConnect && (
        <Connect
          cardUser={cardUser}
          followData={followData}
          setFollowData={setFollowData}
          setShowConnect={setShowConnect}
        />
      )}
      <div className="w-full h-full md:w-[400px] md:h-[90vh] md:rounded-xl overflow-y-scroll pb-14 scrollbar bg-white relative">
        <div
          style={{
            backgroundImage: `url(${
              cardUser?.featureImageUrl ||
              "https://firebasestorage.googleapis.com/v0/b/flytant-cb72e.appspot.com/o/socail_card_default_feature_graphic%2Fimage_2022_07_05T07_03_49_436Z.png?alt=media&token=b13c47e5-c6ce-421b-93dd-46b42fa30db4"
            })`,
          }}
          className="aspect-[4/2] bg-cover bg-center bg-no-repeat md:rounded-tl-lg md:rounded-tr-lg"
        />

        <div
          style={{
            backgroundImage: `url(${cardUser?.profileImageUrl || defaultUser})`,
            border: "5px solid white",
          }}
          className="bg-cover bg-center bg-no-repeat rounded-full w-[40%] aspect-square relative mx-auto -translate-y-1/2"
        >
          <div className="absolute top-0 left-0 inset-0 rounded-full -rotate-45">
            <div
              style={{
                backgroundImage: `url(${
                  cardUser?.brandImageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/flytant-cb72e.appspot.com/o/flytant_image%2Fappicon.png?alt=media&token=f8f276ff-8186-4d51-87fb-b608dcc532d6"
                })`,
              }}
              className="bg-cover bg-center bg-no-repeat rounded-full w-[40%] aspect-square absolute bottom-0 left-1/2 border-4 border-white shadow-xl translate-y-1/2 -translate-x-1/2 rotate-45"
            />
          </div>
        </div>
        <div className="px-5 -mt-14">
          <p className="text-center text-2xl font-bold">
            {cardUser?.name || cardUser?.username}
          </p>
          {cardUser?.manualLocation && (
            <p className="text-center  text-gray-500 mt-2 font-medium">
              {cardUser?.manualLocation}
            </p>
          )}

          <p className="text-center  mt-5 text-gray-500 px-8 font-medium">
            {cardUser?.bio}
          </p>
          <p
            onClick={() => {
              addLog("connect");
              user?.userId !== id && setShowConnect(true);
            }}
            className="cursor-pointer text-center select-none mt-10 bg-black text-white w-full py-5 rounded-full font-semibold text-xl active:scale-95"
          >
            Connect
          </p>

          <div
            className={`mt-12 flex items-center justify-center gap-5 flex-wrap`}
          >
            {cardUser?.socialLinks?.map((item) => (
              <a
                onClick={() => addLog("cardprofile_social_link")}
                key={item?.name}
                href={
                  item?.type === "phone"
                    ? `tel:${item?.data}`
                    : item?.type === "email"
                    ? `mailto:${item?.data}`
                    : item?.data
                }
                target="_blank"
                rel="noreferrer"
                className="hover:scale-105 duration-150 w-[27%]"
              >
                <img
                  className="shadow-md rounded-3xl"
                  src={item?.icon}
                  alt=""
                />
                <p className="text-sm text-center font-medium mt-2 text-gray-600">
                  {item?.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
