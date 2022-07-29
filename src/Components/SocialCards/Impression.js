import React, { useEffect } from "react";
import bigBg from "../../Assets/socialCards/bigBg.png";
import smallBg from "../../Assets/socialCards/smallBg.png";
import { useNavigate } from "react-router-dom";
import card1 from "../../Assets/socialCards/impression/card1.png";
import card2 from "../../Assets/socialCards/impression/card2.png";
import card3 from "../../Assets/socialCards/impression/card3.png";
import { useRef } from "react";
import useAnalytics from "../../Hooks/useAnalytics";

const Impression = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  const imgRef = useRef();

  useEffect(() => {
    let active = card1;
    const startAnimation = setInterval(() => {
      imgRef.current.className = "duration-1000 scale-0 opacity-0";
      setTimeout(() => {
        if (active === card1) {
          active = card2;
          imgRef.current.src = card2;
        } else if (active === card2) {
          active = card3;
          imgRef.current.src = card3;
        } else {
          active = card1;
          imgRef.current.src = card1;
        }
        imgRef.current.className = "duration-1000 scale-100 opacity-1";
      }, 1000);
    }, 3000);

    return () => clearInterval(startAnimation);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center mb-24 md:mb-0 socialcardbg">
      <div className="r-box text-white flex flex-col items-start md:flex-row md:items-center md:justify-between gap-10">
        <div
          onClick={() => {
            addLog("buy_now");
            navigate("/products");
          }}
          style={{
            backgroundImage: `url(${smallBg})`,
          }}
          className="cursor-pointer border border-[#4d4d4d9d] bg-cover bg-bottom bg-no-repeat p-7 pb-10 rounded-xl w-full md:w-1/2 lg:w-5/12 bg-black"
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
          className="aspect-square p-5 lg:p-10 bg-cover bg-center bg-no-repeat rounded-xl border border-[#4d4d4d9d] w-full md:w-1/2 lg:w-5/12 flex items-center justify-center bg-black"
        >
          <img ref={imgRef} src={card1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Impression;
