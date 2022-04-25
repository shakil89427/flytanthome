import React from "react";
import Banner from "./Banner";
import FeaturedInfluencers from "./FeaturedInfluencers";
import AdBanner from "./AdBanner";
import PopularInfluencers from "./PopularInfluencers";
import Latest from "./Latest";
import Paid from "./Paid";
import Barter from "./Barter";

const UserContent = () => {
  return (
    <>
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
