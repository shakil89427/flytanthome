import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import useStore from "../../Store/useStore";
import Spinner2 from "../Spinner/Spinner2";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import moment from "moment";
import defaultUser from "../../Assets/defaultUser.png";

const Reviews = ({ id }) => {
  const { allReviews, setAllReviews } = useStore();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReviews = async () => {
    try {
      const { data } = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/reviews",
        {
          id,
        }
      );
      setReviews(data.data);
      setAllReviews([...allReviews, data]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const matched = allReviews?.find((item) => item?.id === id);
    if (matched?.id) {
      setReviews(matched?.data);
      setLoading(false);
    } else {
      getReviews();
    }
  }, []);

  if (loading) {
    return (
      <div>
        <div className="w-fit mx-auto">
          <Spinner2 />
        </div>
        <hr className="my-10" />
      </div>
    );
  }
  if (reviews?.length < 1) {
    return null;
  }
  return (
    <div>
      <div className="flex flex-col items-start gap-10">
        {reviews?.map((review) => (
          <div key={review?.id} className="w-full">
            <div className="flex items-start justify-start gap-5">
              <div>
                <div
                  style={{
                    backgroundImage: `url(${
                      review?.profileImageUrl || defaultUser
                    })`,
                  }}
                  className="bg-cover bg-center bg-no-repeat rounded-full w-12 h-12"
                />
              </div>
              <div>
                <div className="flex items-center justify-start gap-5">
                  <p className="text-lg font-semibold">{review?.username}</p>
                  <p className="font-medium text-sm text-gray-400">
                    Verified Buyer
                  </p>
                </div>
                <div className="flex items-center justify-start gap-5">
                  <Rating
                    className="text-md text-[#F7C02B] pt-1"
                    initialRating={review?.star || 0}
                    readonly
                    emptySymbol={<AiOutlineStar />}
                    fullSymbol={<AiFillStar />}
                  />
                  <p className="font-medium text-sm text-gray-400">
                    {moment.unix(review?.creationDate).format("DD MMM, YYYY")}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3">{review?.review}</p>
          </div>
        ))}
      </div>
      <hr className="my-10" />
    </div>
  );
};

export default Reviews;
