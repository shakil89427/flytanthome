import React from "react";
import AdBanner from "../Components/AdBanner";
import Banner from "../Components/Banner";
import FeaturedInfluencers from "../Components/FeaturedInfluencers";
import PopularInfluencers from "../Components/PopularInfluencers";
import Sponsorships from "../Components/Sponsorships";

import FeaturedData from "../BluePrint/FeaturedData";
import sponsorshipsData from "../BluePrint/SponsorshipsData";

const Home = () => {
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

export default Home;
