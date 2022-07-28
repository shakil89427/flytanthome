import React from "react";
import Analytics from "../Components/SocialCards/Analytics";
import Banner from "../Components/SocialCards/Banner";
import Customize from "../Components/SocialCards/Customize";
import Followers from "../Components/SocialCards/Followers";
import How from "../Components/SocialCards/How";
import Impression from "../Components/SocialCards/Impression";
import Premium from "../Components/SocialCards/Premium";
import Share from "../Components/SocialCards/Share";

const SocialCards = () => {
  return (
    <div className="bg-black">
      <Banner />
      <Share />
      <Impression />
      <Customize />
      <Followers />
      <Analytics />
      <How />
      <Premium />
    </div>
  );
};

export default SocialCards;
