import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, userLoading } = useStore();

  if (userLoading) return <div className="spinner mx-auto my-24" />;

  if (!user?.userId) return navigate("/");

  return children;
};

export default PrivateRoute;
