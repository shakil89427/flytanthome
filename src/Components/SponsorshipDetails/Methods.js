import React from "react";
import useStore from "../../Store/useStore";
import cross from "../../Assets/cross.svg";

const Methods = ({ setShowMethods, setFreeTrials, setNumberOfApplies }) => {
  const { user } = useStore();
  return (
    <div>
      <div className="fixed w-full h-screen bg-[#07070783] z-10" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white">
        <p>Select an option to process</p>
        <div>
          <p>Free trials remaining: {user.freeTrials}</p>
          <button>Select</button>
        </div>
        <div>
          <p>Number of applies remaining: {user?.numberOfApplies}</p>
          <button>Select</button>
        </div>
      </div>
    </div>
  );
};

export default Methods;
