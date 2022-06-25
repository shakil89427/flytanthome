import React from "react";
import { useEffect } from "react";
import useStore from "../Store/useStore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { fetchAndActivate, getString } from "firebase/remote-config";
import { Outlet } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";
import { useState } from "react";

const Courses = () => {
  const { user, remoteConfig, setCourses } = useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  const getFromDb = async () => {
    try {
      const colRef = collection(db, "courses");
      const { docs } = await getDocs(colRef);
      const valid = docs.map((doc) => doc.data());
      setCourses(valid);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const getFromConfig = async () => {
    try {
      await fetchAndActivate(remoteConfig);
      const data = await JSON.parse(getString(remoteConfig, "courses"));
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (user?.userId) {
      getFromDb();
    } else {
      getFromConfig();
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={user?.userId ? "" : "w-[95%] max-w-[1000px] mx-auto mt-10"}>
      <Outlet />
    </div>
  );
};

export default Courses;
