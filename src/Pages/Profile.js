import React from "react";
import Details from "../Components/Profile/Details";
import SocialAccounts from "../Components/Profile/SocialAccounts";
import Scroll from "../Components/Scroll/Scroll";

const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 py-14 px-5 md:px-28 gap-10 lg:gap-20",
};

const Profile = () => {
  return (
    <div className={styles.main}>
      <Scroll />
      <Details />
      <SocialAccounts />
    </div>
  );
};

export default Profile;
