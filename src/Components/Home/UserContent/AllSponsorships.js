import React from "react";
import AddBanner from "./AdBanner/AdBanner";
import TopCarousel from "./Carousel/TopCarousel";
import Latest from "./Sponsorships/Latest";
import Paid from "./Sponsorships/Paid";
import Barter from "./Sponsorships/Barter";
import Update from "./Sponsorships/Update";
import Scroll from "../../Scroll/Scroll";

const AllSponsorships = () => {
  return (
    <div className="flex flex-col gap-20">
      <Scroll />
      <TopCarousel />
      <Latest />
      <AddBanner />
      <Paid />
      <Barter />
      <Update />
    </div>
  );
};

export default AllSponsorships;
