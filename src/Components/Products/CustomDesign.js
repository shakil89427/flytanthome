import React from "react";
import { useState } from "react";
import card from "../../Assets/card.png";
import useStore from "../../Store/useStore";

const CustomDesign = ({ setShowCustom }) => {
  const { customText, setCustomText } = useStore();
  const [text, setText] = useState(customText);
  return (
    <>
      <div
        onClick={() => setShowCustom(false)}
        className="fixed h-screen w-screen z-20 top-0 left-0 bg-[#7e7d7d60]"
      />
      <div className="w-[95%] max-w-[500px] p-3 md:p-5 lg:p-8 xl:p-12 bg-white rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="w-[90%] mx-auto relative overflow-hidden">
          <img src={card} alt="" />
          <p className="text-white absolute bottom-3  right-5 lg:right-6 font-semibold">
            {text.toUpperCase() || "YOUR NAME WILL HERE"}
          </p>
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your name here"
          type="text"
          className="bg-[#E6E6E6] border-0 outline-none w-full p-3 my-5 lg:my-10 rounded-lg"
        />
        <button
          onClick={() => {
            setCustomText(text);
            setShowCustom(false);
          }}
          className="w-full bg-black text-white p-3 text-lg font-medium rounded-lg"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default CustomDesign;
