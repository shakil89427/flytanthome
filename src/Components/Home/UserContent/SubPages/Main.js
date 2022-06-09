import React from "react";
import TopCarousel from "../Carousel/TopCarousel";
import TrendingCreator from "../Creators/TrendingCreator";
import Latest from "../Sponsorships/Latest";
import AdBanner from "../AdBanner/AdBanner";
import PopularInfluencers from "../Sponsorships/PopularInfluencers";

const Main = () => {
  return (
    <div className="flex flex-col gap-14">
      <TopCarousel />
      <TrendingCreator />
      <Latest />
      <AdBanner />
      <PopularInfluencers />
      <AdBanner />
    </div>
  );
};

export default Main;
