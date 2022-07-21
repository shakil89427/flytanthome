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
      className="min-h-screen flex items-center justify-center mb-14"
    >
      <div className="r-box text-white flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
        <div
          style={{ backgroundImage: `url(${analyticsBg})` }}
          className="aspect-square p-5 lg:p-10 bg-contain bg-center bg-no-repeat rounded-xl w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
        ></div>
        <div
          onClick={() => navigate("/products")}
          style={{
            backgroundImage: `url(${smallBg})`,
          }}
          className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12"
        >
          <p
            style={{ lineHeight: "120%" }}
            className="text-4xl lg:text-5xl font-semibold"
          >
            Analytics
          </p>
          <p className="text-md lg:text-2xl mt-8 mb-10 font-light">
            Full Access to Your Social Media Analytics and who viewed your
            Profile, how many people visited links, who saved your contact and
            all sorts Data that you need to build your Strong Fan Following.
          </p>
          <p className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
            VIEW ANALYTICS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
