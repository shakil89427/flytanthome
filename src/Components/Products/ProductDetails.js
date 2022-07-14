import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";

const ProductDetails = () => {
  const { products } = useStore();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const matched = products?.find((item) => item?.id === id);
    if (matched?.id) {
      setProduct(matched);
      setImage(matched?.blob[0]?.url);
    } else {
      navigate("/products");
    }
    window.scroll(0, 0);
  }, [id]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-[1100px] mx-auto">
      {/* Left */}
      <div>
        <div className="grid grid-cols-4 gap-5">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="col-span-4 border aspect-square bg-contain bg-center bg-no-repeat"
          />
          {product?.blob?.map((img) => (
            <div
              key={img?.url}
              onClick={() => setImage(img?.url)}
              style={{ backgroundImage: `url(${img?.url})` }}
              className="border aspect-square bg-contain bg-center bg-no-repeat"
            />
          ))}
        </div>
      </div>
      {/* Right */}
      <div>
        {/* Title */}
        <p className="font-semibold text-lg md:text-xl xl:text-3xl">
          {product?.name}
        </p>
        {/* Customizable */}
        {product?.customizable && <p className="text-sm mt-3">Customizable</p>}
        {/* Prices */}
        <div className="flex items-center gap-5 mt-5">
          <p className="font-bold text-lg md:text-xl lg:text-2xl">
            {product?.priceData?.symbol}
            {product?.priceData?.priceNow}
          </p>
          <p className="text-[#06A015] font-semibold">
            {product?.priceData?.discount}% off
          </p>
        </div>
        <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-500">
          <del>
            {product?.priceData?.symbol}
            {product?.priceData?.pricePrev}
          </del>
        </p>
        {/* Stock or special prize */}
        {product?.quantityLeft > 100 ? (
          <p className="text-xs w-fit lg:mx-0 px-5 py-1 font-medium rounded-full bg-[#27C200] text-white mt-5">
            Special Price
          </p>
        ) : (
          <p className="text-xs w-fit lg:mx-0 px-5 py-1 font-medium rounded-full bg-[#FF9345] text-white mt-5">
            Only {product?.quantityLeft} left
          </p>
        )}
        {/* Rating */}
        <div className="flex items-center gap-x-1 mt-5">
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
        {/* Quantity */}
        <div className="w-[60%] mt-5">
          <p className="text-center font-medium mb-1 text-gray-500">QTY</p>
          <div className="flex items-center justify-between border border-[#E6E6E6]">
            <p
              onClick={() =>
                setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="w-11 h-11 bg-[#E6E6E6] flex items-center justify-center text-2xl cursor-pointer select-none"
            >
              -
            </p>
            <p className="text-lg">{quantity}</p>
            <p
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-11 h-11 bg-[#E6E6E6] flex items-center justify-center text-2xl cursor-pointer select-none"
            >
              +
            </p>
          </div>
        </div>
        {/* Customize button */}
        {product?.customizable && (
          <div className="bg-[#E6E6E6] w-[75%] h-12 flex items-center justify-center gap-5 rounded-full mt-5 font-semibold cursor-pointer select-none">
            <p>Customize</p>
            <FiEdit />
          </div>
        )}
        {/* Buy button */}
        <button className="w-full bg-black text-white mt-5 rounded-full h-14 text-xl font-medium">
          BUY NOW
        </button>
        <hr className="my-10" />
        {/* Description */}
        <p className="font-medium text-gray-500">{product?.description}</p>
        <p className="mt-5 font-semibold">Highlights</p>
        {/* Highlights */}
        {product.highlights?.map((item) => (
          <div className="flex items-start gap-2 mt-5" key={item}>
            <GoPrimitiveDot className="text-2xl" />
            <p className="font-medium text-gray-500">{item}</p>
          </div>
        ))}
        <hr className="my-10" />
        {/* Rating and reviews */}
        <p className="mt-5 font-semibold">Rating and Reviews</p>
        <div className="flex items-center gap-x-1 mt-5">
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
        <hr className="my-10" />
      </div>
    </div>
  );
};

export default ProductDetails;
