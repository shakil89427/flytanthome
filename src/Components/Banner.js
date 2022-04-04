import React from "react";
import { BsSearch } from "react-icons/bs";
import bannerBg from "../Assets/Rectangle 1455_ccexpress 1.png";
import { bannerStyles } from "../Styles/HomeStyles";

const Banner = () => {
  return (
    <div className={bannerStyles.main}>
      <div>
        <h1 style={{ lineHeight: "75px" }} className={bannerStyles.heading}>
          Find <span className="font-bold">Influencers & Brands</span> for
          collaboration
        </h1>

        <form className={bannerStyles.formMain} action="#">
          <span className={bannerStyles.inputWrapper}>
            <BsSearch className="text-[#929292]" />
            <input
              placeholder="Try Brand name or Top influencers"
              className={bannerStyles.input}
              type="text"
            />
          </span>
          <button className={bannerStyles.btn}>Search</button>
        </form>

        <div className={bannerStyles.popularWrapper}>
          <p className={bannerStyles.popularText}>Popular:</p>
          <span className={bannerStyles.popularItems}>
            <p className={bannerStyles.popularItem}>Top influencers</p>
            <p className={bannerStyles.popularItem}>Fashion bloggers</p>
            <p className={bannerStyles.popularItem}>Fashion bloggers</p>
          </span>
        </div>
      </div>
      <img className={bannerStyles.bg} src={bannerBg} alt="" />
    </div>
  );
};

export default Banner;
