import React from "react";
import TopCarousel from "../Carousel/TopCarousel";
import FeaturedInfluencers from "../Creators/FeaturedInfluencers";
import Latest from "../Sponsorships/Latest";
import AdBanner from "../AdBanner/AdBanner";
import PopularInfluencers from "../Creators/PopularInfluencers";

const Main = () => {
  return (
    <div className="flex flex-col gap-14">
      <TopCarousel />
      <FeaturedInfluencers />
      <Latest />
      <AdBanner />
      <PopularInfluencers />
      <AdBanner />
    </div>
  );
};

export default Main;
