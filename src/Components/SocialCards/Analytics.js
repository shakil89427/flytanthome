import React from "react";
import { useNavigate } from "react-router-dom";
import analyticsBg from "../../Assets/socialCards/analyticsBg.png";
import smallBg from "../../Assets/socialCards/smallBg.png";

const Analytics = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="r-box text-white flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
        <div
          style={{ backgroundImage: `url(${analyticsBg})` }}
          className="aspect-square p-5 lg:p-10 bg-contain bg-center bg-no-repeat rounded-xl w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
        ></div>
        <div
          style={{
            backgroundImage: `url(${smallBg})`,
          }}
          className="border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 rounded-xl w-full md:w-1/2 lg:w-5/12"
        >
          <p
            style={{ lineHeight: "120%" }}
            className="text-4xl lg:text-5xl font-semibold"
          >
            Analytics
          </p>
          <p className="text-md lg:text-2xl pr-10 lg:pr-14 mt-8 mb-10 font-light">
            Not Anymore Connect Your Other Bank Accounts to Fi And See All Your
            Balances And Transactions On Fi
          </p>
          <p
            onClick={() => navigate("/products")}
            className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium cursor-pointer"
          >
            VIEW ANALYTICS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
