import React, { useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import useStore from "../Store/useStore";
import Drawer from "../Components/Home/UserContent/Drawer/Drawer";
import Banner from "../Components/Home/PublicContent/Banner";
import InfluencersHero from "../Components/Home/PublicContent/InfluencersHero";
import BrandsHero from "../Components/Home/PublicContent/BrandsHero";
import OnboardHero from "../Components/Home/PublicContent/OnboardHero";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.userId && pathname !== "/") {
      navigate("/");
    }
  }, [user, pathname]);

  if (!user?.userId) {
    return (
      <div>
        <Banner />
        <InfluencersHero />
        <BrandsHero />
        <OnboardHero />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div>
        <NavBar />
      </div>
      <div className="w-full overflow-hidden flex r-box">
        <div className="w-[60px] lg:w-[300px] h-full py-5 overflow-y-scroll scrollbar border-r">
          <Drawer />
        </div>
        <div className="w-full py-5 pl-5 overflow-y-scroll scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
