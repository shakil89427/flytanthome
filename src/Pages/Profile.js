import React from "react";
import Details from "../Components/Profile/Details";
import SocialAccounts from "../Components/Profile/SocialAccounts";
import Scroll from "../Components/Scroll/Scroll";
import useStore from "../Store/useStore";

const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 py-14 r-box gap-10 lg:gap-20",
};

const Profile = () => {
  const { user } = useStore();
  return (
    <div className={styles.main}>
      <Scroll />
      <Details user={user} value={true} />
      <SocialAccounts value={true} />
    </div>
  );
};

export default Profile;
