import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Spinner from "../Spinner/Spinner";
import defaultUser from "../../Assets/defaultUser.png";
import Scroll from "../Scroll/Scroll";
import useStore from "../../Store/useStore";
import Instagram from "./Instagram";
import Youtube from "./Youtube";
import Twitter from "./Twitter";
import Tiktok from "./Tiktok";
import { useParams } from "react-router-dom";
import Edit from "./Edit";
import { getString } from "firebase/remote-config";
const styles = {
  spinnerDiv:
    "fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center bg-[#8d8b8b4f]",
  main: "grid grid-cols-1 lg:grid-cols-2 max-w-[1100px] px-5 gap-y-10 gap-x-10  mx-auto",
  profileTop: "flex justify-between gap-5",
  profileLeft: "flex flex-col gap-10",
  profileWrapper: "flex gap-3",
  left: "pt-5 lg:pb-14",
  profileImage:
    "w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-center bg-no-repeat bg-cover",
  topName: "text-lg sm:text-xl md:text-2xl font-semibold mt-4 break-words",
  country: "text-sm font-medium uppercase",
  completeBtn:
    "border py-4 w-60 sm:w-72 rounded-md shadow-md font-medium border-gray-400 cursor-pointer text-center",
  topRight: "flex flex-col justify-between items-center",
  score:
    "border w-[65px] h-[65px] mx-auto rounded-full flex items-center justify-center mb-3 text-3xl border-gray-400",
  progress:
    "w-[55px] h-[55px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center",
  progressInner:
    "font-semibold bg-white w-[92%] h-[92%] rounded-full flex items-center justify-center",
  infoName: "font-medium mb-2 mt-8 text-gray-400 ",
  infoItem: "text-lg font-medium",
  catagories: "flex items-center gap-3 flex-wrap mt-4",
  catagory: "py-1 px-6 bg-[#E8E8E8] w-fit rounded-3xl text-sm font-medium",
  /* Right */
  title: "text-2xl font-semibold mt-3",
  socials: "flex items-center justify-between mt-5 font-medium text-gray-500",
  selectedSocial:
    "relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full text-black",
};

const Profile = () => {
  const {
    remoteConfig,
    user,
    featuredInfluencers,
    popularInfluencers,
    users,
    setUsers,
  } = useStore();
  const { id } = useParams();
  const db = getFirestore();
  const [details, setDetails] = useState({});
  const [country, setCountry] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const socials = ["Instagram", "Youtube", "Twitter", "Tiktok"];
  const [selected, setSelected] = useState(socials[0]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (id === user?.id) return setDetails({ ...user, access: true });
    const exist1 = featuredInfluencers?.data?.find((user) => user.id === id);
    if (exist1?.id) return setDetails({ ...exist1, access: false });
    const exist2 = popularInfluencers?.data?.find((user) => user.id === id);
    if (exist2?.id) return setDetails({ ...exist2, access: false });
    const exist3 = users?.find((user) => user.id === id);
    if (exist3?.id) return setDetails({ ...exist3, access: false });
    const userRef = doc(db, "users", id);
    getDoc(userRef)
      .then((data) => {
        const temp = { ...data?.data(), id: data?.id };
        if (temp?.id) {
          setDetails({ ...temp, access: false });
          setUsers([...users, temp]);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id, user]);

  useEffect(() => {
    if (!details?.countryCode) return;
    const allCountries = JSON.parse(getString(remoteConfig, "country_list"));
    const found = allCountries?.find(
      (c) => c?.countryCode === details?.countryCode
    );
    setCountry(found?.countryName);
  }, [details]);

  useEffect(() => {
    if (!details.id) return;
    let initialProgress = 8;
    if (
      !details?.profileImageUrl ||
      details?.profileImageUrl?.toLowerCase().includes("default") ||
      details?.profileImageUrl === ""
    )
      initialProgress--;
    if (!details?.name) initialProgress--;
    if (!details?.categories?.length) initialProgress--;
    if (!details?.bio) initialProgress--;
    if (!details?.gender) initialProgress--;
    if (!details?.dateOfBirth) initialProgress--;
    if (!details?.email) initialProgress--;
    setProgress(Math.round((initialProgress / 8) * 100));
    setLoading(false);
  }, [details]);

  return (
    <>
      {edit && <Edit progress={progress} setEdit={setEdit} />}
      <Scroll />
      {loading && (
        <div className={styles.spinnerDiv}>
          <Spinner />
        </div>
      )}
      {!loading && details?.id && (
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.profileTop}>
              <div className={styles.profileLeft}>
                <div className={styles.profileWrapper}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        details?.profileImageUrl &&
                        !details?.profileImageUrl
                          ?.toLowerCase()
                          ?.includes("default") &&
                        details?.profileImageUrl !== ""
                          ? details?.profileImageUrl
                          : defaultUser
                      })`,
                    }}
                    className={styles.profileImage}
                  ></div>
                  <span>
                    <p className={styles.topName}>{details?.username}</p>
                    <p className={styles.country}>
                      {country && country}
                      {country && details?.gender && ", "}
                      {details?.gender?.charAt(0)}
                    </p>
                  </span>
                </div>
                {details?.access && (
                  <p
                    onClick={() => setEdit(true)}
                    className={styles.completeBtn}
                  >
                    {progress === 100
                      ? "Edit Profile"
                      : "Complete your Profile"}
                  </p>
                )}
              </div>
              <div className={styles.topRight}>
                <span>
                  <p className={styles.score}>
                    {details?.socialScore ? details?.socialScore : "0"}
                  </p>
                  <p className="text-xs md:text-md font-semibold text-center">
                    Social Score
                  </p>
                </span>
                {details?.access && (
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
            {details?.bio && (
              <p className="text-gray-600 mt-8 break-words">{details.bio}</p>
            )}
            {details?.name && (
              <div>
                <p className={styles.infoName}>Name</p>
                <p className={styles.infoItem}>{details.name}</p>
              </div>
            )}

            {details?.email && (
              <div>
                <p className={styles.infoName}>Email</p>
                <p className={styles.infoItem}>{details.email}</p>
              </div>
            )}
            {details?.dateOfBirth && (
              <div>
                <p className={styles.infoName}>DOB</p>
                <p className={styles.infoItem}>{details.dateOfBirth}</p>
              </div>
            )}
            {details?.categories?.length && (
              <div>
                <p className={styles.infoName}>Influence Categories</p>
                <div className={styles.catagories}>
                  {details.categories.map((catagory) => (
                    <p className={styles.catagory} key={catagory}>
                      {catagory}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:border-l lg:pl-10 pt-5 pb-14">
            <p className={styles.title}>Social Accounts</p>
            <div className={styles.socials}>
              {socials.map((social) => (
                <p
                  onClick={() => social !== selected && setSelected(social)}
                  className={
                    selected === social
                      ? styles.selectedSocial
                      : "cursor-pointer"
                  }
                  key={social}
                >
                  {social}
                </p>
              ))}
            </div>
            {selected === "Instagram" && <Instagram details={details} />}
            {selected === "Youtube" && <Youtube details={details} />}
            {selected === "Twitter" && <Twitter details={details} />}
            {selected === "Tiktok" && <Tiktok details={details} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
