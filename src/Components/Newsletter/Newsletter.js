import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import cross from "../../Assets/cross.svg";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import axios from "axios";
import useAnalytics from "../../Hooks/useAnalytics";

const Newsletter = ({ setShowNewsleter }) => {
  const { user, setNotify } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const { addLog } = useAnalytics();

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      addLog("subscribe_to_newsletter");
      const email = e.target[0].value;
      setLoading(true);
      if (user?.userId) {
        const docRef = doc(db, "marketingEmails", user?.userId);
        await setDoc(docRef, { email, userId: user?.userId });
        setLoading(false);
        setNotify({ status: true, message: "Subscribed successfully" });
        setShowNewsleter(false);
      } else {
        await axios.post("https://flytant.herokuapp.com/subscribe", { email });
        setLoading(false);
        setNotify({ status: true, message: "Subscribed successfully" });
        setShowNewsleter(false);
      }
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div
        onClick={() => {
          addLog("hide_newsletter_popup");
          setShowNewsleter(false);
        }}
        className="fixed top-0 left-0 inset-0 bg-[#8f8e8e41] z-10"
      />
      <div className="bg-white rounded-md p-10 flex flex-col items-center gap-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[95%] max-w-[600px]">
        {loading && (
          <div className="absolute inset-0 top-0 left-0 flex items-center justify-center bg-[#b4b2b25b]">
            <Spinner />
          </div>
        )}
        <img
          onClick={() => {
            addLog("hide_newsletter_popup");
            setShowNewsleter(false);
          }}
          src={cross}
          alt=""
          className="absolute top-5 right-5 w-5 cursor-pointer"
        />
        <AiOutlineMail className="text-4xl" />
        <p className="text-lg md:text-xl lg:text-2xl font-semibold">
          Subscribe to our newsletter
        </p>
        <p className="text-gray-500 text-center text-sm">
          Social media strategy,advice,and tips delivered direct to your inbox
        </p>
        <form
          className="flex border border-black rounded-md overflow-hidden w-[80%] items-center"
          onSubmit={submitEmail}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-2 border-none outline-none"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-3 py-2 cursor-pointer "
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-500">Unsubscribe at anytime</p>
      </div>
    </>
  );
};

export default Newsletter;
