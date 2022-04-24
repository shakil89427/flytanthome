import React from "react";
import logo from "../../Assets/logo.png";
import { BsArrowRight } from "react-icons/bs";
import useStore from "../../Store/useStore";

const SmallSide = ({ showSide, setShowSide }) => {
  const { setShowLogin } = useStore();
  return (
    <div className="lg:hidden">
      {showSide && (
        <div
          onClick={() => setShowSide(false)}
          className="fixed top-0 left-0 w-full h-screen z-30 bg-[#07070783]"
        />
      )}
      <div
        style={{
          backgroundImage: "linear-gradient(to right, black, rgb(78, 77, 77))",
          transform: `translateX(${showSide ? 0 : "100%"})`,
        }}
        className="fixed top-0 right-0 w-fit px-5 h-screen z-30 duration-300"
      >
        <div className="py-5 flex items-center gap-5">
          <BsArrowRight
            onClick={() => setShowSide(false)}
            className="text-white text-2xl cursor-pointer"
          />
          <img className="w-36" src={logo} alt="" />
        </div>
        <div className="flex items-center gap-3">
          <button className="w-28 h-10 border text-sm font-semibold border-gray-400 flex items-center justify-center text-white rounded-md duration-150 hover:scale-105 hover:border-white hover:border-2">
            Contact
          </button>
          <button
            onClick={() => {
              setShowSide(false);
              setShowLogin(true);
            }}
            className="bg-white w-36 h-10 border text-sm border-white flex items-center justify-center rounded-md duration-150 hover:scale-105 font-semibold hover:border-2"
          >
            Login | Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallSide;
