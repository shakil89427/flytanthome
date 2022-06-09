import React, { useEffect } from "react";
import AddBanner from "./AdBanner/AdBanner";
import TopCarousel from "./Carousel/TopCarousel";
import Latest from "./Sponsorships/Latest";
import Paid from "./Sponsorships/Paid";
import Barter from "./Sponsorships/Barter";

const AllSponsorships = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="flex flex-col gap-14">
      <TopCarousel />
      <Latest />
      <AddBanner />
      <Paid />
      <Barter />
    </div>
  );
};

export default AllSponsorships;
