import React from "react";
import Banner from "./Banner";
import FeaturedInfluencers from "./FeaturedInfluencers";
import AdBanner from "./AdBanner";
import Sponsorships from "./Sponsorships";
import PopularInfluencers from "./PopularInfluencers";

import FeaturedData from "../../../BluePrint/FeaturedData";
import sponsorshipsData from "../../../BluePrint/SponsorshipsData";

const UserContent = () => {
  return (
    <>
      <Banner />
      <FeaturedInfluencers featured={FeaturedData} />
      <AdBanner />
      <Sponsorships sponsorships={sponsorshipsData} type={"Latest"} />
      <Sponsorships sponsorships={sponsorshipsData} type={"Paid"} />
      <AdBanner />
      <Sponsorships sponsorships={sponsorshipsData} type={"Barter"} />
      <PopularInfluencers />
    </>
  );
};

export default UserContent;
