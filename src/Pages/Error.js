import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../Hooks/useAnalytics";

const Error = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 w-[95%]">
        <p className="text-8xl font-semibold text-shadow-xl">404</p>
        <div className="text-center">
          <p className="text-lg font-semibold">Page not found</p>
          <p className="text-sm text-gray-600 mt-2">
            We are sorry but we can't find the page you are looking for
          </p>
        </div>
        <button
          onClick={() => {
            addLog("back_to_home_error_page");
            navigate("/");
          }}
          className="bg-black text-white px-5 py-3 rounded-lg font-medium cursor-pointer z-50"
        >
          Back To Home
        </button>
      </div>
    </>
  );
};

export default Error;
