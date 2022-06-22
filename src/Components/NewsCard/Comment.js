import React from "react";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { MdSend } from "react-icons/md";
import moment from "moment";
import Spinner2 from "../Spinner/Spinner2";

const Comment = ({ setShowComment, newsId }) => {
  const { user, allNews, setAllNews } = useStore();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingComment, setAddingComment] = useState(false);
  const [translate, setTranslate] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "news", newsId, "comments");

  const addComment = async (e) => {
    e.preventDefault();
    setAddingComment(true);
    try {
      const commentData = {
        comment: e.target[0].value,
        creationDate: moment().unix(),
        userId: user.userId,
        userProfileImageUrl: user.profileImageUrl,
        username: user.username,
      };
      await addDoc(colRef, commentData);
      const newsRef = doc(db, "news", newsId);
      await updateDoc(newsRef, { commentCount: increment(1) });
      const getNews = await getDoc(newsRef);
      const updatedNews = { ...getNews?.data(), id: getNews.id };
      const merged = allNews?.data?.map((item) =>
        item?.id === newsId ? updatedNews : item
      );
      setAllNews({ ...allNews, data: merged });
      e.target.reset();
      getComments(setAddingComment);
    } catch (err) {
      setAddingComment(false);
    }
  };

  const getComments = async (loadingState) => {
    try {
      const q = query(colRef, orderBy("creationDate", "desc"));
      const response = await getDocs(q);
      const allData = response?.docs?.map((item) => ({
        ...item?.data(),
        id: item?.id,
      }));
      setComments(allData);
      loadingState(false);
    } catch (err) {
      loadingState(false);
    }
  };

  useEffect(() => {
    getComments(setLoading);
    setTranslate(true);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${translate ? 0 : "100%"})`,
      }}
      className="absolute inset-0 top-0 left-0 z-20 bg-white duration-150 flex flex-col justify-between"
    >
      <div className="h-full overflow-hidden">
        <div className="border-b px-2">
          <IoIosArrowRoundBack
            onClick={() => {
              setTranslate(false);
              setTimeout(() => {
                setShowComment(false);
              }, 200);
            }}
            className="text-3xl cursor-pointer"
          />
        </div>
        {loading && <Spinner />}
        {!loading && !comments?.length && (
          <p className="text-center p-2">No comments found</p>
        )}
        <div className="p-3 w-full h-full flex flex-col gap-5 overflow-y-scroll scrollbar">
          {comments?.map((item) => (
            <div key={item?.id} className="flex items-start gap-2">
              <div>
                <div
                  style={{
                    backgroundImage: `url(${item?.userProfileImageUrl})`,
                  }}
                  className="bg-center bg-cover bg-no-repeat rounded-full w-10 h-10"
                />
              </div>
              <div className="w-full">
                <div className="rounded-md p-1 bg-gray-100">
                  <p className="font-semibold mb-1">{item?.username}</p>
                  <p className="text-sm break-all">{item?.comment}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 w-fit ml-auto">
                  {moment.unix(item.creationDate).fromNow()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={addComment}
        className="border-t flex items-center gap-1 p-2 w-full"
      >
        <input
          readOnly={addingComment}
          required
          type="text"
          className="border-0 outline-none w-full bg-gray-200 rounded-full px-3 py-1"
        />
        <button
          disabled={addingComment}
          type="submit"
          className="w-[50px] flex items-center justify-center"
        >
          {addingComment ? (
            <Spinner2 />
          ) : (
            <MdSend className="text-3xl cursor-pointer" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Comment;
