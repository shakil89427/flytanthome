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
  const navigate = useNavigate();

  const getConfigs = async () => {
    try {
      if (blogsData?.all?.length > 0 && blogsData.carousel.length > 0) {
        setLoading(false);
        return window.scroll(0, 0);
      }
      await fetchAndActivate(remoteConfig);
      const temp = JSON.parse(getString(remoteConfig, "blogs"));
      const maped = temp?.map((item) => {
        const imgUrl = item?.content?.find((i) => i?.type === "image");
        const text = item?.content?.find((i) => i?.type === "text");
        return { ...item, imgUrl: imgUrl?.imgUrl, text: text.title };
      });
      const sorted = maped?.sort((a, b) => a?.blogNumber - b?.blogNumber);
      const carousel = sorted?.filter((item) => item.slider);
      setBlogsData({ all: sorted, carousel });
      setLoading(false);
      window.scroll(0, 0);
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
            spaceBetween={5}
            initialSlide={0}
            pagination={true}
            modules={[Pagination]}
          >
            {blogsData?.carousel?.map((item) => (
              <SwiperSlide
                onClick={() => navigate(`/blogdetails/${item?.blogNumber}`)}
                className="cursor-pointer"
                key={item?.blogNumber}
              >
                <div
                  style={{
                    backgroundImage: `url(https://picsum.photos/200/300?random=${item?.blogNumber})`,
                  }}
                  className="w-full aspect-[11/5] bg-cover bg-no-repeat bg-center rounded-lg"
                />
                <div className="mt-8 mb-12 flex items-start">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold w-9/12 md:w-10/12 xl:w-11/12 pr-10">
                    {item?.Title}
                  </p>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      {Math.floor(item?.readTime / 60)} min read
                    </p>
                    <p className="text-xs text-gray-500">
                      {moment.unix(item?.creationDate).format("MMM DD YYYY")}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="grid grid-cols-12 gap-x-5 gap-y-24 py-24">
            {blogsData?.all?.map((item, index) => (
              <div
                onClick={() => navigate(`/blogdetails/${item?.blogNumber}`)}
                key={item?.blogNumber}
                className={
                  index < 2
                    ? "col-span-12 md:col-span-6 lg:col-span-6 cursor-pointer"
                    : "col-span-12 md:col-span-6 lg:col-span-4 cursor-pointer"
                }
              >
                <div
                  style={{
                    backgroundImage: `url(https://picsum.photos/200/300?random=${index})`,
                  }}
                  className="w-full aspect-[10/8] bg-cover bg-no-repeat bg-center rounded-xl mb-5"
                />
                <div className="pr-5">
                  <p className="text-lg md:text-xl lg:text-2xl font-medium lg:font-semibold">
                    {item?.Title}
                  </p>
                  <p className="my-5 text-gray-500 text-xl">
                    {item.text.slice(0, 150)}
                  </p>
                  <div className="flex items-center justify-between text-sm font-medium mt-10">
                    <p className="text-gray-500">
                      {moment.unix(item?.creationDate).format("MMM DD YYYY")}
                    </p>
                    <p>{Math.floor(item?.readTime / 60)} min read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
