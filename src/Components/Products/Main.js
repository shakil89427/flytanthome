import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import useStore from "../../Store/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Main = () => {
  const { products, user, countryCode } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-10 w-fit mx-auto">
      <p className="font-semibold text-lg md:text-xl xl:text-3xl lg:col-span-2">
        Social Cards
      </p>
      {products?.map((product) => (
        <div
          key={product?.id}
          style={{
            boxShadow: `0px 0px 15px 1px rgba(13,12,12,.10)`,
          }}
          onClick={() => navigate(`/products/${product?.id}`)}
          className="bg-[#F8F8F8] grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden cursor-pointer max-w-[350px] lg:max-w-[500px]"
        >
          <div className="bg-white flex items-center justify-center rounded-xl">
            <div
              style={{ backgroundImage: `url(${product.blob[0].url})` }}
              className="w-full aspect-square bg-contain bg-center bg-no-repeat m-3"
            />
          </div>

          <div className="p-5 flex flex-col items-center lg:items-start">
            <p className="font-bold text-lg lg:text-xl xl:text-2xl">
              {product?.name}
            </p>
            {product?.customizable && (
              <p className="text-sm mt-1">Customizable</p>
            )}

            {product?.quantityLeft > 100 ? (
              <p className="text-xs w-fit lg:mx-0 px-5 py-1 font-medium rounded-full bg-[#27C200] text-white mt-3">
                Special Price
              </p>
            ) : (
              <p className="text-xs w-fit lg:mx-0 px-5 py-1 font-medium rounded-full bg-[#FF9345] text-white mt-3">
                Only {product?.quantityLeft} left
              </p>
            )}

            <div className="flex items-center gap-x-1 mt-3">
              <Rating
                className="text-md text-[#F7C02B] pt-1"
                initialRating={product?.rating?.ratingCount || 0}
                readonly
                emptySymbol={<AiOutlineStar />}
                fullSymbol={<AiFillStar />}
              />
              <p className="text-sm font-medium pl-1 text-gray-600">
                {product?.rating?.ratingCount || 0} Rating
              </p>
            </div>
            <div className="flex items-center gap-5 mt-3">
              {user?.countryCode === "IN" || countryCode === "IN" ? (
                <p className="font-bold text-lg md:text-xl lg:text-2xl">
                  {product?.inFinal?.symbol}
                  {product?.inFinal?.priceNow}
                </p>
              ) : (
                <p className="font-bold text-lg md:text-xl lg:text-2xl">
                  {product?.usFinal?.symbol}
                  {product?.usFinal?.priceNow}
                </p>
              )}
              {user?.countryCode === "IN" || countryCode === "IN" ? (
                <p className="text-[#06A015] font-semibold">
                  {product?.inFinal?.discount}% off
                </p>
              ) : (
                <p className="text-[#06A015] font-semibold">
                  {product?.usFinal?.discount}% off
                </p>
              )}
            </div>

            <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-500">
              {user?.countryCode === "IN" || countryCode === "IN" ? (
                <del>
                  {product?.inFinal?.symbol}
                  {product?.inFinal?.pricePrev}
                </del>
              ) : (
                <del>
                  {product?.usFinal?.symbol}
                  {product?.usFinal?.pricePrev}
                </del>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
