import React, { useState } from "react";
import bigBg from "../../Assets/socialCards/bigBg.png";
import smallBg from "../../Assets/socialCards/smallBg.png";
import card1 from "../../Assets/socialCards/customize/card1.png";
import card2 from "../../Assets/socialCards/customize/card2.png";
import card3 from "../../Assets/socialCards/customize/card3.png";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../../Hooks/useAnalytics";

const Customize = () => {
  const [text, setText] = useState("");
  const images = [card1, card2, card3];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  return (
    <div className="min-h-screen flex items-center justify-center mb-24 md:mb-0 socialcardbg">
      <div className="r-box text-white flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-10">
        <div
          style={{ backgroundImage: `url(${bigBg})` }}
          className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center gap-10 bg-black"
        >
          <div className="w-full grid grid-cols-3 gap-x-5 gap-y-10">
            <div className="col-span-3 relative overflow-hidden ">
              <img src={selectedImage} alt="" className="w-full" />
              <p className="absolute right-3 bottom-3 xl:right-7 xl:bottom-7 xl:text-lg font-semibold  text-white px-3">
                {text?.length > 0 ? text?.toUpperCase() : "Your Name Here"}
              </p>
            </div>
            {images.map((item, index) => (
              <div
                onClick={() => {
                  addLog("blob_change");
                  setSelectedImage(item);
                }}
                key={index}
                className={`bg-[#323232] cursor-pointer rounded-lg p-3 ${
                  selectedImage === item
                    ? "border border-neutral-300"
                    : "border-0"
                }`}
              >
                <img src={item} alt="" className="w-full" />
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${smallBg})`,
          }}
          className="border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12 bg-black"
        >
          <p
            style={{ lineHeight: "120%" }}
            className="text-4xl lg:text-5xl font-semibold"
          >
            Customizable <br /> Social Card
          </p>
          <p className="text-md mt-8 font-light">Give a try</p>
          <input
            placeholder="Enter your name"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="border-0 outline-none w-[80%] mt-2 mb-10 p-2 bg-[#3D3D3D] rounded-md"
          />
          <p
            onClick={() => {
              addLog("get_your_card");
              navigate("/products");
            }}
            className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium cursor-pointer"
          >
            GET YOUR CARD
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customize;
