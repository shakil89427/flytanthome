import React, { useEffect, useState } from "react";
import cross from "../../Assets/cross.svg";
import useStore from "../../Store/useStore";
import like from "../../Assets/news/Like.png";
import liked from "../../Assets/news/Liked.png";
import comment from "../../Assets/news/Comment.png";
import {
  getFirestore,
  doc,
  increment,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import Comment from "./Comment";
import Spinner from "../Spinner/Spinner";

const NewsCard = () => {
  const {
    showSingleCard,
    setShowSingleCard,
    allNews,
    setAllNews,
    user,
    setUser,
  } = useStore();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const db = getFirestore();

  const inCrease = async (newsId) => {
    // Update to Local
    const updatedNews = { ...data, likeCount: data?.likeCount + 1 };
    const mergedNews = allNews.data.map((data) =>
      data.id === newsId ? updatedNews : data
    );
    setAllNews((prev) => ({ ...prev, data: mergedNews }));
    setUser((prev) => ({
      ...prev,
      likedNews: prev?.likedNews ? [...prev?.likedNews, newsId] : [newsId],
    }));
    setData(updatedNews);
    // Update to DB
    const newsRef = doc(db, "news", showSingleCard);
    const userRef = doc(db, "users", user?.userId);
    await updateDoc(newsRef, {
      likeCount: increment(1),
    });
    await updateDoc(userRef, {
      likedNews: arrayUnion(newsId),
    });
  };

  const deCrease = async (newsId) => {
    // Update to Local
    const updatedNews = { ...data, likeCount: data?.likeCount - 1 };
    const mergedNews = allNews.data.map((data) =>
      data.id === showSingleCard ? updatedNews : data
    );
    const updatedUser = user?.likedNews?.filter((data) => data !== newsId);
    setAllNews((prev) => ({ ...prev, data: mergedNews }));
    setUser((prev) => ({ ...prev, likedNews: updatedUser }));
    setData(updatedNews);
    // Update to DB
    const newsRef = doc(db, "news", showSingleCard);
    const userRef = doc(db, "users", user?.userId);
    await updateDoc(newsRef, {
      likeCount: increment(-1),
    });
    await updateDoc(userRef, {
      likedNews: arrayRemove(newsId),
    });
  };

  const getData = async () => {
    try {
      const newsRef = doc(db, "news", showSingleCard);
      const response = await getDoc(newsRef);
      setData({ ...response.data(), id: response.id });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "auto");
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 top-0 left-0 bg-[#030303f6] z-30 flex items-center justify-center">
        <img
          onClick={() => setShowSingleCard(false)}
          className="bg-[#ffffff86] absolute top-8 right-8 w-5 md:w-7 lg:w-9 rounded-full cursor-pointer hover:bg-white"
          src={cross}
          alt=""
        />
        <div className="p-5">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!data?.id) {
    return setShowSingleCard(false);
  }

  return (
    <>
      <div className="fixed inset-0 top-0 left-0 bg-[#030303f6] z-30 flex items-center justify-center">
        <img
          onClick={() => setShowSingleCard(false)}
          className="bg-[#ffffff86] absolute top-4 right-4 lg:top-8 lg:right-8 w-5 md:w-7 lg:w-9 rounded-full cursor-pointer hover:bg-white"
          src={cross}
          alt=""
        />
        <div className="flex flex-col justify-between w-[95%] max-w-[450px] h-[80vh] bg-white rounded-md overflow-hidden relative">
          <div className="w-full overflow-y-scroll scrollbar">
            <div
              style={{
                backgroundImage: `url("${data?.blob[0]?.path}")`,
              }}
              className="bg-cover bg-center bg-no-repeat aspect-[7/4]"
            />

            <div className="px-5">
              <p className="font-semibold mt-2 text-lg">{data?.title}</p>
              <p style={{ lineHeight: "200%" }} className="mt-2 text-sm">
                {data?.description}
              </p>
            </div>
          </div>

          <div className="p-2">
            <div className="flex datas-center justify-center gap-7 font-medium">
              <div className="flex datas-center justify-center gap-1 ">
                <img
                  onClick={() =>
                    user?.likedNews?.includes(data?.id)
                      ? deCrease(data?.id)
                      : inCrease(data?.id)
                  }
                  src={user?.likedNews?.includes(data?.id) ? liked : like}
                  className="cursor-pointer w-8"
                  alt=""
                />

                <p>{data?.likeCount}</p>
              </div>
              <div className="flex datas-center justify-center gap-1">
                <img
                  onClick={() => setShowComment(data?.id)}
                  className="cursor-pointer w-8"
                  src={comment}
                  alt=""
                />
                <p>{data?.commentCount}</p>
              </div>
            </div>
          </div>
          {showComment && (
            <Comment
              setShowComment={setShowComment}
              newsId={data?.id}
              setData={setData}
            />
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default NewsCard;
