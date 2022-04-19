import React from "react";
import Scroll from "../Components/Scroll/Scroll";
import Banner from "../Components/Brands_Influencers/Banner";
import Title from "../Components/Brands_Influencers/Title";
import HeroLeft from "../Components/Brands_Influencers/HeroLeft";
import HeroRight from "../Components/Brands_Influencers/HeroRight";
import GalleryLeft from "../Components/Brands_Influencers/GalleryLeft";
import GalleryRight from "../Components/Brands_Influencers/GalleryRight";
import {
  bannerData,
  heroData,
  galleryData,
} from "../Assets/influencers/InfluencersData";

const Influencers = () => {
  return (
    <>
      <Scroll />
      <Banner data={bannerData} />
      <Title data={"Advantages For Influencers"} />
      {heroData.map((hero, i) =>
        i % 2 ? <HeroRight data={hero} /> : <HeroLeft data={hero} />
      )}
      {galleryData.map((gallery, i) =>
        i % 2 ? <GalleryRight data={gallery} /> : <GalleryLeft data={gallery} />
      )}
      <div className="py-28 my-32 bg-gray-300 text-center">
        <h1 className="text-3xl font-semibold">Want to Get Sponsored?</h1>
        <p className="my-5">Download the App and Get Sponsorships</p>
        <button className="bg-black text-white px-10 py-3 rounded-3xl">
          Download Now
        </button>
      </div>
    </>
  );
};

export default Influencers;
