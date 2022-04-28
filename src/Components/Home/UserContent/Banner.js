import React from "react";
import bannerBg from "../../../Assets/userHome/bannerBg2.png";
import NavBar from "../../NavBar/NavBar";
import { BsSearch } from "react-icons/bs";

/* Styles Start */
const styles = {
  main: "flex items-center text-white lg:min-h-[75vh] relative py-10 r-box",
  bgImage:
    "absolute inset-0 bg-no-repeat bg-contain bg-right-bottom hidden lg:block z-10 bgImage",
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
      <NavBar color={"transparent"} />
      <div className={styles.main}>
        <div
          style={{ backgroundImage: `url(${bannerBg})` }}
          className={styles.bgImage}
        />
        <div className="lg:w-4/6 z-20 my-10">
          <h1 style={{ lineHeight: "110%" }} className={styles.heading}>
            Find <span className="font-bold">Influencers</span>
          </h1>
          <h1 style={{ lineHeight: "110%" }} className={styles.heading}>
            & <span className="font-bold">Brands</span> for collaboration
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
            <p className={styles.popularItem}>Top influencers</p>
            <p className={styles.popularItem}>Fashion bloggers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
