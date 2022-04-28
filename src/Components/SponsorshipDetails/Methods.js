import React from "react";
import useStore from "../../Store/useStore";

const Methods = ({ setShowMethods, setFreeTrials, setNumberOfApplies }) => {
  const { user } = useStore();
  return (
    <div>
      <div
        onClick={() => setShowMethods(false)}
        className="fixed top-0 left-0 w-full h-screen bg-[#07070783] z-10"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-8 flex flex-col gap-5 items-center rounded-md shadow-2xl">
        <p className="text-xl md:text-2xl lg:text-3xl text-center font-medium mb-5">
          Select an option to process
        </p>
        <div className="w-full flex items-center gap-14  justify-between border-y">
          <p>
            Free trials{" "}
            <span className="font-medium">Remaining {user.freeTrials}</span>
          </p>
          <button
            onClick={() => {
              setFreeTrials(true);
              setShowMethods(false);
            }}
            className="bg-black text-white py-2 px-5 rounded-md"
          >
            Select
          </button>
        </div>
        <div className="w-full flex items-center gap-14 justify-between border-y">
          <p>
            Number of applies {""}
            <span className="font-medium">
              Remaining {user?.numberOfApplies}
            </span>
          </p>
          <button
            onClick={() => {
              setNumberOfApplies(true);
              setShowMethods(false);
            }}
            className="bg-black text-white py-2 px-5 rounded-md"
          >
            Select
          </button>
        </div>
        <button
          onClick={() => setShowMethods(false)}
          className=" py-2 px-5 rounded-md border border-black mt-5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Methods;
