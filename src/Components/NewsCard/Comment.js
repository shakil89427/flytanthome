import React from "react";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const Comment = ({ setShowComment, newsId }) => {
  const { commentsData, setCommentsData } = useStore();
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [translate, setTranslate] = useState(false);
  const db = getFirestore();

  const getData = async () => {
    try {
      const colRef = collection(db, "news", newsId, "comments");
      const response = await getDocs(colRef);
      const allData = response?.docs?.map((item) => ({
        ...item?.data(),
        id: item?.id,
      }));
      if (allData?.length < 1) return setLoading(false);
      const final = { rootId: newsId, data: allData };
      setComments(final);
      setCommentsData((prev) => [...prev, final]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const matched = commentsData?.find((item) => item?.rootId === newsId);
    if (matched?.rootId) {
      setComments(matched);
      setLoading(false);
    } else {
      getData();
    }
    setTranslate(true);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${translate ? 0 : "100%"})`,
      }}
      className="absolute inset-0 top-0 left-0 z-20 bg-white duration-150"
    >
      <div className="border-b pl-2">
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
      {!loading && !comments?.data?.length && (
        <p className="text-center p-2">No comments found</p>
      )}
      {!loading && comments?.data?.length > 0 && (
        <div className="p-2 w-full h-full text-center">
          {comments?.data?.map((item) => (
            <p key={item?.id}>{item?.comment}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
