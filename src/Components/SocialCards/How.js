import React from "react";
import works1 from "../../Assets/socialCards/howItWorks/works1.png";
import works2 from "../../Assets/socialCards/howItWorks/works2.png";
import works3 from "../../Assets/socialCards/howItWorks/works3.png";
import works4 from "../../Assets/socialCards/howItWorks/works4.png";

const How = () => {
  const works = [
    { title: "Get Your Card", img: works1 },
    { title: "Create Profile", img: works2 },
    { title: "Activate Card", img: works3 },
    { title: "Make Connections", img: works4 },
  ];
  return (
    <div className="pt-10 r-box text-white">
      <p className="text-3xl lg:text-4xl font-semibold text-center">
        HOW IT WORKS?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-20">
        {works.map((work, index) => (
          <div
            key={work?.title}
            className="flex flex-col items-center justify-center"
          >
            <div
              style={{ backgroundImage: `url(${work?.img})` }}
              className="w-full aspect-[5/3] bg-contain bg-center bg-no-repeat"
            />
            <p className="my-2 text-md lg:text-xl font-medium">{index + 1}</p>
            <p className="text-md lg:text-xl font-medium">{work?.title}</p>
          </div>
        ))}
      </div>
      <p className="w-fit mx-auto border-2 px-5 py-2 rounded-full text-lg font-medium">
        BUY SOCIAL CARD
      </p>
    </div>
  );
};

export default How;
