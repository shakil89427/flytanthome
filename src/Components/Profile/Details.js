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
    "border py-4 w-72 rounded-md shadow-md font-medium border-gray-400 cursor-pointer text-center",
  topRight: "flex flex-col justify-between items-center",
  score:
    "border w-[65px] h-[65px] mx-auto rounded-full flex items-center justify-center mb-3 text-3xl border-gray-400",
  progress: "w-[60px] h-[60px] rounded-full flex items-center justify-center",
  progressInner:
    "font-semibold bg-white w-[92%] h-[92%] rounded-full flex items-center justify-center",
  infoName: "font-medium mb-2 text-gray-400 ",
  infoItem: "text-lg font-medium",
  catagories: "flex items-center gap-3 flex-wrap mt-4",
  catagory: "py-1 px-6 bg-gray-200 w-fit rounded-3xl text-sm font-medium",
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
              <div className={styles.progressInner}>{progress}%</div>
            </div>
          )}
        </div>
      </div>
      {user?.bio && <p className="text-gray-600">{user.bio}</p>}
      {user?.name && (
        <div>
          <p className={styles.infoName}>Name</p>
          <p className={styles.infoItem}>{user.name}</p>
        </div>
      )}
      {user?.email && (
        <div>
          <p className={styles.infoName}>Email</p>
          <p className={styles.infoItem}>{user.email}</p>
        </div>
      )}
      {user?.dateOfBirth && (
        <div>
          <p className={styles.infoName}>DOB</p>
          <p className={styles.infoItem}>{user.dateOfBirth}</p>
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
