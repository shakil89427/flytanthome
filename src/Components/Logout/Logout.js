import React, { useEffect } from "react";
import useLogins from "../../Hooks/useLogins";
import useStore from "../../Store/useStore";

const Logout = ({ setShowLogout }) => {
  const { user } = useStore();
  const { signOutUser } = useLogins();

  useEffect(() => {
    if (!user?.username) {
      setShowLogout(false);
    }
  }, [user]);

  return (
    <div className="fixed bg-[#1a1717dc] w-full h-screen top-0 left-0 flex items-center justify-center z-30">
      <div className=" bg-white rounded-lg px-8 md:px-14 py-12 md:py-20 text-center mx-2 relative">
        <p
          onClick={() => setShowLogout(false)}
          className="absolute top-2 right-4 text-2xl cursor-pointer"
        >
          x
        </p>
        <h1 className="text-2xl font-semibold">
          You are attempting to logout from Flytant
        </h1>
        <h5 className="text-lg font-medium my-3">Are you Sure?</h5>
        <p>You're logged in as {user?.username}</p>
        <span className="flex items-center justify-center mt-5 gap-3">
          <button
            onClick={() => setShowLogout(false)}
            className="border-2 w-32 p-1 rounded-lg bg-black text-white border-black font-semibold"
          >
            No I don't
          </button>
          <button
            onClick={signOutUser}
            className="border-2 w-32 p-1 rounded-lg border-black font-semibold"
          >
            LOG OUT
          </button>
        </span>
      </div>
    </div>
  );
};

export default Logout;
