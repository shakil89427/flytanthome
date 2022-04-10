import React from "react";
import Details from "./Details";
import SocialAccounts from "./SocialAccounts";

const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 py-14 px-5 md:px-28 gap-10 lg:gap-20",
};

const Profile = () => {
  return (
    <div className={styles.main}>
      <Details />
      <SocialAccounts />
    </div>
  );
};

export default Profile;
