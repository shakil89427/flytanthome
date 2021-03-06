import React, { useRef } from "react";
import FeaturedInfluencers from "./Creators/FeaturedInfluencers";
import Latest from "./Sponsorships/Latest";
import AdBanner from "./AdBanner/AdBanner";
import PopularInfluencers from "./Creators/PopularInfluencers";
import { useEffect } from "react";
import Videos from "./Youtube/Videos";
import Banner from "./Banner/Banner";
import Stories from "./Stories/Stories";
import News from "./News/News";

const RootPage = () => {
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollIntoView();
    window.scroll(0, 0);
  }, []);
  return (
    <div ref={divRef} className="pt-5 pb-14">
      <div className="flex flex-col gap-20">
        <Banner />
        <FeaturedInfluencers />
        <PopularInfluencers />
        <AdBanner />
        <Latest />
        <Stories />
        <News />
        <Videos />
      </div>
    </div>
  );
};

export default RootPage;
