import React from "react";
import Banner from "../Components/SocialCards/Banner";
import Nav from "../Components/SocialCards/Nav";
import Share from "../Components/SocialCards/Share";

const SocialCards = () => {
  return (
    <div className="bg-black w-screen min-h-screen">
      <Nav />
      <Banner />
      <Share />
    </div>
  );
};

export default SocialCards;
