import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import useStore from "../../Store/useStore";
import Rating from "react-rating";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import useAnalytics from "../../Hooks/useAnalytics";

const MoreCards = ({ current }) => {
  const { products, user, countryCode } = useStore();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();
  const prevRef = useRef();
  const { addLog } = useAnalytics();

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div>
      <p className="font-semibold text-lg md:text-xl xl:text-2xl mb-5">
        More Cards
      </p>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: nextRef?.current,
          }}
          onSlideChange={(val) => setActiveIndex(val?.realIndex)}
          onSwiper={setSwiper}
          initialSlide={activeIndex}
          slidesPerView={1.3}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            1400: {
              slidesPerView: 3,
            },
          }}
          className="grid grid-cols-1"
        >
          {products?.map(
            (product) =>
              product?.id !== current && (
                <SwiperSlide
                  onClick={() => {
                    addLog(`product_details_${product?.name}`);
                    navigate(`/products/${product?.id}`);
                  }}
                  key={product?.id}
                  className="cursor-pointer border rounded-lg"
                >
                  <div
                    key={product?.id}
                    className="bg-[#F8F8F8] grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden cursor-pointer h-full w-full"
                  >
                    <div className="bg-white flex items-center justify-center rounded-xl">
                      <div
                        style={{
                          backgroundImage: `url(${product.blob[0].url})`,
                        }}
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
                </SwiperSlide>
              )
          )}
        </Swiper>
        <div
          className="hidden md:block absolute bg-white top-[35%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none"
          ref={nextRef}
        >
          <MdNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default MoreCards;
