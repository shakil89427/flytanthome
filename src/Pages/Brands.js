import React from "react";
import Banner from "../Components/Brands_Influencers/Banner";
import Title from "../Components/Brands_Influencers/Title";
import HeroLeft from "../Components/Brands_Influencers/HeroLeft";
import HeroRight from "../Components/Brands_Influencers/HeroRight";
import GalleryLeft from "../Components/Brands_Influencers/GalleryLeft";
import GalleryRight from "../Components/Brands_Influencers/GalleryRight";
import { bannerData, heroData, galleryData } from "../Assets/brands/BrandsData";

const Brands = () => {
  return (
    <>
      <Banner data={bannerData} />
      <Title data={"Advantages For Brands"} />
      {heroData.map((hero, i) =>
        i % 2 ? <HeroRight data={hero} /> : <HeroLeft data={hero} />
      )}
      {galleryData.map((gallery, i) =>
        i % 2 ? <GalleryRight data={gallery} /> : <GalleryLeft data={gallery} />
      )}
      <div className="flex flex-col gap-10 my-32 text-center">
        <div className="py-28 bg-gray-300">
          <h1 className="text-3xl font-semibold">Sounds Interesting</h1>
          <p className="my-5">Download the App andPost Your Campaign Free</p>
          <button className="bg-black text-white px-10 py-3 rounded-3xl">
            Download Now
          </button>
        </div>
        <p>or</p>
        <div className="py-28 bg-gray-300 ">
          <h1 className="text-3xl font-semibold">Request a Demo</h1>
          <p className="my-5">Schedule a Meet With us before Getting Onboard</p>
          <button className="bg-black text-white px-10 py-3 rounded-3xl">
            Schedule Meet
          </button>
        </div>
      </div>
    </>
  );
};

export default Brands;
