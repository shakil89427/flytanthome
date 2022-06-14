import React, { useEffect, useRef } from "react";
import AddBanner from "./AdBanner/AdBanner";
import Latest from "./Sponsorships/Latest";
import Paid from "./Sponsorships/Paid";
import Barter from "./Sponsorships/Barter";
import Update from "./Sponsorships/Update";
import CreatedByMe from "./Sponsorships/CreatedByMe";
import MostApplied from "./Sponsorships/MostApplied";

const AllSponsorships = () => {
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollIntoView();
  }, []);
  return (
    <div ref={divRef} className="pt-5 pb-14">
      <div className="flex flex-col gap-20">
        <CreatedByMe />
        <Latest />
        <AddBanner />
        <Paid />
        <Barter />
        <MostApplied />
        <Update />
      </div>
    </div>
  );
};

export default AllSponsorships;
