import React from "react";
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
import { useNavigate } from "react-router-dom";

const Influencers = () => {
  const navigate = useNavigate();

  return (
    <>
      <Banner data={bannerData} />
      <Title data={"Advantages For Influencers"} />
      {heroData.map((hero, i) =>
        i % 2 ? (
          <HeroRight key={i} data={hero} />
        ) : (
          <HeroLeft key={i} data={hero} />
        )
      )}
      {galleryData.map((gallery, i) =>
        i % 2 ? (
          <GalleryRight key={i} data={gallery} />
        ) : (
          <GalleryLeft key={i} data={gallery} />
        )
      )}
      <div className="py-24 my-32 bg-gray-100 text-center">
        <h1 className="text-3xl md:text-4xl font-medium">
          Want to Get Sponsored?
        </h1>
        <p className="mt-5 mb-8 md:text-xl">
          Download the App and Get Sponsorships
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-10 py-3 rounded-3xl hover:scale-105 duration-150 hover:font-semibold shadow-xl"
        >
          Download Now
        </button>
      </div>
    </>
  );
};

export default Influencers;
