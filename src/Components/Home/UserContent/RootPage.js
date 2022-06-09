import React, { useEffect } from "react";
import TopCarousel from "./Carousel/TopCarousel";
import FeaturedInfluencers from "./Creators/FeaturedInfluencers";
import Latest from "./Sponsorships/Latest";
import AdBanner from "./AdBanner/AdBanner";
import PopularInfluencers from "./Creators/PopularInfluencers";

const RootPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
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

export default RootPage;
