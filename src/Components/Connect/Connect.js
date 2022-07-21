import moment from "moment";
import React, { useState } from "react";
import useStore from "../../Store/useStore";
import Spinner2 from "../Spinner/Spinner2";
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEffect } from "react";

const Connect = ({ cardUser, followData, setFollowData, setShowConnect }) => {
  const { user, setNotify, countryCode } = useStore();
  const [showMain, setShowMain] = useState(0);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  /* FormData */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();

  const submitForm = async (e) => {
    e.preventDefault();
    if (!phone) {
      return setNotify({ status: false, message: "Enter a valid number" });
    }
    if (!isValidPhoneNumber(phone)) {
      return setNotify({ status: false, message: "Invalid number" });
    }
    setLoading(true);
    try {
      await axios.post("https://flytant.herokuapp.com/contactinfo", {
        name,
        email,
        phone,
        creationDate: moment().unix(),
        id: cardUser?.id,
      });
      setNotify({ status: true, message: "Sent Successfully" });
      setShowConnect(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const changeFollow = () => {
    try {
      const cardUserRef = doc(
        db,
        "users",
        cardUser?.id,
        "followers",
        user?.userId
      );
      const userRef = doc(
        db,
        "users",
        user?.userId,
        "followings",
        cardUser?.id
      );
      if (followData?.userId === user?.userId) {
        setFollowData({});
        deleteDoc(cardUserRef);
        deleteDoc(userRef);
      } else {
        const cardUserData = {
          creationDate: moment().unix(),
          profileImageUrl: cardUser?.profileImageUrl,
          userId: cardUser?.id,
          username: cardUser?.name,
        };
        const userData = {
          creationDate: moment().unix(),
          profileImageUrl: user?.profileImageUrl,
          userId: user?.userId,
          username: user?.username,
        };
        setFollowData(userData);
        setDoc(cardUserRef, userData);
        setDoc(userRef, cardUserData);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (user?.userId) {
      setShowMain(1);
    } else {
      setShowMain(2);
    }
  }, [user]);

  return (
    <div className="z-[99999] absolute w-screen h-screen md:w-[400px] md:h-[90vh] bg-white md:rounded-xl bg-[#08080850] flex items-end">
      {showMain === 1 && (
        <div className="bg-white w-full p-5 grid grid-cols-2 gap-x-5 gap-y-10 rounded-lg">
          <button
            onClick={changeFollow}
            className="bg-black text-white py-3 rounded-lg text-lg font-medium w-full"
          >
            {followData?.userId === user?.userId ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => setShowMain(2)}
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
      )}
      {showMain === 2 && (
        <div className="bg-white w-full p-5 rounded-lg relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 top-0 left-0 flex items-center justify-center bg-[#63626250]">
              <Spinner2 />
            </div>
          )}
          <form className="text-lg font-semibold" onSubmit={submitForm}>
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <p>Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <p>Phone Number</p>
            <PhoneInput
              className="p-2 overflow-hidden otpNumber bg-[#7c7c7c25] rounded-md"
              international
              defaultCountry={countryCode || "US"}
              countryCallingCodeEditable={false}
              value={phone}
              onChange={setPhone}
            />
            <button
              type="submit"
              className="w-full bg-black border-2 border-black text-white py-3 rounded-lg my-3 text-lg font-medium"
            >
              Submit
            </button>
          </form>
          <button
            onClick={() =>
              user?.userId ? setShowMain(1) : setShowConnect(false)
            }
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
