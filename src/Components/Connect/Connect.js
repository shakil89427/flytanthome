import moment from "moment";
import React, { useState } from "react";
import useStore from "../../Store/useStore";
import Spinner2 from "../Spinner/Spinner2";
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEffect } from "react";
import useAnalytics from "../../Hooks/useAnalytics";

const Connect = ({ cardUser, followData, setFollowData, setShowConnect }) => {
  const { user, setNotify, countryCode } = useStore();
  const [showMain, setShowMain] = useState(0);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  /* FormData */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const { addLog } = useAnalytics();

  const submitForm = async (e) => {
    e.preventDefault();
    if (!phone) {
      return setNotify({ status: false, message: "Enter a valid number" });
    }
    if (!isValidPhoneNumber(phone)) {
      return setNotify({ status: false, message: "Invalid number" });
    }
    setLoading(true);
    addLog("submit");
    try {
      await axios.post(
        "https://arcane-castle-29935.herokuapp.com/contactinfo",
        {
          name,
          email,
          phone,
          creationDate: moment().unix(),
          id: cardUser?.id,
        }
      );
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
        cardUser.id,
        "followers",
        user.userId
      );
      const userRef = doc(db, "users", user.userId, "following", cardUser.id);
      if (followData?.userId) {
        addLog("unfollow");
        setFollowData({});
        deleteDoc(cardUserRef);
        deleteDoc(userRef);
      } else {
        addLog("follow");
        const cardUserData = {
          creationDate: moment().unix(),
          profileImageUrl:
            cardUser?.profileImageUrl ||
            "https://firebasestorage.googleapis.com/v0/b/flytant-cb72e.appspot.com/o/default_user_image%2FGroup%201763.png?alt=media&token=ef261d0b-a8d9-4791-a0c5-2d8338b77ea3",
          userId: cardUser?.id,
          username: cardUser?.username,
        };
        const userData = {
          creationDate: moment().unix(),
          profileImageUrl:
            user?.profileImageUrl ||
            "https://firebasestorage.googleapis.com/v0/b/flytant-cb72e.appspot.com/o/default_user_image%2FGroup%201763.png?alt=media&token=ef261d0b-a8d9-4791-a0c5-2d8338b77ea3",
          userId: user?.userId,
          username: user?.username || "",
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
    <div className="z-10 absolute w-full h-full md:w-[400px] md:h-[90vh] md:rounded-xl overflow-hidden">
      <div
        onClick={() => {
          setShowConnect(false);
          addLog("connect");
        }}
        className="w-full h-full absolute top-0 left-0 bg-[#08080850]"
      />
      {showMain === 1 && (
        <div className="bg-white w-full p-5 grid grid-cols-2 gap-x-5 gap-y-10 rounded-lg absolute left-0 bottom-0">
          <button
            onClick={changeFollow}
            className="bg-black text-white py-3 rounded-lg text-lg font-medium w-full"
          >
            {followData?.userId === user?.userId ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => {
              setShowMain(2);
              addLog("contact");
            }}
            className={`bg-gray-200 py-3 rounded-lg text-lg font-medium ${
              user?.userId ? "col-span-1" : "col-span-2"
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => {
              setShowConnect(false);
              addLog("cancel");
            }}
            className="col-span-2 border-2 py-3 border-gray-500 rounded-lg text-lg font-medium"
          >
            Cancel
          </button>
        </div>
      )}
      {showMain === 2 && (
        <div className="bg-white w-full p-5 rounded-lg absolute left-0 bottom-0 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 top-0 left-0 flex items-center justify-center bg-[#63626250]">
              <Spinner2 />
            </div>
          )}
          <form className="text-md font-semibold" onSubmit={submitForm}>
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
              className="p-2 mt-1 mb-5 overflow-hidden otpNumber bg-[#7c7c7c25] rounded-md"
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
            onClick={() => {
              user?.userId ? setShowMain(1) : setShowConnect(false);
              addLog(user?.userId ? "back" : "cancel");
            }}
            className="border-2 py-3 text-lg  font-medium border-gray-500 rounded-lg w-full text-center cursor-pointer"
          >
            {user?.userId ? "Back" : "Cancel"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Connect;
