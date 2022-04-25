import React from "react";
import Scroll from "../Components/Scroll/Scroll";
import PublicContent from "../Components/Home/PublicContent/PublicContent";
import UserContent from "../Components/Home/UserContent/UserContent";
import useStore from "../Store/useStore";

const Home = () => {
  const { user } = useStore();
  return (
    <>
      <Scroll /> {user?.userId ? <UserContent /> : <PublicContent />}
    </>
  );
};

export default Home;
