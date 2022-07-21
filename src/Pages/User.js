import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Connect from "../Components/Connect/Connect";
import Spinner from "../Components/Spinner/Spinner";
import Error from "./Error";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import useStore from "../Store/useStore";

const User = () => {
  const { user } = useStore();
  const { id } = useParams();
  const [cardUser, setCardUser] = useState({});
  const [followData, setFollowData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConnect, setShowConnect] = useState(false);
  const db = getFirestore();

  const getFollowers = async () => {
    try {
      const docRef = doc(db, "users", id, "followers", user?.userId);
      const response = await getDoc(docRef);
      const finalData = response.data();
      if (finalData?.userId) {
        setFollowData(finalData);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (user?.userId) {
      getFollowers();
    }
  }, [user]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    axios
      .post("https://flytant.herokuapp.com/getuser", { userId: id })
      .then((res) => {
        setCardUser({ ...res.data, id });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="fixed top-0 left-0 inset-0 bg-black z-[999] flex items-center justify-center">
      {showConnect && (
        <Connect
          cardUser={cardUser}
          followData={followData}
          setFollowData={setFollowData}
          setShowConnect={setShowConnect}
        />
      )}
      <div className="w-screen h-screen md:w-[400px] md:h-[90vh] md:rounded-xl overflow-y-scroll scrollbar pb-14 bg-white">
        <div
          style={{ backgroundImage: `url(${cardUser?.featureImageUrl})` }}
          className="aspect-[4/2] bg-cover bg-center bg-no-repeat md:rounded-tl-lg md:rounded-tr-lg"
        />

        <div
          style={{
            backgroundImage: `url(${cardUser?.profileImageUrl})`,
            border: "5px solid white",
          }}
          className="bg-cover bg-center bg-no-repeat rounded-full w-[40%] aspect-square relative mx-auto -translate-y-1/2"
        >
          <div className="absolute top-0 left-0 inset-0 rounded-full -rotate-45">
            <div
              style={{
                backgroundImage: `url(${cardUser?.brandImageUrl})`,
              }}
              className="bg-cover bg-center bg-no-repeat rounded-full w-[40%] aspect-square absolute bottom-0 left-1/2 border-4 border-white shadow-xl translate-y-1/2 -translate-x-1/2 rotate-45"
            />
          </div>
        </div>
        <div className="px-5 -mt-14">
          <p className="text-center text-2xl font-bold">{cardUser?.name}</p>
          <p className="text-center  text-gray-500 mt-2 font-medium">India</p>
          <p className="text-center  mt-5 text-gray-500 px-8 font-medium">
            {cardUser?.bio}
          </p>
          <button
            onClick={() => setShowConnect(true)}
            className="select-none mt-10 block bg-black text-white w-full py-5 rounded-full font-semibold text-xl"
          >
            Connect
          </button>

          <div
            className={`mt-12 flex items-center justify-center gap-5 flex-wrap`}
          >
            {cardUser?.socialLinks?.map((item) => (
              <a
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
