import React from "react";
import { useEffect } from "react";
import useStore from "../Store/useStore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { fetchAndActivate, getString } from "firebase/remote-config";
import { Outlet } from "react-router-dom";

const Courses = () => {
  const { user, remoteConfig, setCourses } = useStore();
  const db = getFirestore();

  const getFromDb = async () => {
    try {
      const colRef = collection(db, "courses");
      const { docs } = await getDocs(colRef);
      const valid = docs.map((doc) => doc.data());
      setCourses(valid);
    } catch (err) {}
  };
  const getFromConfig = async () => {
    try {
      await fetchAndActivate(remoteConfig);
      const data = JSON.parse(getString(remoteConfig, "courses"));
      setCourses(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (user?.userId) {
      getFromDb();
    } else {
      getFromConfig();
    }
  }, [user]);

  return (
    <div className={user?.userId ? "" : "w-[95%] max-w-[1000px] mx-auto mt-10"}>
      <Outlet />
    </div>
  );
};

export default Courses;
