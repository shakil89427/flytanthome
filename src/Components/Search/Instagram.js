import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import defaultUser from "../../Assets/defaultUser.png";

const Instagram = ({ username }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [images, setImages] = useState({ fetched: false });

  const getImage = async (url, id) => {
    try {
      const {
        data: { image },
      } = await axios.post("https://flytant.herokuapp.com/getimage", {
        url,
      });
      setImages((prev) => {
        const newData = { ...prev };
        newData[id] = image;
        return newData;
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (info?.profile_pic_url && !images?.fetched) {
      setImages({ fetched: true });
      getImage(info?.profile_pic_url, "profileImg");
      info?.edge_owner_to_timeline_media?.edges?.forEach((item) => {
        if (item?.node?.thumbnail_src) {
          getImage(item?.node?.thumbnail_src, item?.node?.id);
        }
      });
    }
  }, [info, images]);

  useEffect(() => {
    axios
      .post("https://flytant.herokuapp.com/instagramsearch", { username })
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(() => navigate(-1));
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1100px] px-5 gap-y-10 mx-auto pb-24">
      {/* Left */}
      <div className="lg:pr-5 pt-5">
        <div className="flex items-start gap-5  ">
          <div className="flex items-start gap-3">
            <div>
              <div
                style={{
                  backgroundImage: images?.profileImg
                    ? `url(data:image/png;base64,${images?.profileImg})`
                    : `url(${defaultUser})`,
                }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-center bg-no-repeat bg-cover"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 break-words">
              {info?.full_name}
            </p>
          </div>
          <div className="border w-[65px] aspect-square rounded-full flex items-center justify-center mb-3 text-3xl border-gray-400">
            0
          </div>
        </div>
        <button></button>
      </div>

      {/* Right */}
      <div className="lg:pl-5 lg:border-l pt-5">
        <p className="text-2xl font-semibold mt-3">Social Accounts</p>
      </div>
    </div>
  );
};

export default Instagram;
