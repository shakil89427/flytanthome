import React from "react";
import NavBar from "../../NavBar/NavBar";
import bannerBg from "../../../Assets/userHome/bannerBg2.png";
import { AiFillApple } from "react-icons/ai";
import playstore from "../../../Assets/playstore.png";

/* Styles Start */
const styles = {
  main: "text-white xl:min-h-[620px] py-10 relative r-box",
  bgImage:
    "absolute inset-0 bg-no-repeat bg-contain bg-right invisible xl:visible",
  heading: "text-5xl lg:text-6xl font-semibold",
  formMain:
    "flex flex-col md:flex-row gap-2 md:gap-0 md:rounded-tl-md md:rounded-bl-md overflow-hidden mt-8 mb-5 w-full lg:w-5/6",
  inputWrapper:
    "flex border items-center px-5 py-3 bg-white gap-3 w-full rounded-md md:rounded-none",
  input: "w-full border-0 outline-none text-black",
  btn: "bg-[#5F5F5F] px-7 py-3 md:py-0 rounded-md md:rounded-none md:rounded-tr-md md:rounded-br-md border border-white font-medium",
  popularWrapper: "flex items-center mt-8 gap-3",
  popularText: "font-semibold",
  popularItem: "border px-4 py-1 rounded-md font-medium cursor-pointer",
};
/* Styles End */

const Banner = () => {
  return (
    <div className="bg-black">
      <NavBar />
      <div className={styles.main}>
        <div
          style={{ backgroundImage: `url(${bannerBg})` }}
          className={styles.bgImage}
        />
        <div className="xl:w-4/6 my-12 lg:my-28 relative">
          <h1 style={{ lineHeight: "110%" }} className={styles.heading}>
            Find <span className="font-bold">Influencers</span>
          </h1>
          <h1 style={{ lineHeight: "110%" }} className={styles.heading}>
            & <span className="font-bold">Brands</span> for collaboration
          </h1>
          <div className="flex gap-3 text-black mt-10 flex-wrap">
            <a
              href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-3 bg-white w-52 rounded-lg gap-1 py-2 hover:scale-105 duration-150"
            >
              <img className="w-6 mx-1" src={playstore} alt="" />
              <span>
                <p className="text-sm font-medium">GET IT ON</p>
                <p className="font-bold text-lg">Play Store</p>
              </span>
            </a>
            <a
              href="https://apps.apple.com/in/app/flytant/id1530158515"
              target="_blank"
              rel="noreferrer"
              className="flex items-center pl-3  bg-white w-52 rounded-lg gap-1 py-2 hover:scale-105 duration-150"
            >
              <AiFillApple className="text-3xl" />
              <span>
                <p className="text-sm font-medium">DOWNLOAD ON THE</p>
                <p className="font-bold text-lg">App Store</p>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
