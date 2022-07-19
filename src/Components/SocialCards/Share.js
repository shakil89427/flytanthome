import React from "react";

const Share = () => {
  return (
    <div className="r-box text-white py-20 flex flex-col md:flex-row items-center gap-20">
      <div className="border w-full md:w-1/2 bg-white rounded-lg overflow-hidden">
        <video
          controls
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(45deg, black ,#3a3a3a9d , #4d4d4d9d)",
        }}
        className="w-full md:w-1/2 border  rounded-lg p-10"
      >
        <p
          style={{ lineHeight: "120%" }}
          className="text-3xl lg:text-4xl font-semibold"
        >
          One Tap Sharing
        </p>
        <p className="text-md lg:text-2xl my-8 font-light pr-5 lg:pr-14">
          Not Anymore Connect Your Other Bank Accounts to Fi And See All Your
          Balances And Transactions On Fi
        </p>
        <p className="border-2 w-fit px-8 py-2 rounded-full">Share Profile</p>
      </div>
    </div>
  );
};

export default Share;
