import React, { useEffect } from "react";
import ContactBar from "../Components/ContactBar/ContactBar";

const Ads = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="max-w-[1050px] mx-auto px-5 my-32">
        <h1 className="text-3xl font-semibold">Flytant Ads</h1>
        <h4 className="text-xl md:text-2xl mb-14 mt-5 pr-5 text-gray-800">
          We want to show you ads that are meaningful and you find them
          interesting and useful. Here’s an overview of how Flytant Ads work.
        </h4>
        <h4 className="text-xl md:text-2xl font-medium  text-gray-800 mt-32 mb-14">
          What are Flytant Ads?
        </h4>
        <div style={{ lineHeight: "200%" }} className="ml-10 mt-14 lg:text-xl">
          <li>
            You may see various kinds of ads on Flytant, including Sponsored
            Ads, Promoted Ads and Promoted Posts. We can show these ads to you
            when you are logged in or logged out of Flytant. They are clearly
            marked with a “Sponsored” icon. You can interact with most promoted
            content in much the same way as organic content.
          </li>
        </div>
        <h4 className="text-xl md:text-2xl font-medium  text-gray-800 mt-32 mb-14">
          Why you see certain Ads?
        </h4>
        <div
          style={{ lineHeight: "200%" }}
          className="ml-10 mt-14 flex flex-col gap-10 lg:text-xl"
        >
          <li>
            Your activity on Flytant, the information you provide to Flytant,
            and our relationships with ad partners all help to make the
            sponsored content more relevant for you.
          </li>
          <li>
            When you use Flytant to follow, Like, search, view, or interact with
            posts or Flytant accounts, we may use these actions to customise
            Flytant Ads for you. Have more fun with For example, if you search
            for a specific term, we may show you promoted content related to
            that topic. We also might customize ads using other information
            about you, such as your profile information; your mobile device
            location (if location features are turned on); your IP address; or
            the apps installed on your device. This helps us show you local ads
            and other ads that you might prefer.
          </li>
          <li>
            Flytant may also personalise ads based on information that Flytant
            and our affiliates collect and that our ad partners share with us,
            such as a hashed email address, a mobile device identifier, or
            browser-related information (a browser cookie ID).
          </li>
          <li>
            This helps Flytant display ads about things you’ve already shown
            interest in from brands and businesses that you may like.. You could
            also see this business as a Promoted Account in one of your “Who to
            Follow” suggestions.
          </li>
        </div>
      </div>
      <ContactBar />
    </>
  );
};

export default Ads;
