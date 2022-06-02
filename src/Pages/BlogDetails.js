import { fetchAndActivate, getString } from "firebase/remote-config";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import moment from "moment";
import Newsletter from "../Components/Newsletter/Newsletter";

const BlogDetails = () => {
  const { blogsData, setBlogsData, remoteConfig, setNotify } = useStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { id } = useParams();
  console.log(id);
  const [showNewsletter, setShowNewsleter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (blogsData?.length > 0) {
      setData(
        blogsData?.find(
          (item) => item?.blogNumber?.toString() === id.toString()
        )
      );
      window.scroll(0, 0);
    }
    setLoading((prev) => prev && !prev);
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
      const sorted = maped?.sort((a, b) => b?.creationDate - a?.creationDate);
      setBlogsData(sorted);
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      navigate("/");
    }
  };

  useEffect(() => {
    if (blogsData?.length < 1) {
      getConfigs();
    }
  }, []);

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
                    className="w-full aspect-[11/5] bg-cover bg-no-repeat bg-center rounded-lg"
                  />
                )}
                {item?.type === "heading" && (
                  <p className="text-xl font-semibold text-black">
                    {item?.title}
                  </p>
                )}
                {item?.type === "text" && (
                  <p style={{ lineHeight: "200%" }} className="text-xl">
                    {item?.title}
                  </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 mb-24">
              {blogsData?.map((item) => (
                <div
                  onClick={() =>
                    navigate(
                      `/blogdetails/${item?.blogNumber}?q=${item?.title}`,
                      { replace: true }
                    )
                  }
                  key={item?.blogNumber}
                  className="cursor-pointer"
                >
                  <div
                    style={{
                      backgroundImage: `url(${item?.imgUrl})`,
                    }}
                    className="w-full aspect-[10/8] bg-cover bg-no-repeat bg-center rounded-2xl mb-5"
                  />
                  <div className="pr-5">
                    <p className="text-lg md:text-xl font-medium">
                      {item?.title}
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
