import React from "react";
import Banner from "./Banner";
import FeaturedInfluencers from "./FeaturedInfluencers";
import AdBanner from "./AdBanner";
import Sponsorships from "./Sponsorships";
import PopularInfluencers from "./PopularInfluencers";
import useStore from "../../../Store/useStore";

const UserContent = () => {
  const {
    featuredInfluencers,
    popularInfluencers,
    laitestSponsorships,
    paidSponsorships,
    barterSponsorships,
  } = useStore();

  return (
    <>
      <Banner />
      <FeaturedInfluencers featured={featuredInfluencers} />
      <AdBanner />
      <Sponsorships sponsorships={laitestSponsorships} type={"Latest"} />
      <Sponsorships sponsorships={paidSponsorships} type={"Paid"} />
      <AdBanner />
      <Sponsorships sponsorships={barterSponsorships} type={"Barter"} />
      <PopularInfluencers popular={popularInfluencers} />
    </>
  );
};

export default UserContent;
