import React, { useRef } from "react";
import TopCarousel from "./Carousel/TopCarousel";
import FeaturedInfluencers from "./Creators/FeaturedInfluencers";
import Latest from "./Sponsorships/Latest";
import AdBanner from "./AdBanner/AdBanner";
import PopularInfluencers from "./Creators/PopularInfluencers";
import { useEffect } from "react";

const RootPage = () => {
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollIntoView();
  }, []);
  return (
    <div ref={divRef} className="py-5">
      <div className="flex flex-col gap-20">
        <TopCarousel />
        <FeaturedInfluencers />
        <Latest />
        <AdBanner />
        <PopularInfluencers />
        <AdBanner />
      </div>
    </div>
  );
};

export default RootPage;
