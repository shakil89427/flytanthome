import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Instagram from "./Instagram";
import Youtube from "./Youtube";

const Details = () => {
  const { info } = useParams();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState(false);
  const [keyword, setKeyword] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.from?.pathname !== "/search") return navigate("/");
    const mainInfo = info?.split("+");
    if (mainInfo?.length < 2) navigate(-1);
    setPlatform(mainInfo[0]);
    setKeyword(mainInfo[1]);
  }, [info]);

  if (platform === "instagram") return <Instagram username={keyword} />;
  if (platform === "youtube") return <Youtube channelId={keyword} />;
};

export default Details;
