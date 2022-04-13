import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { BsSearch } from "react-icons/bs";
import bannerBg1 from "../../Assets/bannerBg1.png";
import bannerBg2 from "../../Assets/bannerBg2.png";
import bannerBg3 from "../../Assets/bannerBg3.png";

/* Styles Start */
const styles = {
  main: "flex items-center text-white min-h-[75vh] relative px-6 md:px-20 lg:px-24",
  bgImage:
    "absolute inset-0 mr-10 bg-no-repeat bg-contain bg-right-bottom hidden lg:block z-0 duration-1000",
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
  const bannerImages = [
    {
      bgColor: "radial-gradient(#FF9826, #E77B02)",
      image: bannerBg1,
    },
    {
      bgColor: "radial-gradient(#C41BFF, #8C03BC)",
      image: bannerBg2,
    },
    {
      bgColor: "radial-gradient(#FF1B6D, #CD004A)",
      image: bannerBg3,
    },
  ];
  const [banner, setBanner] = useState(bannerImages[2]);

  useEffect(() => {
    let temp = 0;
    const bannerChange = setInterval(() => {
      if (temp === bannerImages.length) {
        setBanner(bannerImages[0]);
        temp = 0;
      } else {
        setBanner(bannerImages[temp]);
        temp = temp + 1;
      }
    }, 5000);

    return () => clearInterval(bannerChange);
  }, []);

  return (
    <div style={{ backgroundImage: banner.bgColor }}>
      <NavBar color={"transparent"} />
      <div className={styles.main}>
        <div
          style={{ backgroundImage: `url(${banner.image})` }}
          className={styles.bgImage}
        ></div>
        <div className="lg:w-4/6 z-10 ">
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
