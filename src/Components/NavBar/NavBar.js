import React, { useEffect, useState } from "react";
import logoBlack from "../../Assets/logoBlack.png";
import logo from "../../Assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import LargeTop from "./LargeTop";
import SmallSide from "./SmallSide";
import useStore from "../../Store/useStore";
import useAnalytics from "../../Hooks/useAnalytics";

const NavBar = ({ bg }) => {
  const { user } = useStore();
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSide, setShowSide] = useState(false);
  const { addLog } = useAnalytics();

  const [theme, setTheme] = useState({
    bg: "bg-transparent",
    border: "border-0",
    img: logo,
    text: "text-white",
  });

  useEffect(() => {
    if (bg && !user?.userId) {
      setTheme({
        bg: "bg-transparent",
        border: "border-0",
        img: logo,
        text: "text-white",
      });
    }
    if (user?.userId && !bg) {
      setTheme({
        bg: "bg-white",
        border: "border-b",
        img: logoBlack,
        text: "text-black",
      });
    }
    if (!bg && !user?.userId) {
      return setTheme({
        bg: "bg-black",
        border: "border-0",
        img: logo,
        text: "text-white",
      });
    }

    if (user?.userId && bg) {
      setTheme({
        bg: "bg-transparent",
        border: "border-0",
        img: logo,
        text: "text-white",
      });
    }
  }, [bg, user, location]);

  return (
    <div className={theme.bg}>
      <div
        className={`h-14 md:h-24 r-box flex items-center justify-between ${theme.border}`}
      >
        <img
          onClick={() => {
            addLog("nav_logo");
            navigate("/");
          }}
          className="cursor-pointer w-[130px] md:w-[185px]"
          src={theme.img}
          alt=""
        />
        <div className="lg:hidden flex items-center justify-end gap-3 w-full">
          {/* {user?.userId && (
            <BiSearch
              onClick={() => navigate("/search")}
              className={`cursor-pointer text-black ${
                pathname === "/search" ? "invisible" : "visible"
              }`}
            />
          )} */}
          {pathname !== "/onboard" && (
            <GiHamburgerMenu
              onClick={() => {
                addLog("hamburger");
                setShowSide(true);
              }}
              className={`text-3xl hover:border rounded-md p-1 cursor-pointer ${theme.text}`}
            />
          )}
        </div>

        <SmallSide showSide={showSide} setShowSide={setShowSide} />
        <LargeTop theme={theme} />
      </div>
    </div>
  );
};

export default NavBar;
