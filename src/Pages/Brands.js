import React from "react";
import Banner from "../Components/Brands_Influencers/Banner";
import HeroLeft from "../Components/Brands_Influencers/HeroLeft";
import HeroRight from "../Components/Brands_Influencers/HeroRight";
import banner from "../Assets/brands/banner.png";
import hero1 from "../Assets/brands/hero1.png";
import hero2 from "../Assets/brands/hero2.png";
import hero3 from "../Assets/brands/hero3.png";
import hero4 from "../Assets/brands/hero4.png";
import hero5 from "../Assets/brands/hero5.png";

const Brands = () => {
  const bannerData = {
    img: banner,
    title: "For Brands",
    info: "Post your Campaign and Find the Most Felicitous Influencer For Your Brand. Download the App to Get Started",
  };
  const heroOneData = {
    img: hero1,
    title: "Transparency",
    info: "Unlike Agencies we do not overcharge. There is complete transparency in choosing influencers and how much you have to pay them. You can also connect with Influencers directly for your campaign.",
  };
  const heroTwoData = {
    img: hero2,
    title: "Engagement Rates",
    info: "View the Engagement rates of Influencers in all niches and Choose Influencers accordingly. Get quality influencers with high engagement rates for your campaigns.",
  };
  const heroThreeData = {
    img: hero3,
    title: "Social Score",
    info: "The influencers Social Score helps you to determine the quality they possess and how good an Influencer is in contrast to other Influencers.",
  };
  const heroFourData = {
    img: hero4,
    title: "Payment Rates",
    info: "Get Suggested Payment Rates For Influencers based on their Engagement and Social Score. This avoids overpayment and ensures Influencers producing Quality Content are paid.",
  };
  const heroFiveData = {
    img: hero5,
    title: "Search Engine",
    info: "You Can Find Influencers in specific categories or from specific places using our Social Search Engine. We make it hassle free for Brands to search Influencers for their Campaign.",
  };
  return (
    <div>
      <Banner data={bannerData} />
      <div className="relative">
        <h1 className="z-20 text-4xl font-bold mb-20 text-center w-fit mx-auto relative before:content[''] before:absolute before:w-28 before:h-[4px] before:bg-black before:-bottom-5 before:left-0 after:content[''] after:absolute after:w-4 after:h-[4px] after:bg-black after:-bottom-5 after:left-32">
          Advantages For Brands
        </h1>
        <div className="absolute w-[20%] h-80 bg-gray-300 top-0 left-0" />
      </div>
      <HeroLeft data={heroOneData} />
      <HeroRight data={heroTwoData} />
      <HeroLeft data={heroThreeData} />
      <HeroRight data={heroFourData} />
      <HeroLeft data={heroFiveData} />
    </div>
  );
};

export default Brands;
