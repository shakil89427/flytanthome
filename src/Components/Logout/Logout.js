import React, { useEffect } from "react";
import useLogins from "../../Hooks/useLogins";
import useStore from "../../Store/useStore";
import cross from "../../Assets/cross.svg";

const Logout = () => {
  const { user, setShowLogout } = useStore();
  const { signOutUser } = useLogins();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setShowLogout(false)}
        className="fixed bg-[#1a1717dc] w-full h-screen top-0 left-0 z-[999999]"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999999] w-fit">
        <div className="bg-white rounded-lg text-center relative p-14 mx-2">
          <img
            onClick={() => setShowLogout(false)}
            className="absolute w-6 h-6 top-3 right-4 text-2xl cursor-pointer"
            src={cross}
            alt=""
          />
          <h1 className="text-2xl md:text-3xl font-semibold">
            Logout from Flytant ?
          </h1>
          <p className="text-gray-500 mt-3 text-md">
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
