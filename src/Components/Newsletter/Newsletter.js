import React, { useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import cross from "../../Assets/cross.svg";

const Newsletter = ({ setShowNewsleter }) => {
  const submitEmail = (e) => {
    e.preventDefault();
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
        onClick={() => setShowNewsleter(false)}
        className="fixed top-0 left-0 inset-0 bg-[#8f8e8e41] z-10"
      />
      <div className="bg-white rounded-md p-10 flex flex-col items-center gap-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[95%] max-w-[600px]">
        <img
          onClick={() => setShowNewsleter(false)}
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
