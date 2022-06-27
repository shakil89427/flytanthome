import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import Spinner from "../Components/Spinner/Spinner";
import defaultUser from "../Assets/defaultUser.png";
import millify from "millify";

const selected = `px-1 text-center relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[3px] before:rounded-full text-black before:left-0`;

const Search = () => {
  const inputRef = useRef();
  const [result, setResult] = useState([]);
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);
  const [base64Images, setBase64Images] = useState({});

  useEffect(() => {
    if (active === "All") {
      setShowData(result);
    } else {
      const filtered = result.filter(
        (item) => item?.category?.toLowerCase() === active?.toLowerCase()
      );
      setShowData(filtered);
    }
  }, [result, active]);

  const getImage = async (url, randomId) => {
    try {
      const {
        data: { image },
      } = await axios.post("https://flytant.herokuapp.com/getimage", {
        url,
      });
      setBase64Images((prev) => {
        const newData = { ...prev };
        newData[randomId] = image;
        return newData;
      });
    } catch (err) {}
  };

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult([]);
    try {
      const { data } = await axios.post(
        "https://flytant.herokuapp.com/search",
        {
          keyword: e.target[0].value,
        }
      );
      let temp = ["All"];
      data.forEach((item) => {
        if (!temp.includes(item?.category)) {
          temp.push(item?.category);
        }
        if (item?.category === "Instagram") {
          getImage(item?.profileImage, item?.randomId);
        }
      });
      setCategories(temp);
      setActive("All");
      setResult(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="r-box pt-10 pb-32">
      <form
        onSubmit={search}
        className="border border-black rounded-full pl-5 flex items-center overflow-hidden w-full max-w-[1000px] mx-auto"
      >
        <BiSearch className="text-2xl" />
        <input
          ref={inputRef}
          placeholder="Search influencer"
          type="text"
          className="w-full p-2 border-0 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-center w-[20%] min-w-[100px] py-3 font-medium"
        >
          Search
        </button>
      </form>
      {loading && <Spinner />}
      {!loading && showData?.length < 1 && (
        <p className="text-center mt-10 font-medium">No Data found</p>
      )}
      {!loading && showData?.length > 0 && (
        <div>
          <div className="flex items-center justify-between w-full max-w-[700px] mx-auto mt-10 font-medium text-gray-500 text-lg lg:text-xl px-5">
            {categories.map((item) => (
              <p
                key={item}
                onClick={() => active !== item && setActive(item)}
                className={active === item ? selected : "cursor-pointer px-1"}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-10 mt-10">
            {showData?.map((item) => (
              <div
                key={item?.randomId}
                className="shadow-lg p-5 border-t rounded-lg border-gray-100"
              >
                {item?.category === "Instagram" && (
                  <div
                    className={`flex ${
                      item?.bio?.length > 0 ? "items-start" : "items-center"
                    } gap-3 md:gap-4 lg:gap-5 xl:gap-6`}
                  >
                    <div>
                      <div
                        style={{
                          backgroundImage: base64Images[item?.randomId]
                            ? `url(data:image/png;base64,${
                                base64Images[item?.randomId]
                              })`
                            : `url(${defaultUser})`,
                        }}
                        className="bg-cover bg-center bg-no-repeat w-14 md:w-20 lg:w-24 xl:w-32 aspect-square rounded-full border"
                      />
                    </div>
                    <div className="">
                      <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
                        {item?.username}
                      </p>
                      <p className="text-gray-500">{item?.bio}</p>
                      <p className="mt-2 font-medium">
                        {millify(item?.followers)} Followers,{" "}
                        {millify(item?.following)} Following
                      </p>
                    </div>
                  </div>
                )}
                {item?.category === "Youtube" && (
                  <div
                    className={`flex ${
                      item?.description?.length > 0
                        ? "items-start"
                        : "items-center"
                    } gap-3 md:gap-4 lg:gap-5 xl:gap-6`}
                  >
                    <div>
                      <div
                        style={{
                          backgroundImage: `url(${item?.thumbnails?.default?.url})`,
                        }}
                        className="bg-cover bg-center bg-no-repeat w-14 md:w-20 lg:w-24 xl:w-32 aspect-square rounded-full border"
                      />
                    </div>
                    <div className="">
                      <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
                        {item?.channelTitle}
                      </p>
                      <p className="text-gray-500">{item?.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
