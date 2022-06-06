import { fetchAndActivate, getString } from "firebase/remote-config";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import moment from "moment";
import Newsletter from "../Components/Newsletter/Newsletter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const BlogDetails = () => {
  const { blogsData, setBlogsData, remoteConfig, setNotify, setLoaded } =
    useStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { id } = useParams();
  const [showNewsletter, setShowNewsleter] = useState(false);
  const navigate = useNavigate();
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (blogsData?.all?.length > 0) {
      const temp = blogsData?.all?.find((item) => item?.blogId === id);
      setData(temp);
      window.scroll(0, 0);
      setLoading((prev) => prev && !prev);
    }
  }, [blogsData, id]);

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
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      navigate("/");
    }
  };

  useEffect(() => {
    if (blogsData?.all?.length < 1) {
      getConfigs();
    }
  }, []);

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div className="r-box py-14">
      {showNewsletter && <Newsletter setShowNewsleter={setShowNewsleter} />}
      {loading && <Spinner />}
      {!loading && data?.title && (
        <div className="w-[95%] max-w-[900px] mx-auto">
          <div
            style={{ lineHeight: "200%" }}
            className="flex flex-col gap-14 text-lg text-gray-600"
          >
            <div className="font-medium text-sm">
              <p className="text-black">
                {Math.floor(data?.readTime / 60)} min read
              </p>
              <p>{moment.unix(data?.creationDate).format("MMM DD YYYY")}</p>
            </div>
            <h1
              style={{ lineHeight: "150%" }}
              className="text-xl lg:text-2xl xl:text-4xl font-bold text-black"
            >
              {data?.title}
            </h1>
            {data?.content?.map((item, index) => (
              <div key={index}>
                {item?.type === "image" && (
                  <div
                    style={{
                      backgroundImage: `url(${item?.imgUrl})`,
                    }}
                    className="w-full aspect-[11/7] md:aspect-[11/5] bg-cover bg-no-repeat bg-center rounded-lg"
                  />
                )}
                {item?.type === "heading" && (
                  <p className="text-xl font-semibold text-black">
                    {item?.title}
                  </p>
                )}
                {item?.type === "text" && (
                  <p
                    style={{ lineHeight: "200%" }}
                    className="text-lg md:text-xl"
                  >
                    {item?.title}
                  </p>
                )}
                {item?.type === "video" && (
                  <iframe
                    className="w-full aspect-[11/7] md:aspect-[11/5] rounded-lg"
                    src={item?.url}
                    title="Flytant"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            ))}

            <button
              onClick={() => setShowNewsleter(true)}
              className="block mx-auto bg-black text-white px-8 py-3 rounded-full text-lg hover:scale-105 duration-150"
            >
              Subscribe newsletter
            </button>
            <p className="font-semibold text-black text-lg">More topics</p>
            <div className="mb-24 relative">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: nextRef?.current,
                  prevEl: prevRef?.current,
                }}
                onSwiper={setSwiper}
                slidesPerView={1.2}
                onSlideChange={(e) => setActiveSlide(e.realIndex)}
                spaceBetween={20}
                breakpoints={{
                  640: {
                    slidesPerView: 2.2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {blogsData?.all?.map((item) => (
                  <SwiperSlide
                    onClick={() =>
                      navigate(`/blogdetails/${item?.blogId}`, {
                        replace: true,
                      })
                    }
                    key={item?.blogId}
                    className="cursor-pointer"
                  >
                    <div className="w-full min-h-[530px] flex flex-col justify-between">
                      <div>
                        <div
                          style={{
                            backgroundImage: `url(${item?.imgUrl})`,
                          }}
                          className="w-full aspect-[10/8] bg-cover bg-no-repeat bg-center rounded-2xl mb-5"
                        />
                        <p className="text-lg text-black font-semibold pr-10">
                          {item?.title}
                        </p>
                        <p
                          style={{ lineHeight: "170%" }}
                          className="my-5 text-gray-500 text-md pr-5"
                        >
                          {item.text.slice(0, 80)} ...
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm font-medium pr-5">
                        <p className="text-gray-500">
                          {moment
                            .unix(item?.creationDate)
                            .format("MMM DD YYYY")}
                        </p>
                        <p>{Math.floor(item?.readTime / 60)} min read</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                className={`hidden lg:block absolute top-[20%] left-0 cursor-pointer rounded-full shadow-2xl z-20 bg-white border-4  -translate-x-1/2 select-none border-white ${
                  activeSlide > 0 ? "visible" : "invisible"
                }`}
                ref={prevRef}
              >
                <BsArrowLeftCircle className="text-5xl " />
              </div>
              <div
                className={`hidden lg:block absolute top-[20%] right-0 cursor-pointer rounded-full shadow-2xl z-20 bg-white border-4 translate-x-1/2 select-none border-white ${
                  activeSlide + 3 < blogsData?.all?.length
                    ? "visible"
                    : "invisible"
                }`}
                ref={nextRef}
              >
                <BsArrowRightCircle className="text-5xl" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
