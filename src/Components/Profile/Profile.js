import React, { useEffect, useState } from "react";
import "./Profile.css";
import useStore from "../../Store/useStore";
import defaultUser from "../../Assets/defaultUserImage.png";

const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 py-14 px-5 md:px-28 gap-10 lg:gap-20",
  left: "flex flex-col gap-10",
  profileTop: "flex justify-between gap-5",
  profileLeft: "flex flex-col gap-10",
  profileWrapper: "flex gap-3",
  profileImage: "w-32 h-32 rounded-full bg-center bg-no-repeat bg-cover",
  topName: "text-xl md:text-2xl font-semibold mt-4",
  country: "text-sm font-medium",
  completeBtn:
    "border py-2 w-60 rounded-xl shadow-md font-medium border-gray-400 cursor-pointer text-center",
  topRight: "flex flex-col justify-between items-center",
  score:
    "border w-14 h-14 mx-auto rounded-full flex items-center justify-center border-black mb-3 text-3xl border-gray-400",
  completed:
    "border-2 w-12 h-12 rounded-full flex items-center justify-center border-black text-md font-semibold",
  infoName: "text-xl font-medium mb-2",
  catagories: "flex items-center gap-3 flex-wrap",
  catagory: "bg-[#DDDDDD] text-xs px-5 py-[2px] rounded-3xl",
};

const Profile = () => {
  const { user } = useStore();
  const socials = ["Instagram", " Youtube", "Twitter", " Linkedin", "Tiktok"];
  const [selected, setSelected] = useState(socials[0]);
  const [progress, setProgress] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user?.userId) return;

    let initialProgress = 8;

    if (!user?.profileImageUrl) {
      initialProgress--;
    }

    if (!user?.name) {
      initialProgress--;
    }

    if (user?.categories?.length === 0) {
      initialProgress--;
    }

    if (!user?.bio) {
      initialProgress--;
    }

    if (!user?.gender) {
      initialProgress--;
    }

    if (!user?.dateOfBirth) {
      initialProgress--;
    }
    if (!user?.email) {
      initialProgress--;
    }
    if (initialProgress === 8) {
      setStatus("Edit Profile");
    } else {
      setStatus("Complete your Profile");
    }
    setProgress(Math.round((initialProgress / 8) * 100));
  }, [user]);

  return (
    <div className={styles.main}>
      {/* Left Part */}
      <div className={styles.left}>
        <div className={styles.profileTop}>
          <div className={styles.profileLeft}>
            <div className={styles.profileWrapper}>
              <div
                style={{
                  backgroundImage: `url(${
                    user?.profileImageUrl ? user?.profileImageUrl : defaultUser
                  })`,
                }}
                className={styles.profileImage}
              ></div>
              <span>
                <p className={styles.topName}>{user?.username}</p>
                <p className={styles.country}>
                  {user?.countryCode}
                  {user?.countryCode && user?.gender && ", "}
                  {user?.gender?.charAt(0)}
                </p>
              </span>
            </div>
            <p className={styles.completeBtn}>{status}</p>
          </div>
          <div className={styles.topRight}>
            <span>
              <p className={styles.score}>
                {user?.socialScore ? user?.socialScore : "0"}
              </p>
              <p className="font-semibold text-center">Social Score</p>
            </span>
            <p className={styles.completed}>{progress}%</p>
          </div>
        </div>
        <p>{user?.bio}</p>
        <div>
          <p className={styles.infoName}>Name</p>
          <p>{user?.name}</p>
        </div>
        <div>
          <p className={styles.infoName}>Email</p>
          <p>{user?.email}</p>
        </div>
        <div>
          <p className={styles.infoName}>DOB</p>
          {user?.dateOfBirth}
        </div>
        <div>
          <p className={styles.infoName}>Influence Catagories</p>
          <div className={styles.catagories}>
            {user?.categories?.map((catagory) => (
              <p className={styles.catagory} key={catagory}>
                {catagory}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Part */}
      <div>
        <p className="text-2xl font-semibold mt-3">Social Accounts</p>
        <div className="flex items-center justify-between mt-5 font-medium">
          {socials.map((social) => (
            <p
              onClick={() => social !== selected && setSelected(social)}
              className={
                selected === social ? "selected-social" : "cursor-pointer"
              }
              key={social}
            >
              {social}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
