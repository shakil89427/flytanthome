import React from "react";
import smallBg from "../../Assets/socialCards/smallBg.png";
import animation from "../../Assets/socialCards/animation.mp4";
import { useNavigate } from "react-router-dom";

const Share = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="py-5 md:py-7 lg:py-14"
    >
      <div className="r-box text-white flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
        <video
          autoPlay
          muted
          loop
          className="aspect-square  bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
        >
          <source src={animation} type="video/mp4" />
        </video>

        <div
          style={{
            backgroundImage: `url(${smallBg})`,
          }}
          className="border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 xl:p-14 rounded-xl w-full md:w-1/2 lg:w-5/12"
        >
          <p
            style={{ lineHeight: "140%" }}
            className="text-3xl lg:text-4xl font-semibold"
          >
            One Tap Sharing
          </p>
          <p className="text-md lg:text-xl my-8 font-medium text-[#BEBEBE]">
            Not Anymore Connect Your Other Bank Accounts to Fi And See All Your
            Balances And Transactions On Fi
          </p>
          <p
            onClick={() => navigate("/products")}
            className="border-2 font-bold w-fit px-8 py-3 rounded-full cursor-pointer select-none hover:bg-white hover:text-black duration-150"
          >
            SHARE PROFILE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Share;
