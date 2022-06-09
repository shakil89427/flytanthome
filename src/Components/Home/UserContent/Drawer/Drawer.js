import React, { useState } from "react";

const Drawer = () => {
  const options = ["Home", "Sponsorships", "Notification", "Settings", "More"];
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="flex flex-col gap-8">
      {options.map((option) => (
        <p
          onClick={() => selected !== option && setSelected(option)}
          key={option}
          className="flex items-center gap-8 relative cursor-pointer h-8  pl-2"
        >
          {selected === option && (
            <span className="absolute w-1 bg-black h-full top-0 left-0" />
          )}
          <img
            className="w-6"
            src={require(`../../../../Assets/userHome/drawerItems/${option}.png`)}
            alt=""
          />
          <span
            className={`hidden lg:block text-lg ${
              selected === option ? "font-semibold" : "font-normal"
            }`}
          >
            {option}
          </span>
        </p>
      ))}
      <button className="bg-black text-md text-white py-3 rounded-full font-medium hidden lg:block w-[90%]">
        Create Campaign
      </button>
    </div>
  );
};

export default Drawer;
