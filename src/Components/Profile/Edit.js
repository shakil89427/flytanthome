import React, { useEffect, useState } from "react";
import cross from "../../Assets/cross.svg";
import defaultUser from "../../Assets/defaultUser.png";
import moment from "moment";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getString } from "firebase/remote-config";

const styles = {
  main: "fixed top-0 left-0 w-full min-h-screen bg-[#49494980]",
  inner:
    "bg-white pt-7 pb-4 w-[95%] max-w-[450px] max-h-[95vh] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md overflow-y-scroll scrollbar z-30",
  top: "flex items-center justify-between w-full px-3 mb-4",
  spinnerDiv:
    "fixed top-0 left-0 inset-0 flex items-center justify-center bg-[#aaa8a871] z-40",
  image: "w-20 h-20 rounded-full relative bg-cover bg-no-repeat bg-center",
  fileInput:
    "bg-black border-2 border-white text-white rounded-full w-6 h-6 flex items-center justify-center absolute top-12 right-0 cursor-pointer",
  save: "w-full py-2 rounded-md text-sm mt-2 text-white bg-black",
  strength: "h-[6px] bg-gray-300 rounded-3xl relative overflow-hidden mt-2",
  editMain: "mx-14 flex flex-col gap-8 mt-5 items-center",
  input:
    "w-full outline-none border-0 border-b border-gray-300 focus:border-black pr-2 mt-2 text-md",
};

const Edit = ({ progress, setEdit }) => {
  const { remoteConfig, app, setNotify, user, setUser } = useStore();
  const db = getFirestore();
  const storage = getStorage(app);
  const colRef = collection(db, "users");
  const [loading, setLoading] = useState(false);
  const [filterKey, setFilterKey] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [categories, setCategories] = useState(user?.categories || []);
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.dateOfBirth
      ? moment(new Date(user.dateOfBirth)).format("YYYY-MM-DD")
      : ""
  );
  const [gender, setGender] = useState(user?.gender);

  useEffect(() => {
    const allCategories = Object.keys(
      JSON.parse(getString(remoteConfig, "explore_category"))
    );
    if (filterKey.length < 1) return setFiltered(allCategories);
    setFiltered(
      allCategories.filter((c) =>
        c.toLowerCase().includes(filterKey.toLowerCase())
      )
    );
  }, [filterKey]);

  /* Update data on db */
  const updateData = (profileImageUrl) => {
    let finalData = {
      username,
      name,
      bio,
      email,
      dateOfBirth: moment(dateOfBirth).format("MMM DD YYYY"),
      gender,
      categories,
    };
    if (profileImageUrl) {
      finalData.profileImageUrl = profileImageUrl;
    }
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

  /* Upload image and get url */
  const uploadImage = () => {
    if (!image) return updateData();
    const storageRef = ref(
      storage,
      `/profile_images/${user.userId + Date.now() + image?.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        setLoading(false);
        setNotify({ status: false, message: "Something went wrong" });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => updateData(url))
          .catch((err) => {
            setLoading(false);
            setNotify({ status: false, message: "Something went wrong" });
          });
      }
    );
  };

  /* Check data */
  const checkData = async (e) => {
    e.preventDefault();
    if (categories.length < 1) {
      return setNotify({ status: false, message: "Please select categories" });
    }
    const regex = /^[0-9a-zA-Z]+$/;
    if (!username.match(regex)) {
      return setNotify({
        status: false,
        message: "Username should be alphanumeric only",
      });
    }
    setLoading(true);
    if (username === user?.username) return uploadImage();
    try {
      const q = query(colRef, where("username", "==", username), limit(1));
      const res = await getDocs(q);
      if (res?.docs?.length === 0) {
        uploadImage();
      } else {
        setLoading(false);
        setNotify({ status: false, message: "Username already taken" });
      }
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      {loading && (
        <div className={styles.spinnerDiv}>
          <Spinner />
        </div>
      )}
      <div onClick={() => setShowCategories(false)} className={styles.main} />
      <div className={styles.inner}>
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
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-lg font-medium">Complete Profile</p>
            <div
              style={{
                backgroundImage: `url(${
                  image
                    ? URL.createObjectURL(image)
                    : user?.profileImageUrl &&
                      !user?.profileImageUrl
                        ?.toLowerCase()
                        ?.includes("default") &&
                      user?.profileImageUrl !== ""
                    ? user?.profileImageUrl
                    : defaultUser
                })`,
              }}
              className={styles.image}
            >
              <div className={styles.fileInput}>
                <label htmlFor="file-input">
                  <AiOutlineEdit className="cursor-pointer" />
                </label>
                <input
                  className="hidden"
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          {/* Username */}
          <div className="w-full relative">
            <p className="text-lg font-semibold">Username</p>
            <input
              required
              minLength="3"
              maxLength="15"
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
            <p className="text-lg font-semibold">Name</p>
            <input
              required
              minLength="3"
              maxLength="20"
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
            <p className="text-lg font-semibold">About</p>
            <input
              required
              minLength="10"
              maxLength="130"
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
            <p className="text-lg font-semibold">Email</p>
            <input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={styles.input}
              type="email"
            />
          </div>

          {/* Categories */}
          <div className="w-full">
            <p className="text-lg font-semibold">
              Categories <small>(max 5)</small>{" "}
            </p>
            <div className="relative">
              <div className="w-full border-0 border-b border-gray-300 mt-2 text-sm flex items-center gap-1 flex-wrap pb-1">
                <button
                  onClick={() => setShowCategories(true)}
                  type="button"
                  className="border px-4 bg-black text-white rounded-md"
                >
                  Edit
                </button>
                {categories.length > 0 ? (
                  categories.map((ca) => (
                    <p
                      className="bg-gray-200 text-sm py-[1px] px-2 rounded-md"
                      key={ca}
                    >
                      {ca}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500 ml-2">No categories added</p>
                )}
              </div>
              {showCategories && (
                <>
                  <div
                    onClick={() => setShowCategories(false)}
                    className="fixed top-0 left-0 w-full h-full"
                  />
                  <div className="absolute bg-white bottom-0 right-0 w-3/4  pt-7 shadow-xl text-sm border rounded-md z-40">
                    <img
                      onClick={() => setShowCategories(false)}
                      className="absolute top-1 right-1 w-5 cursor-pointer"
                      src={cross}
                      alt=""
                    />
                    <div className="border mb-2 mx-2 rounded-md border-black pl-2 flex items-center overflow-hidden">
                      <BsSearch />
                      <input
                        value={filterKey}
                        placeholder="Type your keyword"
                        onChange={(e) => setFilterKey(e.target.value)}
                        className="p-1 pl-2 w-full outline-none text-sm"
                        type="text"
                      />
                    </div>
                    <div className="h-[300px] overflow-y-scroll scrollbar">
                      {filtered?.length < 1 && (
                        <p className="text-center text-gray-500 mt-5">
                          No category found
                        </p>
                      )}
                      {filtered.map((c) => (
                        <p
                          onClick={() =>
                            setCategories(
                              categories.includes(c)
                                ? categories.filter((i) => i !== c).slice(0, 5)
                                : [...categories, c].slice(0, 5)
                            )
                          }
                          style={{
                            backgroundColor: categories.includes(c)
                              ? "black"
                              : "white",
                            color: categories.includes(c) ? "white" : "black",
                          }}
                          className="cursor-pointer hover:bg-gray-200 px-2 py-1 my-1 mx-2 rounded-md"
                          key={c}
                        >
                          {c}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* DOB */}
          <div className="w-full">
            <p className="text-lg font-semibold">DOB</p>
            <input
              value={dateOfBirth}
              className={styles.input}
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div className="w-full">
            <p className="text-lg font-semibold">Gender</p>
            <div className="text-md flex items-center justify-between mt-2">
              <span className="flex gap-1">
                <input
                  onChange={() => setGender("Male")}
                  className="w-[18px] h-[20px]"
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
                  className="w-[18px] h-[20px]"
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
                  className="w-[18px] h-[20px]"
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
    </>
  );
};

export default Edit;
