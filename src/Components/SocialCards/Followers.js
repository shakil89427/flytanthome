import React from "react";
import smallBg from "../../Assets/socialCards/smallBg.png";
import followersBg from "../../Assets/socialCards/followersBg.png";
import { useNavigate } from "react-router-dom";

const Followers = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="r-box text-white flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
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
            Followers Data
          </p>
          <p className="text-md lg:text-2xl pr-5 mt-8 mb-10 font-light">
            Get Complete Access to Your Followers Data from All Social Media
            Platforms. You are No Longer Dependent on Social Media Platforms to
            connect with your Followers or Subscribers. That means even if
            Social Media Platform bans your account, you can Directly connect
            with Your Followers.
          </p>
          <p
            onClick={() => navigate("/products")}
            className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium cursor-pointer"
          >
            ACCESS DATA
          </p>
        </div>
        <div
          style={{ backgroundImage: `url(${followersBg})` }}
          className="aspect-square p-5 lg:p-10 bg-contain bg-center bg-no-repeat rounded-xl w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
        />
      </div>
    </div>
  );
};

export default Followers;
