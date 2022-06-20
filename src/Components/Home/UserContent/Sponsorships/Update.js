import { doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import updateBg from "../../../../Assets/userHome/updateBg.png";
import useStore from "../../../../Store/useStore";
import Spinner2 from "../../../Spinner/Spinner2";

const Update = () => {
  const { user, setNotify } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  const getUpdate = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const userRef = doc(db, "marketingEmails", user?.userId);
      await setDoc(userRef, {
        email: e.target[0].value,
        userId: user?.userId,
        deviceType: "Website",
      });
      setLoading(false);
      setNotify({ status: true, message: "Subscribed successfully" });
      e.target.reset();
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  return (
    <div className="p-10 border-2 rounded-xl flex items-center gap-10">
      <div className="w-full xl:w-5/6">
        <div className="">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold">
            Get Sponsorships update on your mail directly
          </p>
          <p className="text-gray-500 text-sm md:text-md lg:text-lg mt-2 font-medium">
            Easy and fast way to get updates on your mail
          </p>
        </div>
        <form onSubmit={getUpdate}>
          <input
            className="w-full md:w-[90%] lg:w-[80%] bg-[#ECECEC] px-3 py-4 my-8"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <br />
          {loading ? (
            <div className="p-4">
              <Spinner2 />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-black text-white px-7 py-4 rounded-full"
            >
              Get Updates
            </button>
          )}
        </form>
      </div>
      <div className="hidden xl:block w-1/6">
        <img src={updateBg} alt="" />
      </div>
    </div>
  );
};

export default Update;
