import React, { useEffect, useState } from "react";
import defaultUser from "../../Assets/defaultUser.png";

/* Styles Start */
const styles = {
  left: "flex flex-col gap-10",
  profileTop: "flex justify-between gap-5",
  profileLeft: "flex flex-col gap-10",
  profileWrapper: "flex gap-3",
  profileImage: "w-32 h-32 rounded-full bg-center bg-no-repeat bg-cover",
  topName: "text-xl md:text-2xl font-semibold mt-4",
  country: "text-sm font-medium uppercase",
  completeBtn:
    "border py-2 w-60 rounded-xl shadow-md font-medium border-gray-400 cursor-pointer text-center",
  topRight: "flex flex-col justify-between items-center",
  score:
    "border w-14 h-14 mx-auto rounded-full flex items-center justify-center border-black mb-3 text-2xl border-gray-400",
  progress:
    "relative w-[50px] h-[50px] rounded-full flex items-center justify-center progress before:content-[''] before:absolute before:w-[42px] before:h-[42px] before:bg-white before:rounded-full",
  infoName: "text-xl font-medium mb-2",
  catagories: "flex items-center gap-3 flex-wrap",
  catagory: "bg-[#DDDDDD] text-xs px-5 py-[2px] rounded-3xl",
  /* Right */
  title: "text-2xl font-semibold mt-3",
  socials: "flex items-center justify-between mt-5 font-medium",
  selectedSocial:
    "relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full",
};
/* Styles End */

const Details = ({ user, value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let initialProgress = 8;
    if (!user?.userId) return setProgress(0);
    if (!user?.profileImageUrl) initialProgress--;
    if (!user?.name) initialProgress--;
    if (!user?.categories?.length) initialProgress--;
    if (!user?.bio) initialProgress--;
    if (!user?.gender) initialProgress--;
    if (!user?.dateOfBirth) initialProgress--;
    if (!user?.email) initialProgress--;
    setProgress(Math.round((initialProgress / 8) * 100));
  }, [user]);

  return (
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
          {value ? (
            <p className={styles.completeBtn}>
              {progress === 100 ? "Edit Profile" : "Complete your Profile"}
            </p>
          ) : (
            <p className={styles.completeBtn}>Send Message</p>
          )}
        </div>
        <div className={styles.topRight}>
          <span>
            <p className={styles.score}>
              {user?.socialScore ? user?.socialScore : "0"}
            </p>
            <p className="font-semibold text-center">Social Score</p>
          </span>
          {value && (
            <div
              style={{
                backgroundImage: `conic-gradient(black ${
                  progress * 3.6
                }deg,#e0e0eb ${progress * 3.6}deg)`,
              }}
              className={styles.progress}
            >
              <span className="relative text-sm tracking-tighter font-bold">
                {progress}%
              </span>
            </div>
          )}
        </div>
      </div>
      {user?.bio && <p>{user.bio}</p>}
      {user?.name && (
        <div>
          <p className={styles.infoName}>Name</p>
          <p>{user.name}</p>
        </div>
      )}
      {user?.email && (
        <div>
          <p className={styles.infoName}>Email</p>
          <p>{user.email}</p>
        </div>
      )}
      {user?.dateOfBirth && (
        <div>
          <p className={styles.infoName}>DOB</p>
          {user.dateOfBirth}
        </div>
      )}
      {user?.categories?.length && (
        <div>
          <p className={styles.infoName}>Influence Categories</p>
          <div className={styles.catagories}>
            {user.categories.map((catagory) => (
              <p className={styles.catagory} key={catagory}>
                {catagory}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
