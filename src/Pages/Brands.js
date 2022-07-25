import React from "react";
import Banner from "../Components/Brands_Influencers/Banner";
import Title from "../Components/Brands_Influencers/Title";
import HeroLeft from "../Components/Brands_Influencers/HeroLeft";
import HeroRight from "../Components/Brands_Influencers/HeroRight";
import GalleryLeft from "../Components/Brands_Influencers/GalleryLeft";
import GalleryRight from "../Components/Brands_Influencers/GalleryRight";
import { bannerData, heroData, galleryData } from "../Assets/brands/BrandsData";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../Hooks/useAnalytics";

const Brands = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  return (
    <>
      <Banner data={bannerData} />
      <Title data={"Advantages For Brands"} />
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
      <div className="flex flex-col gap-10 my-32 text-center">
        <div className="py-24 bg-gray-100">
          <h1 className="text-3xl md:text-4xl font-medium">
            Sounds Interesting
          </h1>
          <p className="mt-5 mb-8  md:text-xl">
            Download the App and Post Your Campaign Free
          </p>
          <button
            onClick={() => {
              addLog("download_now");
              navigate("/");
            }}
            className="bg-black text-white px-10 py-3 rounded-3xl hover:scale-105 duration-150 hover:font-semibold shadow-xl"
          >
            Download Now
          </button>
        </div>
        <p>or</p>
        <div className="py-24 bg-gray-100 ">
          <h1 className="text-3xl md:text-4xl font-medium">Request a Demo</h1>
          <p className="mt-5 mb-8  md:text-xl">
            Schedule a Meet With us before Getting Onboard
          </p>
          <a
            onClick={() => addLog("schedule_meet")}
            rel="noreferrer"
            href="https://calendly.com/flytant"
            target="_blank"
          >
            <button className="bg-black text-white px-10 py-3 rounded-3xl hover:scale-105 duration-150 hover:font-semibold shadow-xl">
              Schedule Meet
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Brands;
