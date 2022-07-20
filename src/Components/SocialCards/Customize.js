import React, { useState } from "react";
import bigBg from "../../Assets/socialCards/bigBg.png";
import smallBg from "../../Assets/socialCards/smallBg.png";
import card1 from "../../Assets/socialCards/customize/card1.png";
import card2 from "../../Assets/socialCards/customize/card2.png";
import card3 from "../../Assets/socialCards/customize/card3.png";
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const [text, setText] = useState("");
  const images = [card1, card2, card3];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="py-5 md:py-7 lg:py-14"
    >
      <div className="r-box text-white flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
        <div
          style={{ backgroundImage: `url(${bigBg})` }}
          className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center gap-10"
        >
          <div className="w-full grid grid-cols-4 gap-x-5 gap-y-10">
            <div className="col-span-4 relative overflow-hidden ">
              <img src={selectedImage} alt="" className="w-full" />
              <p className="absolute right-7 bottom-7 text-lg font-bold  text-white px-3">
                {text?.length > 0 ? text : "Your Name Here"}
              </p>
            </div>
            {images.map((item, index) => (
              <div
                onClick={() => setSelectedImage(item)}
                key={index}
                style={{ backgroundImage: `url(${item})` }}
                className={`aspect-square bg-contain bg-center bg-no-repeat bg-[#323232] cursor-pointer rounded-lg ${
                  selectedImage === item
                    ? "border border-neutral-300"
                    : "border-0"
                }`}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${smallBg})`,
          }}
          className="border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 xl:p-14 rounded-xl w-full md:w-1/2 lg:w-5/12"
        >
          <p
            style={{ lineHeight: "140%" }}
            className="text-3xl lg:text-4xl font-semibold"
          >
            Customizable <br /> Social Card
          </p>
          <p className="text-md lg:text-xl mt-4 font-medium text-[#BEBEBE]">
            Give A Try
          </p>
          <input
            placeholder="Enter your name"
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            type="text"
            className="border-0 outline-none w-[80%] mt-2 mb-6 p-2 bg-[#3D3D3D] rounded-md"
          />
          <p
            onClick={() => navigate("/products")}
            className="border-2 font-bold w-fit px-8 py-3 rounded-full cursor-pointer select-none hover:bg-white hover:text-black duration-150"
          >
            GET YOUR CARD
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customize;
