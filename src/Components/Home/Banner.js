import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Banner.css";
import { BsSearch } from "react-icons/bs";
import bannerBg1 from "../../Assets/bannerBg1.png";
import bannerBg2 from "../../Assets/bannerBg2.png";
import bannerBg3 from "../../Assets/bannerBg3.png";

/* Styles Start */
const styles = {
  main: "flex items-center text-white lg:h-[75vh] relative px-6 md:px-20 lg:px-24",
  bgColor: "absolute inset-0 -z-10",
  bgImage:
    "absolute inset-0 mr-10 bg-no-repeat bg-contain bg-right-bottom hidden lg:block -z-10 ",
  heading: "text-5xl lg:text-6xl font-semibold",
  formMain:
    "flex flex-col md:flex-row gap-2 md:gap-0 md:rounded-md overflow-hidden mt-8 mb-5 w-full lg:w-5/6",
  inputWrapper:
    "flex border items-center px-5 py-3 bg-white gap-3 w-full rounded-md md:rounded-none",
  input: "w-full border-0 outline-none text-black",
  btn: "bg-[#262424] px-7 py-3 md:py-0 rounded-md md:rounded-none",
  popularWrapper: "flex md:items-center",
  popularText: "font-semibold mr-2",
  popularItems: "flex flex-wrap gap-2",
  popularItem: "border px-4 py-1 rounded-md font-medium cursor-pointer",
};
/* Styles End */

const Banner = () => {
  return (
    <div className="relative">
      {/* Bg Color Start */}
      <div
        style={{ backgroundImage: "radial-gradient(#FF9826, #E77B02)" }}
        className={`${styles.bgColor} bgColor`}
      />
      <div
        style={{ backgroundImage: "radial-gradient(circle,#C41BFF, #8C03BC)" }}
        className={`${styles.bgColor} bgColor2`}
      />
      <div
        style={{ backgroundImage: "radial-gradient(circle,#FF1B6D, #CD004A)" }}
        className={`${styles.bgColor} bgColor3`}
      />
      <NavBar color={"transparent"} />
      {/* Bg Color End */}
      <div className={styles.main}>
        {/* Bg Image Start */}
        <div
          style={{ backgroundImage: `url(${bannerBg1})` }}
          className={`${styles.bgImage} bgImage1`}
        />
        <div
          style={{ backgroundImage: `url(${bannerBg2})` }}
          className={`${styles.bgImage} bgImage2`}
        />
        <div
          style={{ backgroundImage: `url(${bannerBg3})` }}
          className={`${styles.bgImage} bgImage3`}
        />
        {/* Bg Image End */}

        <div className="lg:w-4/6 my-5">
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
