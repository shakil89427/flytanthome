import React from "react";
import axios from "axios";
import { useEffect } from "react";
import useStore from "../Store/useStore";
import { Outlet } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";
import { useState } from "react";

const Courses = () => {
  const { user, course, setCourse } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!course?.title) {
      axios
        .get("https://arcane-castle-29935.herokuapp.com/getcourse")
        .then(({ data }) => {
          setCourse(data[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!course?.title) {
    return <p className="text-center mt-20">Something went wrong</p>;
  }

  return (
    <div className={user?.userId ? "" : "w-[95%] max-w-[1000px] mx-auto mt-10"}>
      <Outlet />
    </div>
  );
};

export default Courses;
