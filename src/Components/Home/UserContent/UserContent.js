import React from "react";

import Scroll from "../../Scroll/Scroll";
import NavBar from "../../NavBar/NavBar";
import Drawer from "./Drawer";
import TopCarousel from "./TopCarousel";
import Creators from "./Creators";
import AdBanner from "./AdBanner";
import Sponsorships from "./Sponsorships";
import Topics from "./Topics";

const UserContent = () => {
  return (
    <>
      <Scroll />
      <NavBar color={"white"} />
      <div className="grid grid-cols-12 r-box">
        <div className="col-span-2 lg:col-span-3 h-[90vh] lg:h-[88vh] overflow-y-scroll border-r py-5 lg:pr-5">
          <Drawer />
        </div>
        <div className="col-span-10 lg:col-span-6 py-5 pl-5 lg:pr-5 h-[90vh] lg:h-[88vh] overflow-y-scroll flex flex-col gap-14">
          <TopCarousel />
          <Creators type={"Trending"} />
          <Sponsorships />
          <AdBanner />
          <Creators type={"Top"} />
          <AdBanner />
        </div>
        <div className="col-span-3 py-5 pl-5 h-[90vh] lg:h-[88vh] overflow-y-scroll hidden lg:block">
          <Topics />
        </div>
      </div>
    </>
  );
};

export default UserContent;
