import React from "react";
import Banner from "../Components/Brands_Influencers/Banner";
import HeroLeft from "../Components/Brands_Influencers/HeroLeft";
import HeroRight from "../Components/Brands_Influencers/HeroRight";
import banner from "../Assets/influencers/banner.png";
import hero1 from "../Assets/influencers/hero1.png";
import hero2 from "../Assets/influencers/hero2.png";
import hero3 from "../Assets/influencers/hero3.png";
import hero4 from "../Assets/influencers/hero4.png";
import hero5 from "../Assets/influencers/hero5.png";

const Influencers = () => {
  const bannerData = {
    img: banner,
    title: "For Influencers",
    info: "Get Sponsorships From Brands and Monetise Your Social Media Content",
  };
  const heroOneData = {
    img: hero1,
    title: "Directly Monetise",
    info: "Our platform helps you Connect with the Brands directly. You can Download the App and Message the Brands for Sponsorships.",
  };
  const heroTwoData = {
    img: hero2,
    title: "Social Score",
    info: "The Quality of Your Content and how good is your Engagement is determined using Social Score. Higher the Social Score higher is your Quality as an Influencer.",
  };
  const heroThreeData = {
    img: hero3,
    title: "NO Spam",
    info: "Get Only Real Messages from Brands and No Spam in your inbox. We ensure quality brands connect you for Sponsorships.",
  };
  const heroFourData = {
    img: hero4,
    title: "Passive Income",
    info: "Get Suggested Payment Rates For Influencers based on their Engagement and Social Score. This avoids overpayment and ensures Influencers producing Quality Content are paid.",
  };
  const heroFiveData = {
    img: hero5,
    title: "Connect with Brands",
    info: "You Can Find Influencers in specific categories or from specific places using our Social Search Engine. We make it hassle free for Brands to search Influencers for their Campaign.",
  };
  return (
    <div>
      <Banner data={bannerData} />
      <div className="relative">
        <h1 className="z-20 text-4xl font-bold mb-20 text-center w-fit mx-auto relative before:content[''] before:absolute before:w-28 before:h-[4px] before:bg-black before:-bottom-5 before:left-0 after:content[''] after:absolute after:w-4 after:h-[4px] after:bg-black after:-bottom-5 after:left-32">
          Advantages For Influencers
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

export default Influencers;
