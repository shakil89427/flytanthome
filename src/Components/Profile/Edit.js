import React, { useState } from "react";
import cross from "../../Assets/cross.svg";
import defaultUser from "../../Assets/defaultUser.png";
import moment from "moment";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const styles = {
  main: "fixed top-0 left-0 w-full min-h-screen bg-[#49494980] flex items-center justify-center z-10",
  inner: "bg-white pt-7 pb-4 w-[95%] max-w-[450px] relative rounded-md",
  top: "flex items-center justify-between w-full px-3 mb-4",
  spinnerDiv:
    "absolute inset-0 flex items-center justify-center z-30 bg-[#aaa8a871]",
  save: "bg-black text-white w-full py-2 rounded-md text-sm mt-2",
  strength: "h-[6px] bg-gray-300 rounded-3xl relative overflow-hidden mt-2",
  editMain: "mx-14 flex flex-col gap-4 mt-3 items-center",
  input:
    "w-full outline-none border-0 border-b border-gray-300 focus:border-black pr-2 mt-2 text-sm",
};

const Edit = ({ progress, setEdit }) => {
  const { setNotify, user, setUser } = useStore();
  const db = getFirestore();
  const colRef = collection(db, "users");
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.dateOfBirth
      ? moment(user.dateOfBirth).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
  );
  const [gender, setGender] = useState(user?.gender);

  const updateData = () => {
    const finalData = {
      username,
      name,
      bio,
      email,
      dateOfBirth: moment(dateOfBirth).format("MMM DD YYYY"),
      gender,
    };
    const userRef = doc(db, "users", user.id);
    updateDoc(userRef, finalData)
      .then(() => {
        getDoc(userRef).then((res) => {
          setUser({ ...res.data(), id: res.id });
          setLoading(false);
          setEdit(false);
          setNotify({ status: true, message: "Data updated successfully" });
        });
      })
      .catch((err) => {
        setLoading(false);
        setNotify({ status: false, message: "Something went wrong" });
      });
  };

  const checkData = async (e) => {
    e.preventDefault();
    const regex = /^[0-9a-zA-Z]+$/;
    if (!username.match(regex)) {
      return setNotify({
        status: false,
        message: "Username should be alphanumeric only",
      });
    }
    setLoading(true);
    if (username === user?.username) return updateData();
    try {
      const q = query(colRef, where("username", "==", username), limit(1));
      const res = await getDocs(q);
      if (res?.docs?.length === 0) {
        updateData();
      } else {
        setLoading(false);
        setNotify({ status: false, message: "Username already taken" });
      }
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        {loading && (
          <div className={styles.spinnerDiv}>
            <Spinner />
          </div>
        )}
        <img
          onClick={() => setEdit(false)}
          className="w-6 h-6 cursor-pointer absolute top-2 right-2"
          src={cross}
          alt=""
        />
        {/* Strength */}
        <div className="text-sm mx-10">
          <p className="font-medium">Profile Strength</p>
          <div className={styles.strength}>
            <div
              style={{ width: `${progress}%` }}
              className="absolute h-full bg-black"
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <p>Low</p>
            <p>Medium</p>
            <p>High</p>
          </div>
        </div>
        {/* main */}
        <form className={styles.editMain} onSubmit={checkData}>
          <p className="text-lg font-medium">Complete Profile</p>
          <img
            className="w-20 h-20 rounded-full"
            src={user?.profileImageUrl ? user?.profileImageUrl : defaultUser}
            alt=""
          />
          {/* Username */}
          <div className="w-full relative">
            <p className="text-xs font-semibold">Username</p>
            <input
              required
              minLength="3"
              maxlength="15"
              placeholder="Enter your username"
              onChange={(e) =>
                setUsername(e.target.value.slice(0, 15).toLowerCase())
              }
              value={username}
              className={styles.input}
              type="text"
            />
            <p className="absolute -bottom-4 right-0 text-[10px] text-gray-400">
              {username?.length || 0}/15
            </p>
          </div>

          {/* Name */}
          <div className="w-full relative">
            <p className="text-xs font-semibold">Name</p>
            <input
              required
              minLength="3"
              maxlength="20"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value.slice(0, 20))}
              value={name}
              className={styles.input}
              type="text"
            />
            <p className="absolute -bottom-4 right-0 text-[10px] text-gray-400">
              {name?.length || 0}/20
            </p>
          </div>

          {/* Bio */}
          <div className="w-full relative">
            <p className="text-xs font-semibold">About</p>
            <input
              required
              minLength="10"
              maxlength="130"
              placeholder="Write about you"
              onChange={(e) => setBio(e.target.value.slice(0, 150))}
              value={bio}
              className={styles.input}
              type="text"
            />
            <p className="absolute -bottom-4 right-0 text-[10px] text-gray-400">
              {bio?.length || 0}/130
            </p>
          </div>

          {/* Email */}
          <div className="w-full">
            <p className="text-xs font-semibold">Email</p>
            <input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={styles.input}
              type="email"
            />
          </div>

          {/* DOB */}
          <div className="w-full">
            <p className="text-xs font-semibold">DOB</p>
            <input
              max={moment(Date.now() - 86400000).format("YYYY-MM-DD")}
              value={dateOfBirth}
              className={styles.input}
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="w-full">
            <p className="text-xs font-semibold">Gender</p>
            <div className="text-sm flex items-center justify-between mt-2">
              <span className="flex gap-1">
                <input
                  onChange={() => setGender("Male")}
                  className="w-[16px] h-[16px]"
                  type="radio"
                  id="Male"
                  name="Gender"
                  checked={gender === "Male" ? true : false}
                  required
                />
                <label htmlFor="Male">Male</label>
              </span>
              <span className="flex gap-1">
                <input
                  onChange={() => setGender("Female")}
                  className="w-[16px] h-[16px]"
                  type="radio"
                  id="Female"
                  name="Gender"
                  checked={gender === "Female" ? true : false}
                />
                <label htmlFor="Female">Female</label>
              </span>
              <span className="flex gap-1">
                <input
                  onChange={() => setGender("Prefer not to say")}
                  className="w-[16px] h-[16px]"
                  type="radio"
                  id="Prefer not to say"
                  name="Gender"
                  checked={gender === "Prefer not to say" ? true : false}
                />
                <label htmlFor="Prefer not to say">Prefer not to say</label>
              </span>
            </div>
          </div>
          <button type="submit" className={styles.save}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
