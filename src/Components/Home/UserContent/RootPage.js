import React, { useRef } from "react";
import FeaturedInfluencers from "./Creators/FeaturedInfluencers";
import Latest from "./Sponsorships/Latest";
import AdBanner from "./AdBanner/AdBanner";
import PopularInfluencers from "./Creators/PopularInfluencers";
import { useEffect } from "react";
import Root from "./Youtube/Root";

const RootPage = () => {
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollIntoView();
  }, []);
  return (
    <div ref={divRef} className="pt-5 pb-14">
      <div className="flex flex-col gap-20">
        <AdBanner />
        <FeaturedInfluencers />
        <Latest />
        <AdBanner />
        <PopularInfluencers />
        <Root />
        <AdBanner />
      </div>
    </div>
  );
};

export default RootPage;
