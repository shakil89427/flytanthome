import React, { useState } from "react";
import Login from "../Login/Login";
import logo from "../../Assets/logo.png";
import useStore from "../../Store/useStore";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast/Toast";
import useInstaConnect from "../../Hooks/useInstaConnect";
import Logout from "../Logout/Logout";
import { GiHamburgerMenu } from "react-icons/gi";
import LargeTop from "./LargeTop";
import SmallSide from "./SmallSide";
import Spinner from "../Spinner/Spinner";

const NavBar = ({ color }) => {
  useInstaConnect();
  const navigate = useNavigate();
  const { userLoading, showLogin, notify } = useStore();
  const [showSide, setShowSide] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div style={{ backgroundColor: color ? color : "black" }}>
      <div className="r-box h-14 md:h-24 flex items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer w-[130px] md:w-[200px]"
          src={logo}
          alt=""
        />
        <GiHamburgerMenu
          onClick={() => setShowSide(true)}
          className="lg:hidden text-white text-3xl hover:border rounded-md p-1 cursor-pointer ml-auto"
        />
        <SmallSide
          showSide={showSide}
          setShowSide={setShowSide}
          setShowLogout={setShowLogout}
        />
        <LargeTop setShowLogout={setShowLogout} />

        {showLogin && <Login />}
        {showLogout && <Logout setShowLogout={setShowLogout} />}
        {notify && <Toast />}
        {userLoading && <Spinner />}
      </div>
    </div>
  );
};

export default NavBar;
