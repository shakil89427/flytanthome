import React from "react";
import Banner from "../PublicContent/Banner";
import FeaturedInfluencers from "./FeaturedInfluencers";
import AdBanner from "./AdBanner";
import PopularInfluencers from "./PopularInfluencers";
import Latest from "./Latest";
import Paid from "./Paid";
import Barter from "./Barter";
import Scroll from "../../Scroll/Scroll";

const UserContent = () => {
  return (
    <>
      <Scroll />
      <Banner />
      <FeaturedInfluencers />
      <AdBanner />
      <Latest />
      <Paid />
      <AdBanner />
      <Barter />
      <PopularInfluencers />
    </>
  );
};

export default UserContent;
