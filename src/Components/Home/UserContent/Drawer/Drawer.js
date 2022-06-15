import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Blogs from "../../../../Assets/userHome/drawerItems/Blogs.png";
import BlogsB from "../../../../Assets/userHome/drawerItems/BlogsB.png";
import Home from "../../../../Assets/userHome/drawerItems/Home.png";
import HomeB from "../../../../Assets/userHome/drawerItems/HomeB.png";
import Logout from "../../../../Assets/userHome/drawerItems/Logout.png";
import LogoutB from "../../../../Assets/userHome/drawerItems/LogoutB.png";
import Notification from "../../../../Assets/userHome/drawerItems/Notification.png";
import NotificationB from "../../../../Assets/userHome/drawerItems/NotificationB.png";
import Settings from "../../../../Assets/userHome/drawerItems/Settings.png";
import SettingsB from "../../../../Assets/userHome/drawerItems/SettingsB.png";
import SocialProfile from "../../../../Assets/userHome/drawerItems/SocialProfile.png";
import SocialProfileB from "../../../../Assets/userHome/drawerItems/SocialProfileB.png";
import Sponsorships from "../../../../Assets/userHome/drawerItems/Sponsorships.png";
import SponsorshipsB from "../../../../Assets/userHome/drawerItems/SponsorshipsB.png";
import Subscription from "../../../../Assets/userHome/drawerItems/Subscription.png";
import Subscriptions from "../../../../Assets/userHome/drawerItems/SubscriptionB.png";
import Back from "../../../../Assets/userHome/drawerItems/back.png";
import Courses from "../../../../Assets/userHome/drawerItems/Courses.png";
import CoursesB from "../../../../Assets/userHome/drawerItems/CoursesB.png";
import MyCampaigns from "../../../../Assets/userHome/drawerItems/MyCampaigns.png";
import useStore from "../../../../Store/useStore";

const Drawer = () => {
  const { user, setShowLogout, routes, setRoutes } = useStore();
  const paths1 = [
    { title: "Home", path: "/", img1: Home, img2: HomeB },
    {
      title: "Sponsorships",
      path: "/sponsorships",
      img1: Sponsorships,
      img2: SponsorshipsB,
    },
    {
      title: "Notifications",
      path: "/notifications",
      img1: Notification,
      img2: NotificationB,
    },
    {
      title: "Courses",
      path: "/courses",
      img1: Courses,
      img2: CoursesB,
    },
    { title: "Blogs", path: "/blogs", img1: Blogs, img2: BlogsB },
    { title: "Settings", path: "settings", img1: Settings, img2: SettingsB },
  ];
  const paths2 = [
    {
      title: "Social Profile",
      path: `/profile/${user?.userId}`,
      img1: SocialProfile,
      img2: SocialProfileB,
    },
    {
      title: "My Campaigns",
      path: "/mycampaigns",
      img1: MyCampaigns,
      img2: MyCampaigns,
    },
    {
      title: "Subscription",
      path: "/subscription",
      img1: Subscription,
      img2: Subscriptions,
    },
    { title: "Logout", path: "Logout", img1: Logout, img2: LogoutB },
  ];
  const [paths, setPaths] = useState(paths1);
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (routes) {
      setPaths(paths2);
    } else {
      setPaths(paths1);
    }
  }, [routes]);

  useLayoutEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  const changePath = (path) => {
    if (path === "settings") {
      return setRoutes(true);
    }
    if (path === "Logout") {
      return setShowLogout(true);
    }
    navigate(path);
  };
  return (
    <div className="">
      {routes && (
        <div
          onClick={() => setRoutes(false)}
          className="flex items-center gap-8 pl-2 mb-10 cursor-pointer h-8 font-semibold"
        >
          <img className="w-7 md:w-8" src={Back} alt="" />
          <p className="hidden lg:block ">Settings</p>
        </div>
      )}
      <div className="flex flex-col gap-8">
        {paths.map((path) => (
          <p
            onClick={() => changePath(path?.path)}
            key={path?.title}
            className="flex items-center gap-8 relative cursor-pointer h-8  pl-2"
          >
            {selected === path.path && (
              <span className="absolute w-1 bg-black h-full top-0 left-0" />
            )}
            <img
              className="w-7 md:w-8"
              src={selected === path.path ? path?.img2 : path.img1}
              alt=""
            />
            <span
              className={`hidden lg:block text-lg ${
                selected === path.path ? "font-bold" : "font-medium"
              }`}
            >
              {path.title}
            </span>
          </p>
        ))}
        {!routes && (
          <button
            onClick={() => navigate("/createcampaign")}
            className="bg-black text-md text-white py-3 rounded-full font-medium hidden lg:block w-[90%]"
          >
            Create Campaign
          </button>
        )}
      </div>
    </div>
  );
};

export default Drawer;
