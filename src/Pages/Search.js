import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "../Components/Spinner/Spinner";
import defaultUser from "../Assets/defaultUser.png";
import millify from "millify";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../Store/useStore";
import cross from "../Assets/cross.svg";

const selected = `px-1 text-center relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[3px] before:rounded-full text-black before:left-0`;

const Search = () => {
  const {
    searchKeyword,
    setSearchKeyword,
    searchCategories,
    setSearchCategories,
    searchActive,
    setSearchActive,
    searchResult,
    setSearchResult,
    searchImages,
    setSearchImages,
  } = useStore();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [showKeyword, setShowKeyword] = useState(searchKeyword);
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (searchActive === "All" || searchResult?.length < 1) {
      return setShowData(searchResult);
    }
    if (searchResult?.length > 0 && searchActive) {
      const filtered = searchResult?.filter(
        (item) => item?.category?.toLowerCase() === searchActive?.toLowerCase()
      );
      setShowData(filtered);
    }
  }, [searchResult, searchActive]);

  const getImage = async (url, randomId) => {
    try {
      const {
        data: { image },
      } = await axios.post("https://flytant.herokuapp.com/getimage", {
        url,
      });
      setSearchImages((prev) => {
        const newData = { ...prev };
        newData[randomId] = image;
        return newData;
      });
    } catch (err) {}
  };

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://flytant.herokuapp.com/search",
        {
          keyword: e.target[0].value,
        }
      );
      console.log(data);
      setSearchImages({});
      if (data?.length < 1) {
        setSearchCategories([]);
        setSearchActive(false);
        setSearchResult([]);
        setSearchKeyword(e.target[0].value);
        return setLoading(false);
      }
      let temp = ["All"];
      data.forEach((item) => {
        if (!temp?.includes(item?.category)) {
          temp.push(item?.category);
        }
        if (item?.category === "Instagram") {
          getImage(item?.profileImage, item?.randomId);
        }
      });
      setSearchCategories(temp);
      setSearchActive("All");
      setSearchResult(data);
      setSearchKeyword(e.target[0].value);
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
        style={{
          boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
        }}
        onSubmit={search}
        className=" rounded-full px-2 flex items-center w-full max-w-[800px] mx-auto overflow-hidden"
      >
        <input
          defaultValue={showKeyword}
          ref={inputRef}
          placeholder="Search influencer"
          type="text"
          className="w-full p-3 border-0 outline-none"
          required
        />
        <button
          onClick={() => setShowKeyword("")}
          type="reset"
          className="w-12 flex items-center justify-center"
        >
          <img src={cross} alt="" className="w-6" />
        </button>
        <button
          type="submit"
          className="border-l w-12 flex items-center justify-center"
        >
          <AiOutlineSearch className="text-2xl" />
        </button>
      </form>
      {loading && <Spinner />}
      {!loading && showData?.length < 1 && (
        <div className="text-center mt-10 font-medium text-gray-500">
          <p className="mb-2">No Data found</p>
          <p>Try searching "Influencers"</p>
        </div>
      )}
      {!loading && showData?.length > 0 && (
        <div>
          <div className="flex items-center justify-between w-full max-w-[600px] mx-auto mt-10 font-medium text-gray-500 text-lg lg:text-xl px-5">
            {searchCategories.map((item) => (
              <p
                key={item}
                onClick={() => searchActive !== item && setSearchActive(item)}
                className={
                  searchActive === item ? selected : "cursor-pointer px-1"
                }
              >
                {item}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 mt-10 max-w-[900px] mx-auto">
            {showData?.map((item) => (
              <div
                style={{
                  boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
                }}
                key={item?.randomId}
                className="px-5 py-3 lg:pr-20 rounded-lg border-gray-100 cursor-pointer"
              >
                {item?.category === "Instagram" && (
                  <div
                    onClick={() =>
                      navigate(`/search/details/instagram+${item?.username}`, {
                        state: { from: location },
                      })
                    }
                    className={`flex ${
                      item?.bio?.length > 0 ? "items-start" : "items-center"
                    } gap-3 md:gap-4 lg:gap-5 xl:gap-6`}
                  >
                    <div>
                      <div
                        style={{
                          backgroundImage: searchImages[item?.randomId]
                            ? `url(data:image/png;base64,${
                                searchImages[item?.randomId]
                              })`
                            : `url(${defaultUser})`,
                        }}
                        className="bg-cover bg-center bg-no-repeat w-12 md:w-16 aspect-square rounded-full border"
                      />
                    </div>
                    <div className="">
                      <p className="text-lg md:text-xl font-semibold mb-2">
                        {item?.username}
                      </p>
                      <p className="text-gray-500">{item?.bio}</p>
                      <div className="flex items-center gap-2 mt-2 font-medium">
                        {item?.followers && (
                          <p>{millify(item?.followers)} Followers,</p>
                        )}
                        {item?.following && (
                          <p>{millify(item?.following)} Following</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {item?.category === "Youtube" && (
                  <div
                    onClick={() =>
                      navigate(`/search/details/youtube+${item?.channelId}`, {
                        state: { from: location },
                      })
                    }
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
                        className="bg-cover bg-center bg-no-repeat w-12 md:w-16 aspect-square rounded-full border"
                      />
                    </div>
                    <div className="">
                      <p className="text-lg md:text-xl font-semibold mb-2">
                        {item?.channelTitle}
                      </p>
                      <p className="text-gray-500">{item?.description}</p>
                    </div>
                  </div>
                )}
                {item?.category === "Twitter" && (
                  <div
                    onClick={() =>
                      navigate(`/search/details/instagram+${item?.username}`, {
                        state: { from: location },
                      })
                    }
                    className={`flex ${
                      item?.description?.length > 0
                        ? "items-start"
                        : "items-center"
                    } gap-3 md:gap-4 lg:gap-5 xl:gap-6`}
                  >
                    <div>
                      <div
                        style={{
                          backgroundImage: item?.profile_image_url_https
                            ? `url(${item?.profile_image_url_https})`
                            : `url(${defaultUser})`,
                        }}
                        className="bg-cover bg-center bg-no-repeat w-12 md:w-16 aspect-square rounded-full border"
                      />
                    </div>
                    <div className="">
                      <p className="text-lg md:text-xl font-semibold mb-2">
                        {item?.name}
                      </p>
                      <p className="text-gray-500">{item?.description}</p>
                      <div className="flex items-center gap-2 mt-2 font-medium">
                        {item?.followers_count && (
                          <p>{millify(item?.followers_count)} Followers,</p>
                        )}
                        {item?.friends_count && (
                          <p>{millify(item?.friends_count)} Friends</p>
                        )}
                      </div>
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
