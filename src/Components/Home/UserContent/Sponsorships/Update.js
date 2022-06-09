import React from "react";
import updateBg from "../../../../Assets/userHome/updateBg.png";

const Update = () => {
  const getUpdate = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    console.log(email);
  };
  return (
    <div className="p-10 border-2 rounded-xl flex items-center gap-10">
      <div className="w-full xl:w-5/6">
        <div className="">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold">
            Get Sponsorships update on your mail directly
          </p>
          <p className="text-gray-500 text-sm md:text-md lg:text-lg mt-2 font-medium">
            Easy and fast way to get updates on your mail
          </p>
        </div>
        <form onSubmit={getUpdate}>
          <input
            className="w-full md:w-[90%] lg:w-[80%] bg-[#ECECEC] px-3 py-4 my-8"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <br />
          <button
            type="submit"
            className="bg-black text-white px-7 py-4 rounded-full"
          >
            Get Updates
          </button>
        </form>
      </div>
      <div className="hidden xl:block w-1/6">
        <img src={updateBg} alt="" />
      </div>
    </div>
  );
};

export default Update;
