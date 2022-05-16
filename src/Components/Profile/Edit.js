import React, { useState } from "react";
import cross from "../../Assets/cross.svg";
import defaultUser from "../../Assets/defaultUser.png";

const styles = {
  main: "fixed top-0 left-0 w-full min-h-screen bg-[#49494980] flex items-center justify-center z-10",
  inner: "bg-white pt-7 pb-4 w-[95%] max-w-[450px] relative rounded-md",
  top: "flex items-center justify-between w-full px-3 mb-4",
  save: "bg-black text-white w-full py-2 rounded-md text-sm mt-2",
  strength: "h-[6px] bg-gray-300 rounded-3xl relative overflow-hidden mt-2",
  editMain: "mx-14 flex flex-col gap-3 mt-3 items-center",
  input:
    "w-full outline-none border-0 border-b-2 border-gray-300 focus:border-black pr-2 mt-2",
};

const Edit = ({ details, progress, setEdit }) => {
  const [data, setData] = useState({
    bio: details?.bio || "",
    dateOfBirth: details?.dateOfBirth || "",
    email: details?.email,
    gender: details?.gender || "",
    name: details?.name || "",
    username: details?.username,
  });

  const updateData = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <img
          onClick={() => setEdit(false)}
          className="w-6 h-6 cursor-pointer absolute top-2 right-2"
          src={cross}
          alt=""
        />
        {/* Strength */}
        <div className="text-sm mx-10">
          <p>Profile Strength</p>
          <div className={styles.strength}>
            <div
              style={{ width: `${progress}%` }}
              className="absolute h-full bg-black"
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Low</p>
            <p>Medium</p>
            <p>High</p>
          </div>
        </div>
        {/* main */}
        <form className={styles.editMain} onSubmit={updateData}>
          <p className="text-lg font-medium">Complete Profile</p>
          <img
            className="w-20 h-20 rounded-full"
            src={
              details?.profileImageUrl ? details?.profileImageUrl : defaultUser
            }
            alt="*"
          />
          <div className="w-full">
            <p className="text-sm">Username</p>
            <input
              placeholder="Enter your username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
              value={data.username}
              className={styles.input}
              type="text"
            />
          </div>
          <div className="w-full">
            <p className="text-sm">Name</p>
            <input
              placeholder="Enter your name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              className={styles.input}
              type="text"
            />
          </div>
          <div className="w-full">
            <p className="text-sm">About</p>
            <input
              placeholder="Write about you"
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              value={data.bio}
              className={styles.input}
              type="text"
            />
          </div>
          <div className="w-full">
            <p className="text-sm">Email</p>
            <input
              placeholder="Enter your email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
              className={styles.input}
              type="email"
            />
          </div>
          <div className="w-full">
            <p className="text-sm">DOB</p>
            <input
              value={data.dateOfBirth}
              className={styles.input}
              type="date"
              onClick={(e) => console.log(e)}
            />
          </div>
          <div className="w-full">
            <p className="text-sm">Gender</p>
            <div className="text-sm flex items-center justify-between mt-2">
              <span className="flex gap-1">
                <input
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  className="w-[16px] h-[16px]"
                  type="radio"
                  id="Male"
                  name="Gender"
                  value="Male"
                  checked={data.gender === "Male" ? true : false}
                />
                <label for="Male">Male</label>
              </span>
              <span className="flex gap-1">
                <input
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  className="w-[16px] h-[16px]"
                  type="radio"
                  id="Female"
                  name="Gender"
                  value="Female"
                  checked={data.gender === "Female" ? true : false}
                />
                <label for="Female">Female</label>
              </span>
              <span className="flex gap-1">
                <input
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  className="w-[16px] h-[16px]"
                  type="radio"
                  id="Prefer not to say"
                  name="Gender"
                  value="Prefer not to say"
                  checked={data.gender === "Prefer not to say" ? true : false}
                />
                <label for="Prefer not to say">Prefer not to say</label>
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
