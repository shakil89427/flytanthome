import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import success from "../../Assets/onboard/success.png";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
    if (!location?.state?.from?.pathname?.includes("/subscription")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="w-fit min-h-[80vh] mx-auto flex flex-col items-center justify-center gap-7 px-5">
        <img src={success} alt="" />
        <p className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">
          You've Successfully subscribed the plan
        </p>
        <button
          onClick={() => navigate("/subscription", { replace: true })}
          className="bg-black text-white px-10 py-2 rounded-md font-medium text-xl"
        >
          Done
        </button>
      </div>
    </>
  );
};

export default Success;
