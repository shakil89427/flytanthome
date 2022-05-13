import React from "react";
import useLogins from "../../Hooks/useLogins";
import useStore from "../../Store/useStore";
import cross from "../../Assets/cross.svg";

const Logout = () => {
  const { user, setShowLogout } = useStore();
  const { signOutUser } = useLogins();

  return (
    <>
      <div
        onClick={() => setShowLogout(false)}
        className="fixed bg-[#1a1717dc] w-full h-screen top-0 left-0 z-30"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full p-1 md:w-auto">
        <div className="bg-white rounded-lg px-1 py-12 md:px-10 md:py-20 text-center mx-1 relative">
          <img
            onClick={() => setShowLogout(false)}
            className="absolute w-6 h-6 top-3 right-4 text-2xl cursor-pointer"
            src={cross}
            alt=""
          />
          <h1 className="text-2xl md:text-3xl font-semibold">
            You are attempting to logout from Flytant
          </h1>
          <h5 className="text-lg md:text-xl font-medium my-3 text-gray-600">
            Are you Sure?
          </h5>
          <p className="text-gray-500 text-md">
            You're logged in as {user?.username}
          </p>
          <span className="flex items-center justify-center mt-7 gap-5">
            <button
              onClick={() => setShowLogout(false)}
              className="border-2 w-32 p-2 rounded-lg bg-black text-white border-black font-semibold duration-150 hover:scale-105"
            >
              No I don't
            </button>
            <button
              onClick={signOutUser}
              className="border-2 w-32 p-2 rounded-lg border-black font-semibold duration-150 hover:scale-105"
            >
              LOG OUT
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Logout;
