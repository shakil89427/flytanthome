import { fetchAndActivate, getString } from "firebase/remote-config";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import moment from "moment";
import Newsletter from "../Components/Newsletter/Newsletter";

const BlogDetails = () => {
  const { blogsData, setBlogsData, remoteConfig, setNotify } = useStore();
  const [loading, setLoading] = useState(true);
  const [showNewsletter, setShowNewsleter] = useState(false);
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
    <div className="r-box py-14">
      {showNewsletter && <Newsletter setShowNewsleter={setShowNewsleter} />}
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="w-[95%] max-w-[1000px] mx-auto">
          <div
            style={{ lineHeight: "200%" }}
            className="flex flex-col gap-14 text-sm text-gray-600"
          >
            <div className="font-medium">
              <p className="text-black">5 min read</p>
              <p>Dec 2 2021</p>
            </div>
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black">
              New Market Strategy for Influencer Is becoming best before
              Influencers Worth it?
            </h1>
            <p>
              Influencer marketing has seen an upward growth curve ever since
              social media became an integral part of our lives. social media
              became an integral part of our lives. Influencer marketing has
              seen an upward growth curve ever since social media became an
              integral part of our lives. social media became an integral part
              of our lives. Influencer marketing has seen an upward growth curve
              ever since social media became an integral part of our lives.
              social media became an integral part of our lives.{" "}
            </p>
            <div
              style={{
                backgroundImage: `url(https://picsum.photos/200/300?random=1)`,
              }}
              className="w-full aspect-[11/5] bg-cover bg-no-repeat bg-center rounded-lg"
            />
            <p>
              Influencer marketing has seen an upward growth curve ever since
              social media became an integral part of our lives. social media
              became an integral part of our lives. Influencer marketing has
              seen an upward growth curve ever since social media became an
              integral part of our lives. social media became an integral part
              of our lives. Influencer marketing has seen an upward growth curve
              ever since social media became an integral part of our lives.
            </p>
            <p className="text-lg font-semibold text-black">
              New Market Strategy for Influencer Is becoming best before
              Influencers Worth it?
            </p>
            <p>
              An upward growth curve ever since social media became an integral
              part of our lives. social media became an integral part of our
              lives. Influencer marketing has seen an upward growth curve ever
              since social media became an integral part of our lives.{" "}
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div
                style={{
                  backgroundImage: `url(https://picsum.photos/200/300?random=2)`,
                }}
                className="w-full aspect-[10/8] bg-cover bg-no-repeat bg-center rounded-lg"
              />

              <div
                style={{
                  backgroundImage: `url(https://picsum.photos/200/300?random=3)`,
                }}
                className="w-full aspect-[10/8] bg-cover bg-no-repeat bg-center rounded-lg"
              />
            </div>
            <p>
              An upward growth curve ever since social media became an integral
              part of our lives. social media became an integral part of our
              lives. Influencer marketing has seen an upward growth curve ever
              since social media became an integral part of our lives.
            </p>
            <iframe
              className="w-full aspect-[11/5] rounded-lg"
              src="https://www.youtube.com/embed/i0Nxig4oTz8?autoplay=1"
              title="Flytant"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowNewsleter(true)}
              className="block mx-auto bg-black text-white px-8 py-3 rounded-full text-lg hover:scale-105 duration-150"
            >
              Subscribe newslatter
            </button>
            <p className="font-semibold text-black text-lg">More topics</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-24">
              {blogsData?.all?.map((item, index) => (
                <div key={item?.index} className="cursor-pointer">
                  <div
                    style={{
                      backgroundImage: `url(https://picsum.photos/200/300?random=${index})`,
                    }}
                    className="w-full aspect-[10/8] bg-cover bg-no-repeat bg-center rounded-2xl mb-5"
                  />
                  <div className="pr-5">
                    <p className="text-lg md:text-xl font-medium">
                      {item?.Title}
                    </p>
                    <p className="my-5 text-gray-500">
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
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
