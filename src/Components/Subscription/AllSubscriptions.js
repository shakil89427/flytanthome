import React from "react";
import useStore from "../../Store/useStore";
import available from "../../Assets/available.png";
import notAvailable from "../../Assets/notAvailable.png";
import { useNavigate } from "react-router-dom";

const AllSubscriptions = () => {
  const { plans } = useStore();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-end gap-x-3 gap-y-7 ">
      {plans?.map((plan, index) => (
        <div
          style={{
            height: index === 2 && "680px",
            paddingTop: index === 2 ? "60px" : "30px",
            border: index === 2 && "2px solid black",
          }}
          key={plan?.planId}
          className="w-full flex flex-col justify-between rounded-lg shadow-lg border px-4 pb-5 hover:scale-105 duration-150 h-[650px] relative overflow-hidden"
        >
          {index === 2 && (
            <p className="absolute top-0 rounded-tl-lg rounded-tr-lg inset-x-0 text-center bg-black text-white py-2 font-medium">
              Popular
            </p>
          )}
          <div>
            <p className="bg-black text-white w-fit px-3 py-1">{plan?.name}</p>

            <div className="my-8">
              <p className="mb-4 text-sm">
                <span className="text-4xl font-bold">
                  {plan?.prices[0]?.symbol} {plan?.prices[0]?.priceNow}
                </span>{" "}
                / month
              </p>
              <div>
                <del className="mr-5 font-medium text-gray-500">
                  {plan?.prices[0]?.symbol} {plan?.prices[0]?.pricePrev}
                  <span className="text-sm">/month</span>
                </del>
                <span className="font-medium">
                  Get {plan?.prices[0]?.percentageOff}% Off
                </span>
              </div>
            </div>

            <div className="flex flex-col my-7 gap-8">
              <p className="font-semibold">Plan Features</p>
              {plan?.features?.map((item, index) => (
                <div
                  key={index}
                  className="flex font-medium items-start text-sm text-[#949393] w-full"
                >
                  <img src={item?.active ? available : notAvailable} alt="" />
                  <p
                    style={{
                      color: item?.active ? "black" : "#949393",
                    }}
                    className="ml-3"
                  >
                    {item?.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate(`/subscription/${plan?.name}`)}
              className="bg-black text-white w-full py-3 rounded-lg text-sm"
            >
              Buy now
            </button>
            <p
              onClick={() => navigate("/terms")}
              className="w-fit mx-auto text-xs mt-3 cursor-pointer text-gray-500"
            >
              Terms of use
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSubscriptions;
