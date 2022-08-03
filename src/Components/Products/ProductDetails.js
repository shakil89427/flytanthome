import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useStore from "../../Store/useStore";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import CustomDesign from "./CustomDesign";
import MoreCards from "./MoreCards";
import useAnalytics from "../../Hooks/useAnalytics";
import Reviews from "./Reviews";
import millify from "millify";

const ProductDetails = () => {
  const {
    user,
    products,
    setShowLogin,
    setQuantity,
    quantity,
    countryCode,
    customText,
    setCustomText,
    mixpanelLog,
  } = useStore();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addLog } = useAnalytics();

  useEffect(() => {
    setQuantity(1);
    setCustomText("");
    const matched = products?.find((item) => item?.id === id);
    if (matched?.id) {
      setProduct(matched);
      setImage(matched?.blob[0]?.url);
      mixpanelLog(`viewing_details_${matched?.name}`);
    } else {
      navigate("/products");
    }
  }, [id]);

  return (
    <>
      {showCustom && <CustomDesign setShowCustom={setShowCustom} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-[1100px] mx-auto">
        {/* Left */}
        <div>
          <div className="grid grid-cols-4 gap-5">
            <div
              style={{ backgroundImage: `url(${image})` }}
              className="col-span-4 aspect-square bg-contain bg-center bg-no-repeat"
            />
            {product?.blob?.map((img) => (
              <div
                key={img?.url}
                onClick={() => {
                  addLog("blob_image_change");
                  mixpanelLog("change_blob");
                  setImage(img?.url);
                }}
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
          {product?.customizable && (
            <p className="text-sm mt-3">Customizable</p>
          )}
          {/* Prices */}
          <div className="flex items-center gap-5 mt-5">
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
                onClick={() => {
                  addLog("decrease_quantity");
                  mixpanelLog("decrease_quantity");
                  setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
                }}
                className="w-11 h-11 bg-[#E6E6E6] flex items-center justify-center text-2xl cursor-pointer select-none"
              >
                -
              </p>
              <p className="text-lg">{quantity}</p>
              <p
                onClick={() => {
                  addLog("increase_quantity");
                  mixpanelLog("increase_quantity");
                  setQuantity((prev) => prev + 1);
                }}
                className="w-11 h-11 bg-[#E6E6E6] flex items-center justify-center text-2xl cursor-pointer select-none"
              >
                +
              </p>
            </div>
          </div>
          {/* Customize button */}
          {product?.customizable && (
            <div
              onClick={() => {
                addLog("customizetext_popup_show");
                mixpanelLog("click_customize");
                setShowCustom(true);
              }}
              className="bg-[#E6E6E6] w-[75%] h-12 flex items-center justify-center gap-5 rounded-full mt-5 font-semibold cursor-pointer select-none"
            >
              <p>{customText?.length > 0 ? customText : "Customize"}</p>
              <FiEdit />
            </div>
          )}
          {/* Buy button */}
          <button
            onClick={() => {
              addLog(`buy_now_${product?.name}`);
              mixpanelLog(`click_buy_now_${product?.name}`);
              user?.userId
                ? navigate("/products/payment", { state: { from: location } })
                : setShowLogin(true);
            }}
            className="w-full bg-black text-white mt-5 rounded-full h-14 text-xl font-medium"
          >
            BUY NOW
          </button>
          <hr className="my-10" />
          {/* Description */}
          <p style={{ lineHeight: "200%" }} className=" text-gray-500">
            {product?.description}
          </p>
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
          <div className="flex items-center gap-x-1 mt-5 text-2xl">
            <Rating
              className="text-md text-[#F7C02B] pt-1"
              initialRating={product?.rating?.ratingCount || 0}
              readonly
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
            />
            <p className=" font-medium pl-1 text-gray-600">
              {product?.rating?.ratingCount || 0}
            </p>
          </div>
          <p className="text-sm font-medium pl-1 text-gray-600 mt-2">
            {millify(product?.rating?.reviewCount || 0)} Reviews
          </p>
          <hr className="my-10" />
          <Reviews id={id} />
        </div>
      </div>
      <MoreCards current={id} />
    </>
  );
};

export default ProductDetails;
