import React, { useState } from "react";
import bigBg from "../../Assets/socialCards/bigBg.png";
import smallBg from "../../Assets/socialCards/smallBg.png";
import card1 from "../../Assets/socialCards/customize/card1.png";
import card2 from "../../Assets/socialCards/customize/card2.png";
import card3 from "../../Assets/socialCards/customize/card3.png";
import card4 from "../../Assets/socialCards/customize/card4.png";
import card5 from "../../Assets/socialCards/customize/card5.png";

const Customize = () => {
  const [text, setText] = useState("");
  const images = [card1, card2, card3, card4, card5];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <div className="r-box text-white pt-10 md:pt-14 lg:pt-28 flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
      <div
        style={{ backgroundImage: `url(${bigBg})` }}
        className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex flex-col items-start justify-between gap-10"
      >
        <div className="w-full aspect-[16/10] relative">
          <img src={selectedImage} alt="" className="h-full" />
          <p className="absolute right-7 bottom-7 text-lg font-bold bg-white text-black px-3">
            {text?.length > 0 ? text : "Your Name Here"}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5 w-full ">
          {images.map(
            (item, index) =>
              item !== selectedImage && (
                <div
                  onClick={() => setSelectedImage(item)}
                  key={index}
                  style={{ backgroundImage: `url(${item})` }}
                  className="aspect-square bg-contain bg-center bg-no-repeat bg-[#323232] cursor-pointer"
                />
              )
          )}
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${smallBg})`,
        }}
        className="border border-[#4d4d4d9d] bg-cover bg-center bg-no-repeat p-7 xl:p-14 rounded-xl w-full md:w-1/2 lg:w-5/12"
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
          value={text}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          type="text"
          className="border-0 outline-none w-[80%] mt-2 mb-6 p-2 bg-[#3D3D3D] rounded-md"
        />
        <p className="border-2 w-fit px-8 py-2 rounded-full">
          Customize Profile
        </p>
      </div>
    </div>
  );
};

export default Customize;
