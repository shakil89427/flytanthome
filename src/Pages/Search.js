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
import useAnalytics from "../Hooks/useAnalytics";

const selected = `px-1 text-center relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[3px] before:rounded-full text-black before:left-0`;

const Search = () => {
  const {
    searchKeyword,
    setSearchKeyword,
    activeCategory,
    setActiveCategory,
    instagramResults,
    setInstagramResults,
    youtubeResults,
    setYoutubeResults,
    twitterResults,
    setTwitterResults,
    searchImages,
    setSearchImages,
  } = useStore();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [keyword, setKeyword] = useState(searchKeyword);
  const [loading, setLoading] = useState(false);
  const searchCategories = ["All", "Instagram", "Youtube", "Twitter"];
  const location = useLocation();
  const { addLog } = useAnalytics();

  const getImage = async (url, randomId) => {
    try {
      const {
        data: { image },
      } = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/getimage",
        {
          url,
        }
      );
      setSearchImages((prev) => {
        const newData = { ...prev };
        newData[randomId] = image;
        return newData;
      });
    } catch (err) {}
  };

  const instagramSearch = async (start) => {
    try {
      addLog("instagram_next_or_prev");
      setLoading(true);
      const { data } = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/search/instagram",
        { keyword: searchKeyword, start }
      );
      setInstagramResults(data);
      setLoading(false);
      window.scroll(0, 0);
      data?.data?.forEach(({ profileImage, randomId }) =>
        getImage(profileImage, randomId)
      );
    } catch (err) {
      setLoading(false);
    }
  };

  const youtubeSearch = async (pageToken) => {
    try {
      addLog("youtube_next_or_prev");
      setLoading(true);
      const { data } = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/search/youtube",
        { keyword: searchKeyword, pageToken }
      );
      setYoutubeResults(data);
      setLoading(false);
      window.scroll(0, 0);
    } catch (err) {
      setLoading(false);
    }
  };

  const twitterSearch = async (page) => {
    try {
      addLog("twitter_next_or_prev");
      setLoading(true);
      const { data } = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/search/twitter",
        { keyword: searchKeyword, page }
      );
      setTwitterResults(data);
      setLoading(false);
      window.scroll(0, 0);
    } catch (err) {
      setLoading(false);
    }
  };

  const search = (e, option) => {
    e && e.preventDefault();
    addLog("search");
    let promises = [];
    if (!option || option?.instagram) {
      promises.push(
        axios.post(
          "https://arcane-castle-29935.herokuapp.com/search/instagram",
          {
            keyword,
            start: option?.instagram || 1,
          }
        )
      );
    }
    if (!option || option?.youtube) {
      promises.push(
        axios.post("https://arcane-castle-29935.herokuapp.com/search/youtube", {
          keyword,
          pageToken: option?.youtube || "",
        })
      );
    }
    if (!option || option?.twitter) {
      promises.push(
        axios.post("https://arcane-castle-29935.herokuapp.com/search/twitter", {
          keyword,
          page: option?.twitter || 1,
        })
      );
    }

    if (promises?.length < 1) return;
    setLoading(true);
    Promise.allSettled(promises)
      .then((res) => {
        let success = false;
        res?.forEach(({ status, value }) => {
          if (status === "fulfilled") {
            success = true;
            if (value?.data?.category === "Instagram") {
              value?.data?.data?.forEach(({ profileImage, randomId }) =>
                getImage(profileImage, randomId)
              );
              setInstagramResults(value?.data);
            }
            if (value?.data?.category === "Youtube") {
              setYoutubeResults(value?.data);
            }
            if (value?.data?.category === "Twitter") {
              setTwitterResults(value?.data);
            }
          }
        });
        if (success && !option) {
          setSearchKeyword(keyword);
        }
        setLoading(false);
        window.scroll(0, 0);
      })
      .catch(() => setLoading(false));
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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          ref={inputRef}
          placeholder="Search 'Fashion Influencers' or 'Brand name'"
          type="text"
          className="w-full p-3 border-0 outline-none"
          required
        />
        <button
          onClick={() => setKeyword("")}
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
      {loading && (
        <div className="fixed top-0 left-0 inset-0 flex items-center justify-center z-[999] bg-[#807e7e25]">
          <Spinner />
        </div>
      )}
      {searchKeyword?.length > 0 && (
        <div className="flex items-center justify-between w-full max-w-[600px] mx-auto mt-10 font-medium text-gray-500 text-lg lg:text-xl px-5 mb-10">
          {searchCategories?.map((item) => (
            <p
              key={item}
              onClick={() => activeCategory !== item && setActiveCategory(item)}
              className={
                activeCategory === item ? selected : "cursor-pointer px-1"
              }
            >
              {item}
            </p>
          ))}
        </div>
      )}
      {(activeCategory === "All" || activeCategory === "Instagram") && (
        <div className="grid grid-cols-1 gap-5 mb-5 max-w-[900px] mx-auto">
          {(activeCategory === "All"
            ? instagramResults?.data?.slice(0, 5)
            : instagramResults?.data
          )?.map((item) => (
            <div
              style={{
                boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
              }}
              key={item?.randomId}
              className="px-5 py-3 lg:pr-20 rounded-lg border-gray-100 cursor-pointer"
            >
              <div
                onClick={() => {
                  addLog("instagram_searched_profile_visit");
                  navigate(`/search/details/instagram+${item?.username}`, {
                    state: { from: location },
                  });
                }}
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
                      <p>{millify(item?.followers || 0)} Followers,</p>
                    )}
                    {item?.following && (
                      <p>{millify(item?.following || 0)} Following</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activeCategory === "Instagram" && (
            <div className="flex items-center justify-center mt-10 gap-10">
              {instagramResults?.prev && (
                <p
                  onClick={() => instagramSearch(instagramResults?.prev)}
                  className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
                >
                  Prev
                </p>
              )}
              {instagramResults?.next && (
                <p
                  onClick={() => instagramSearch(instagramResults?.next)}
                  className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
                >
                  Next
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {(activeCategory === "All" || activeCategory === "Youtube") && (
        <div className="grid grid-cols-1 gap-5 mb-5 max-w-[900px] mx-auto">
          {(activeCategory === "All"
            ? youtubeResults?.data?.slice(0, 5)
            : youtubeResults?.data
          )?.map((item) => (
            <div
              style={{
                boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
              }}
              key={item?.randomId}
              className="px-5 py-3 lg:pr-20 rounded-lg border-gray-100 cursor-pointer"
            >
              <div
                onClick={() => {
                  addLog("youtube_searched_profile_visit");
                  navigate(`/search/details/youtube+${item?.channelId}`, {
                    state: { from: location },
                  });
                }}
                className={`flex ${
                  item?.description?.length > 0 ? "items-start" : "items-center"
                } gap-3 md:gap-4 lg:gap-5 xl:gap-6`}
              >
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${
                        item?.thumbnails?.default?.url || defaultUser
                      })`,
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
            </div>
          ))}
          {activeCategory === "Youtube" && (
            <div className="flex items-center justify-center mt-10 gap-10">
              {youtubeResults?.prev && (
                <p
                  onClick={() => youtubeSearch(youtubeResults?.prev)}
                  className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
                >
                  Prev
                </p>
              )}
              {youtubeResults?.next && (
                <p
                  onClick={() => youtubeSearch(youtubeResults?.next)}
                  className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
                >
                  Next
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {(activeCategory === "All" || activeCategory === "Twitter") && (
        <div className="grid grid-cols-1 gap-5 mb-5 max-w-[900px] mx-auto">
          {(activeCategory === "All"
            ? twitterResults?.data?.slice(0, 5)
            : twitterResults?.data
          )?.map((item) => (
            <div
              style={{
                boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
              }}
              key={item?.randomId}
              className="px-5 py-3 lg:pr-20 rounded-lg border-gray-100 cursor-pointer"
            >
              <div
                onClick={() => {
                  addLog("twitter_searched_profile_visit");
                  navigate(`/search/details/twitter+${item?.screen_name}`, {
                    state: { from: location },
                  });
                }}
                className={`flex ${
                  item?.description?.length > 0 ? "items-start" : "items-center"
                } gap-3 md:gap-4 lg:gap-5 xl:gap-6`}
              >
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${
                        item?.profile_image_url_https || defaultUser
                      })`,
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
                      <p>{millify(item?.followers_count || 0)} Followers,</p>
                    )}
                    {item?.friends_count && (
                      <p>{millify(item?.friends_count || 0)} Following</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activeCategory === "Twitter" && (
            <div className="flex items-center justify-center mt-10 gap-10">
              {twitterResults?.prev && (
                <p
                  onClick={() => twitterSearch(twitterResults?.prev)}
                  className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
                >
                  Prev
                </p>
              )}
              {twitterResults?.next && (
                <p
                  onClick={() => twitterSearch(twitterResults?.next)}
                  className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
                >
                  Next
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {activeCategory === "All" && (
        <div className="flex items-center justify-center mt-10 gap-10">
          {(instagramResults?.prev ||
            youtubeResults?.prev ||
            twitterResults?.prev) && (
            <p
              onClick={() =>
                search(false, {
                  instagram: instagramResults?.prev,
                  youtube: youtubeResults?.prev,
                  twitter: twitterResults?.prev,
                })
              }
              className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
            >
              Prev
            </p>
          )}
          {(instagramResults?.next ||
            youtubeResults?.next ||
            twitterResults?.next) && (
            <p
              onClick={() =>
                search(false, {
                  instagram: instagramResults?.next,
                  youtube: youtubeResults?.next,
                  twitter: twitterResults?.next,
                })
              }
              className="bg-black text-white py-2 px-5 rounded-md font-medium cursor-pointer"
            >
              Next
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
