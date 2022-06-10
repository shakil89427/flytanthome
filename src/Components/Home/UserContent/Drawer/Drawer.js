import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Drawer = () => {
  const paths = ["Home", "Sponsorships", "Notification", "Settings", "More"];
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(paths[0].toLowerCase());
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      setSelected("home");
    } else {
      setSelected(pathname.slice(1, pathname?.length));
    }
  }, [pathname]);

  const changePath = (path) => {
    if (path.toLowerCase() === "home") {
      navigate("/");
    } else {
      navigate(`/${path.toLowerCase()}`);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      {paths.map((path) => (
        <p
          onClick={() => path.toLowerCase() !== selected && changePath(path)}
          key={path}
          className="flex items-center gap-8 relative cursor-pointer h-8  pl-2"
        >
          {selected === path.toLowerCase() && (
            <span className="absolute w-1 bg-black h-full top-0 left-0" />
          )}
          <img
            className="w-6"
            src={require(`../../../../Assets/userHome/drawerItems/${
              selected === path.toLowerCase() ? path + "B" : path
            }.png`)}
            alt=""
          />
          <span
            className={`hidden lg:block text-lg ${
              selected === path.toLowerCase() ? "font-semibold" : "font-normal"
            }`}
          >
            {path}
          </span>
        </p>
      ))}
      <button
        onClick={() => navigate("/createcampaign")}
        className="bg-black text-md text-white py-3 rounded-full font-medium hidden lg:block w-[90%]"
      >
        Create Campaign
      </button>
    </div>
  );
};

export default Drawer;
