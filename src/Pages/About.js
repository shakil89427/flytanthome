import React from "react";
import img1 from "../Assets/about/img1.png";
import img2 from "../Assets/about/img2.png";
import img3 from "../Assets/about/img3.png";
import img4 from "../Assets/about/img4.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <div className="max-w-[1240px] mx-auto px-5 my-40">
        <h1 className="text-4xl font-semibold">About</h1>
        <h4 className="text-xl md:text-3xl my-10 md:my-14 pr-5">
          Fastest Growing Platform Connecting Brands and Influencers
        </h4>
        <p style={{ lineHeight: "200%" }} className="md:text-xl pr-5">
          Flytant is your Go-To Platform for Influencer Marketing. As a Brand we
          make it extremely easy and cost effective to onboard Influencers.
          Similarly we ensure that Influencers can connect with brands directly
          and no mediation is required.
        </p>
        <div className="md:flex md:gap-14 md:items-center md:justify-center my-20">
          <div className="w-full">
            <img className="w-full mb-20 " src={img1} alt="" />
          </div>
          <div className="w-full hidden md:block">
            <img className="mt-20 w-full" src={img2} alt="" />
          </div>
        </div>
        <h4 className="text-xl md:text-3xl my-14 pr-5">
          Tailor-Made Platform for Brands
        </h4>
        <p style={{ lineHeight: "200%" }} className="text-md md:text-xl pr-5">
          We provide brands a complete Transparent way to post campaigns and
          Connect with Influencers directly. Our app consists of some amazing
          features like Social Score, Social Search Engine, Social Profile and
          many more that ensures hassle free methods to onboard influencers and
          promote your Products to reach a global Audience.
        </p>
        <div className="md:flex md:gap-14 md:items-center md:justify-center my-20">
          <div className="w-full">
            <img className="w-full mb-20 " src={img3} alt="" />
          </div>
          <div className="w-full hidden md:block">
            <img className="mt-20 w-full" src={img4} alt="" />
          </div>
        </div>
        <h4 className="text-xl md:text-3xl my-14 pr-5">
          Best Brand-Deals For Influencers
        </h4>
        <p style={{ lineHeight: "200%" }} className="text-md md:text-xl pr-5">
          We ensure even micro influencers can monetise their social media
          content. As an influencer it's so easy to connect with Brands. All you
          have to do is Download the App and Apply for Campaigns or Directly
          message the Brands for Sponsorships.
        </p>
      </div>
      <div className="py-24 my-32 bg-gray-100 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Get Onboard!</h1>
        <p className="mt-5 mb-8 md:text-xl">
          Fastest Growing Influencers Community
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-10 py-3 rounded-3xl hover:scale-105 duration-150 hover:font-semibold shadow-xl"
        >
          Download Now
        </button>
      </div>
      <div className="max-w-[1150px] mx-auto px-5 my-24">
        <h4 className="text-xl md:text-3xl mt-14 mb-8 pr-5">Parental Touch</h4>
        <p style={{ lineHeight: "200%" }} className="text-md md:text-xl pr-5">
          Flytant is a subsidiary of Flytant Developers Pvt. Ltd.
        </p>
      </div>
    </div>
  );
};

export default About;
