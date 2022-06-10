import React from "react";
import TopCarousel from "./Carousel/TopCarousel";
import FeaturedInfluencers from "./Creators/FeaturedInfluencers";
import Latest from "./Sponsorships/Latest";
import AdBanner from "./AdBanner/AdBanner";
import PopularInfluencers from "./Creators/PopularInfluencers";
import Scroll from "../../Scroll/Scroll";

const RootPage = () => {
  return (
    <div className="flex flex-col gap-20">
      <Scroll />
      <TopCarousel />
      <FeaturedInfluencers />
      <Latest />
      <AdBanner />
      <PopularInfluencers />
      <AdBanner />
    </div>
  );
};

export default RootPage;
