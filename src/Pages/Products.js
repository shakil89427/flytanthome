import axios from "axios";
import React, { useState, useEffect } from "react";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";

const Products = () => {
  const { user, products, setProducts } = useStore();
  const [loading, setLoading] = useState(true);

  const calculate = (items) => {
    const maped = items.map((item) => {
      const priceNow =
        user?.countryCode === "IN" ? item.inPrice : item?.usPrice;
      const pricePrev =
        user?.countryCode === "IN"
          ? item.inStrikeThroughPrice
          : item?.usStrikeThroughPrice;
      const symbol = user?.countryCode === "IN" ? "₹" : "$";
      const discount = Math.floor(100 - (priceNow * 100) / pricePrev);
      return { ...item, priceData: { priceNow, pricePrev, symbol, discount } };
    });
    setProducts(maped);
    setLoading(false);
  };

  useEffect(() => {
    if (products?.length < 1) {
      axios
        .get("https://flytant.herokuapp.com/products")
        .then(({ data }) => calculate(data))
        .catch(() => setLoading(false));
    } else {
      calculate(products);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-[1200px] mx-auto pt-14 pb-28 px-5">
      <p className="font-semibold text-lg md:text-xl xl:text-3xl">
        Social Cards
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {products?.map((product) => (
          <div
            key={product?.id}
            style={{
              boxShadow: `0px 0px 15px 1px rgba(13,12,12,.10)`,
            }}
            className="bg-[#F8F8F8] grid grid-cols-2 rounded-xl overflow-hidden"
          >
            <div className="bg-white rounded-tr-xl rounded-br-xl p-5 flex items-center justify-center">
              <img src={product.blob[0].url} alt="" className="aspect-[5/3]" />
            </div>
            <div className="p-5">
              <p className="font-bold text-md md:text-lg lg:text-xl">
                {product?.name}
              </p>
              <p
                className={`text-xs w-fit mt-2 px-5 py-1 font-medium rounded-full text-white ${
                  product?.quantityLeft > 5 ? "bg-[#27C200]" : "bg-[#FF9345]"
                }`}
              >
                {product?.quantityLeft} left
              </p>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-x-1 my-4">
                <Rating
                  className="text-md text-[#F7C02B] pt-1"
                  initialRating={product?.rating?.ratingCount}
                  readonly
                  emptySymbol={<AiOutlineStar />}
                  fullSymbol={<AiFillStar />}
                />
                <p className="text-sm font-medium pl-1 text-gray-600">
                  {product?.rating?.reviewCount} Rating
                </p>
              </div>
              <div className="flex items-center gap-5 mt-3 lg:mt-0">
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

export default Products;
