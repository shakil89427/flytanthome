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
    </>
  );
};

export default Brands;
