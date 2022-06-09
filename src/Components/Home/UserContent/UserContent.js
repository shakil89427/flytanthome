import React from "react";
import NavBar from "../../NavBar/NavBar";
import Drawer from "./Drawer/Drawer";
import Main from "./SubPages/Main";

const UserContent = () => {
  return (
    <div className="h-screen flex flex-col">
      <div>
        <NavBar />
      </div>
      <div className="w-full overflow-y-scroll flex r-box">
        <div className="w-[60px] lg:w-[300px] h-full py-5 overflow-y-scroll border-r">
          <Drawer />
        </div>
        <div className="w-full py-5 pl-5 overflow-y-scroll flex flex-col gap-14">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default UserContent;
