import React from "react";
import NavBar from "../NavBar/NavBar";
import "./CSS/Banner.css";
import { BsSearch } from "react-icons/bs";

/* Styles Start */
const styles = {
  main: "flex items-center text-white lg:min-h-[75vh] relative px-6 md:px-14 lg:px-24",
  bgImage:
    "absolute inset-0 mr-10 bg-no-repeat bg-contain bg-right-bottom hidden lg:block z-10 bgImage",
  heading: "text-5xl lg:text-6xl font-semibold",
  formMain:
    "flex flex-col md:flex-row gap-2 md:gap-0 md:rounded-md overflow-hidden mt-8 mb-5 w-full lg:w-5/6",
  inputWrapper:
    "flex border items-center px-5 py-3 bg-white gap-3 w-full rounded-md md:rounded-none",
  input: "w-full border-0 outline-none text-black",
  btn: "bg-[#262424] px-7 py-3 md:py-0 rounded-md md:rounded-none",
  popularWrapper: "flex items-center",
  popularText: "font-semibold mr-3",
  popularItems: "flex flex-wrap gap-3",
  popularItem: "border px-4 py-1 rounded-md font-medium cursor-pointer",
};
/* Styles End */

const Banner = () => {
  return (
    <div className="bgColor">
      <NavBar color={"transparent"} />
      <div className={styles.main}>
        <div className={styles.bgImage} />
        <div className="lg:w-4/6 z-20 my-5">
          <h1 style={{ lineHeight: "115%" }} className={styles.heading}>
            Find <span className="font-bold">Influencers & Brands</span> for
            collaboration
          </h1>

          <form className={styles.formMain} action="#">
            <span className={styles.inputWrapper}>
              <BsSearch className="text-[#929292]" />
              <input
                placeholder="Try Brand name or Top influencers"
                className={styles.input}
                type="text"
              />
            </span>
            <button className={styles.btn}>Search</button>
          </form>

          <div className={styles.popularWrapper}>
            <p className={styles.popularText}>Popular:</p>
            <span className={styles.popularItems}>
              <p className={styles.popularItem}>Top influencers</p>
              <p className={styles.popularItem}>Fashion bloggers</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

// {
//   bgColor: "radial-gradient(#FF9826, #E77B02)",
//   image: bannerBg1,
// },
// {
//   bgColor: "radial-gradient(circle,#C41BFF, #8C03BC)",
//   image: bannerBg2,
// },
// {
//   bgColor: "radial-gradient(circle,#FF1B6D, #CD004A)",
//   image: bannerBg3,
// },
