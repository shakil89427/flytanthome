import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import useStore from "../../Store/useStore";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { products } = useStore();
  const navigate = useNavigate();
  return (
    <div className="max-w-[1200px] mx-auto">
      <p className="font-semibold text-lg md:text-xl xl:text-3xl">
        Social Cards
      </p>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-10 w-fit mx-auto">
        {products?.map((product) => (
          <div
            key={product?.id}
            style={{
              boxShadow: `0px 0px 15px 1px rgba(13,12,12,.10)`,
            }}
            onClick={() => navigate(`/products/${product?.id}`)}
            className="bg-[#F8F8F8] grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden cursor-pointer max-w-[350px] lg:max-w-[500px]"
          >
            <div className="bg-white rounded-xl p-5 flex items-center justify-center">
              <img src={product.blob[0].url} alt="" />
            </div>
            <div className="p-5 flex flex-col items-center lg:items-start gap-5">
              <p className="font-bold text-lg lg:text-xl xl:text-2xl">
                {product?.name}
              </p>
              <p
                className={`text-xs w-fit lg:mx-0 px-5 py-1 font-medium rounded-full text-white ${
                  product?.quantityLeft > 5 ? "bg-[#27C200]" : "bg-[#FF9345]"
                }`}
              >
                {product?.quantityLeft} left
              </p>
              <div className="flex items-center gap-x-1">
                <Rating
                  className="text-md text-[#F7C02B] pt-1"
                  initialRating={product?.rating?.ratingCount}
                  readonly
                  emptySymbol={<AiOutlineStar />}
                  fullSymbol={<AiFillStar />}
                />
                <p className="text-sm font-medium pl-1 text-gray-600">
                  {product?.rating?.ratingCount} Rating
                </p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-bold text-md md:text-lg lg:text-xl">
                  {product?.priceData?.symbol}
                  {product?.priceData?.priceNow}
                </p>
                <p className="text-[#06A015] font-semibold">
                  {product?.priceData?.discount}% off
                </p>
              </div>
              <p className="text-sm md:text-md lg:text-lg font-medium">
                <del>
                  {product?.priceData?.symbol}
                  {product?.priceData?.pricePrev}
                </del>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
