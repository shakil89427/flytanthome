import React, { useEffect } from "react";
import ok from "../../Assets/ok.png";
import cross from "../../Assets/cross.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import useStore from "../../Store/useStore";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import {
  getFirestore,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import moment from "moment";

const Buy = ({ course, setShowBuy }) => {
  const { user, setNotify } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  const updateOnDb = async (paymentId) => {
    const userRef = collection(db, "users", user?.userId);
    const courseRef = collection(db, "courses", course?.courseId);
    await updateDoc(userRef, {
      purchasedCourses: arrayUnion({
        purchaseDate: moment.unix(moment()),
        courseId: course?.courseId,
        paymentId,
        currency: course?.priceData?.currency,
      }),
    });
    await updateDoc(courseRef, { courseBuyers: arrayUnion(user?.userId) });
  };

  const procced = (id) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      name: "Flytant",
      amount: (course?.priceData?.priceNow * 100).toString(),
      currency: course?.priceData?.currency,
      order_id: id,
      handler: ({ razorpay_payment_id }) => {
        updateOnDb(razorpay_payment_id);
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      console.log("err");
    });
    razorpay.open();
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const startToPay = async () => {
    setLoading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      setLoading(false);
      return setNotify({
        status: false,
        message: "Razorpay SDK failed to load. Are you online?",
      });
    }
    try {
      const {
        data: { id },
      } = await axios.post("https://flytant.herokuapp.com/createpayment", {
        ammount: course?.priceData?.priceNow,
        currency: course?.priceData?.currency,
        notes: {
          userId: user?.userId,
          courseId: course?.courseId,
        },
      });
      procced(id);
      setLoading(false);
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
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-40 bg-[#69696969]">
          <Spinner />
        </div>
      )}
      <div
        onClick={() => setShowBuy(false)}
        className="fixed top-0 left-0 w-screen h-screen bg-[#6362625b] z-20"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[600px] pt-14 pb-5  px-5 lg:px-14 bg-white  z-30 rounded-md">
        <div className="max-h-[85vh] overflow-y-scroll scrollbar">
          <img
            onClick={() => setShowBuy(false)}
            src={cross}
            alt=""
            className="absolute top-5 right-5 w-6 cursor-pointer"
          />
          <p className="text-lg lg:text-xl  text-center font-semibold">
            Unlock Full Course
          </p>
          <div className="relative flex items-center justify-center w-full mt-5 mb-10">
            <p className="relative z-20 bg-white px-2">You will Get</p>
            <div className="absolute w-full h-[2px] bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
          </div>
          <div className="flex flex-col gap-5">
            {course?.whatYouWillLearn?.map((item) => (
              <div key={item} className="flex items-start gap-5">
                <img src={ok} alt="" className="w-4 mt-2" />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="relative flex items-center justify-center w-full mt-10 mb-5">
            <p className="relative z-20 bg-white px-2">Just at</p>
            <div className="absolute w-full h-[2px] bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
          </div>
          <p className="text-center text-2xl font-bold">
            {course?.priceData?.priceNow}
            {course?.priceData?.symbol}
          </p>
          <p className="text-center text-xl font-semibold text-gray-500">
            <del>
              {course?.priceData?.pricePrev}
              {course?.priceData?.symbol}
            </del>
          </p>
          <button
            onClick={startToPay}
            className="w-[90%] mx-auto h-12 flex items-center justify-center bg-black text-white rounded-md mt-5"
          >
            Buy Now
          </button>
          <p className="text-center text-xs my-3">
            <Link to="/terms">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Buy;
