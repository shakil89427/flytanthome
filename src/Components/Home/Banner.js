import React from "react";
import { BsSearch } from "react-icons/bs";
import bannerBg from "../../Assets/bannerBg.png";

/* Styles Start */
const styles = {
  main: "bg-[#FF9826] px-6 md:px-20 py-5 lg:pb-0 md:flex items-center justify-between text-white",
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
  bg: "w-[45%] hidden lg:block",
};
/* Styles End */

const Banner = () => {
  return (
    <div className={styles.main}>
      <div>
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
      <img className={styles.bg} src={bannerBg} alt="" />
    </div>
  );
};

export default Banner;
