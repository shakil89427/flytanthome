import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import { fetchAndActivate, getString } from "firebase/remote-config";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Blogs = () => {
  const {
    blogsData,
    setBlogsData,
    remoteConfig,
    setNotify,
    loaded,
    setLoaded,
  } = useStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getConfigs = async () => {
    try {
      await fetchAndActivate(remoteConfig);
      const temp = JSON.parse(getString(remoteConfig, "blogs"));
      const maped = temp?.map((item) => {
        const imgUrl = item?.content?.find((i) => i?.type === "image");
        const text = item?.content?.find((i) => i?.type === "text");
        return { ...item, imgUrl: imgUrl?.imgUrl, text: text.title };
      });
      const all = maped?.sort((a, b) => b?.creationDate - a?.creationDate);
      const carousel = all.filter((item) => item.slider);
      const notCarousel = all.filter((item) => !item.slider);
      setBlogsData({ all, carousel, notCarousel });
      setLoaded(notCarousel.slice(0, 5));
      setLoading(false);
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      navigate("/");
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (blogsData?.all?.length < 1) {
      getConfigs();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="r-box pt-20 pb-32">
      {loading && (
        <div className="fixed top-0 left-0 inset-0 flex items-center justify center bg-[#c0bebe50] z-50">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="w-[95%] max-w-[1000px] mx-auto">
          <Swiper
            speed={600}
            autoplay={{ delay: 6000 }}
            pagination={true}
            modules={[Pagination, Autoplay]}
          >
            {blogsData?.carousel?.map((item) => (
              <SwiperSlide
                onClick={() =>
                  navigate(`/blogdetails/${item?.blogNumber}?q=${item?.title}`)
                }
                className="cursor-pointer"
                key={item?.blogNumber}
              >
                <div
                  style={{
                    backgroundImage: `url(${item?.imgUrl})`,
                  }}
                  className="w-full aspect-[11/5] bg-cover bg-no-repeat bg-center rounded-lg"
                />
                <div className="mt-8 mb-12 flex items-start">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold w-9/12 md:w-10/12 xl:w-11/12 pr-10">
                    {item?.title}
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

          <div className="grid grid-cols-12 gap-x-8 gap-y-24 py-24">
            {loaded?.map((item, index) => (
              <div
                onClick={() =>
                  navigate(`/blogdetails/${item?.blogNumber}?q=${item?.title}`)
                }
                key={item?.blogNumber}
                className={`col-span-12 md:col-span-6 cursor-pointer ${
                  index < 2 ? "lg:col-span-6" : "lg:col-span-4"
                }`}
              >
                <div className="w-full flex flex-col justify-between h-full">
                  <div>
                    <div
                      style={{
                        backgroundImage: `url(${item?.imgUrl})`,
                      }}
                      className="w-full aspect-[10/8] bg-cover bg-no-repeat bg-center rounded-lg mb-5"
                    />
                    <p className="text-lg font-medium lg:font-semibold pr-10">
                      {item?.title}
                    </p>
                    <p
                      style={{ lineHeight: "200%" }}
                      className="my-5 text-gray-500 text-lg"
                    >
                      {item.text.slice(0, 90)} ...
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium mt-5">
                    <p className="text-gray-500">
                      {moment.unix(item?.creationDate).format("MMM DD YYYY")}
                    </p>
                    <p>{Math.floor(item?.readTime / 60)} min read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {blogsData?.notCarousel?.length > loaded?.length && (
            <button
              onClick={() =>
                setLoaded((prev) =>
                  blogsData?.notCarousel?.slice(0, prev?.length + 3)
                )
              }
              className="bg-black text-white px-8 py-3 rounded-full block mx-auto hover:scale-105 duration-150"
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
