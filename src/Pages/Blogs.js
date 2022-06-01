import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import { fetchAndActivate, getString } from "firebase/remote-config";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Blogs = () => {
  const { blogsData, setBlogsData, remoteConfig, setNotify } = useStore();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  const getConfigs = async () => {
    try {
      if (blogsData?.all?.length > 0 && blogsData.carousel.length > 0) {
        return setLoading(false);
      }
      await fetchAndActivate(remoteConfig);
      const temp = JSON.parse(getString(remoteConfig, "blogs"));
      const sorted = temp?.sort((a, b) => a?.blogNumber - b?.blogNumber);
      const carouselTrue = sorted.filter((item) => item?.slider);
      const maped = carouselTrue?.map((item) => {
        const img = item?.content?.find((i) => i?.type === "image");
        return { ...item, imgUrl: img?.imgUrl, t: Math.random() };
      });
      setBlogsData({
        all: [...sorted, ...sorted, ...sorted],
        carousel: [...maped, ...maped, ...maped],
      });
      console.log(maped);
      setLoading(false);
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      navigate("/");
    }
  };

  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <div className="r-box py-20">
      {loading && (
        <div className="fixed top-0 left-0 inset-0 flex items-center justify center bg-[#c0bebe50] z-50">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="w-[95%] max-w-[1000px] mx-auto">
          <Swiper
            initialSlide={0}
            onSlideChange={(e) => setActive(e?.realIndex + 1)}
            pagination={true}
            modules={[Pagination]}
            className="rounded-lg"
          >
            {blogsData?.carousel?.map((item) => (
              <SwiperSlide key={item?.blogNumber}>
                <div
                  style={{
                    backgroundImage: `url(https://www.allaboutbirds.org/news/wp-content/uploads/2020/07/STanager-Shapiro-ML.jpg?page=Search)`,
                  }}
                  className="w-full aspect-[11/4] bg-cover bg-no-repeat bg-center"
                />
                <div className="my-10 flex items-start">
                  <p className="text-lg lg:text-xl font-medium w-8/12 md:w-9/12 lg:w-10/12 pr-10">
                    {item?.Title}
                  </p>
                  <div>
                    <p className="text-sm font-medium">
                      {Math.floor(item?.readTime / 60)} min read
                    </p>
                    <p className="text-xs text-gray-500">
                      {moment.unix(item?.creationDate).format("MMM DD YYYY")}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="absolute w-full aspect-[11/4] top-0 left-0">
              <div className="w-full h-[6px] md:h-[8px] lg:h-[10px] bg-gray-200 absolute top-full rounded-bl-lg rounded-br-lg z-20 overflow-hidden">
                <div
                  style={{
                    width: `${(active * 100) / blogsData?.carousel?.length}%`,
                  }}
                  className="absolute h-full bg-black duration-150"
                />
              </div>
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Blogs;
