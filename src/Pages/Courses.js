import React from "react";
import axios from "axios";
import { useEffect } from "react";
import useStore from "../Store/useStore";
import { Outlet } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";
import { useState } from "react";

const Courses = () => {
  const { user, setCourses } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://flytant.herokuapp.com/getcourse")
      .then(({ data }) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
