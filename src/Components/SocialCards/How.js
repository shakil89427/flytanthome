import React from "react";
import works1 from "../../Assets/socialCards/howItWorks/works1.png";
import works2 from "../../Assets/socialCards/howItWorks/works2.png";
import works3 from "../../Assets/socialCards/howItWorks/works3.png";
import works4 from "../../Assets/socialCards/howItWorks/works4.png";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../../Hooks/useAnalytics";

const How = () => {
  const navigate = useNavigate();
  const { addLog } = useAnalytics();
  const works = [
    { title: "Get Your Card", img: works1 },
    { title: "Create Profile", img: works2 },
    { title: "Activate Card", img: works3 },
    { title: "Make Connections", img: works4 },
  ];

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(145deg, #121212 0%, #000000 100%)",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="pt-10 r-box text-white">
        <p className="text-3xl lg:text-4xl font-semibold text-center">
          HOW IT WORKS?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-14 lg:py-24 xl:py-32">
          {works.map((work, index) => (
            <div
              key={work?.title}
              className="flex flex-col items-center justify-center"
            >
              <div
                style={{ backgroundImage: `url(${work?.img})` }}
                className="w-full aspect-square bg-contain bg-center bg-no-repeat"
              />
              <p className="mt-6 mb-3 text-md lg:text-xl font-medium">
                {index + 1}
              </p>
              <p className="text-md lg:text-xl font-medium">{work?.title}</p>
            </div>
          ))}
        </div>
        <p
          onClick={() => {
            addLog("buy_social_card");
            navigate("/products");
          }}
          className="border-2 font-bold w-fit px-12 py-4 text-lg rounded-full cursor-pointer select-none mx-auto hover:bg-white hover:text-black duration-150"
        >
          BUY SOCIAL CARD
        </p>
      </div>
    </div>
  );
};

export default How;
