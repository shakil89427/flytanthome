import React, { useRef, useEffect, useState } from "react";
import bigBg from "../../Assets/socialCards/bigBg.png";
import smallBg from "../../Assets/socialCards/smallBg.png";
import { useNavigate } from "react-router-dom";
import card1 from "../../Assets/socialCards/impression/card1.png";
import card2 from "../../Assets/socialCards/impression/card2.png";
import card3 from "../../Assets/socialCards/impression/card3.png";

const Impression = () => {
  const navigate = useNavigate();
  const imgRef = useRef();
  // const images = [card1, card2, card3];
  // const [index, setIndex] = useState(0);

  // const animation = () => {
  //   imgRef.current.className = "scale-0 duration-1000";
  //   setTimeout(() => {
  //     imgRef.current.src = card2;
  //     imgRef.current.className = "scale-100 duration-1000";
  //   }, 1000);
  // };

  // useEffect(() => {
  //   animation();
  // }, []);
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="min-h-screen flex items-center justify-center mb-14"
    >
      <div className="r-box text-white flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
        <div
          onClick={() => navigate("/products")}
          style={{
            backgroundImage: `url(${smallBg})`,
          }}
          className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12"
        >
          <p
            style={{ lineHeight: "120%" }}
            className="text-4xl lg:text-5xl font-semibold"
          >
            Instant Impression
          </p>
          <p className="text-md lg:text-2xl pr-5 mt-8 mb-10 font-light">
            The High Quality Flytant Social Card has an Immaculate Look and
            Feel. Leave an Instant impression and exchange contacts with your
            Social Card.
          </p>
          <p className="w-fit border py-3 px-10 md:px-14 rounded-3xl text-xl bg-black hover:bg-white hover:text-black duration-150 font-medium">
            BUY NOW
          </p>
        </div>
        <div
          style={{ backgroundImage: `url(${bigBg})` }}
          className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center"
        >
          <img ref={imgRef} src={card1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Impression;
