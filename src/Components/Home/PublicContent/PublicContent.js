import React from "react";
import Banner from "./Banner";
import BrandsHero from "./BrandsHero";
import InfluencersHero from "./InfluencersHero";
import OnboardHero from "./OnboardHero";

const PublicContent = () => {
  return (
    <div>
      <Banner />
      <InfluencersHero />
      <BrandsHero />
      <OnboardHero />
    </div>
  );
};

export default PublicContent;
