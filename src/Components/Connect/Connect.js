import moment from "moment";
import React, { useState, useEffect } from "react";
import useStore from "../../Store/useStore";
import Spinner2 from "../Spinner/Spinner2";
import {
  getFirestore,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import axios from "axios";

const Connect = ({ id, setShowConnect, cardUser }) => {
  const { user, setNotify } = useStore();
  const [showMain, setShowMain] = useState(true);
  const [followLoading, setFollowLoading] = useState(true);
  const [contactLoading, setContactLoading] = useState(false);
  const [followData, setFollowData] = useState({});
  const db = getFirestore();

  const submitForm = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const name = e.target[0].value;
      const email = e.target[1].value;
      const phone = e.target[2].value;
      const creationDate = moment().unix();
      const finalData = { name, email, phone, creationDate, id };
      await axios.post("https://flytant.herokuapp.com/contactinfo", finalData);
      e.target.reset();
      setContactLoading(false);
      setNotify({ status: true, message: "Sent Successfully" });
      setShowConnect(false);
    } catch (err) {
      setContactLoading(false);
    }
  };

  const getFollowers = async () => {
    try {
      const docRef = doc(db, "users", id, "followers", user?.userId);
      const response = await getDoc(docRef);
      const finalData = response.data();
      if (finalData?.userId) {
        setFollowData(finalData);
      } else {
        setFollowData({});
      }
      setFollowLoading(false);
    } catch (err) {
      setFollowLoading(false);
    }
  };

  const changeFollow = async () => {
    if (followLoading) return;
    setFollowLoading(true);
    try {
      if (followData?.userId) {
        const cardUserRef = doc(db, "users", id, "followers", user?.userId);
        const userRef = doc(db, "users", user?.userId, "followings", id);
        await deleteDoc(cardUserRef);
        await deleteDoc(userRef);
        setFollowData({});
        setFollowLoading(false);
      } else {
        const cardUserRef = doc(db, "users", id, "followers", user?.userId);
        const userRef = doc(db, "users", user?.userId, "followings", id);
        await setDoc(cardUserRef, {
          creationDate: moment().unix(),
          profileImageUrl: user?.profileImageUrl,
          userId: user?.userId,
          username: user?.username,
        });
        await setDoc(userRef, {
          creationDate: moment().unix(),
          profileImageUrl: cardUser?.profileImageUrl,
          userId: id,
          username: cardUser?.name,
        });
        getFollowers();
      }
    } catch (err) {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getFollowers();
    } else {
      setFollowLoading(false);
    }
  }, [user]);

  return (
    <div className="z-[99999] fixed top-0 left-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-screen h-screen md:w-[400px] md:h-[90vh] bg-white md:rounded-lg bg-[#08080850] flex items-end">
      {showMain ? (
        <div className="bg-white w-full p-5 grid grid-cols-2 gap-x-5 gap-y-10 rounded-lg">
          {user?.userId && (
            <button
              onClick={changeFollow}
              className="bg-black text-white py-3 rounded-lg text-lg font-medium w-full"
            >
              {followLoading
                ? "Loading..."
                : followData?.userId === user?.userId
                ? "Following"
                : "Follow"}
            </button>
          )}
          <button
            onClick={() => setShowMain(false)}
            className={`bg-gray-200 py-3 rounded-lg text-lg font-medium ${
              user?.userId ? "col-span-1" : "col-span-2"
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setShowConnect(false)}
            className="col-span-2 border-2 py-3 border-black rounded-lg text-lg font-medium"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="bg-white w-full p-5 rounded-lg relative overflow-hidden">
          {contactLoading && (
            <div className="absolute inset-0 top-0 left-0 flex items-center justify-center bg-[#63626250]">
              <Spinner2 />
            </div>
          )}
          <form className="text-lg font-semibold" onSubmit={submitForm}>
            <p>Name</p>
            <input
              required
              type="text"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <p>Email</p>
            <input
              required
              type="email"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <p>Phone Number</p>
            <input
              required
              type="number"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <button
              type="submit"
              className="w-full bg-black border-2 border-black text-white py-3 rounded-lg my-3 text-lg font-medium"
            >
              Submit
            </button>
          </form>
          <button
            onClick={() => setShowMain(true)}
            className="border-2 py-3 text-lg  font-medium border-black rounded-lg w-full text-center cursor-pointer"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Connect;
