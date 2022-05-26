import React, { useEffect, useState } from "react";
import useStore from "../../Store/useStore";
import moment from "moment";
import cross from "../../Assets/cross.svg";
import { getString } from "firebase/remote-config";

const History = ({ setShowHistory }) => {
  const { user, remoteConfig } = useStore();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const currencies = JSON.parse(getString(remoteConfig, "currency_list"));
    const allPlans = user?.subscriptions?.map((pl) => {
      const { symbol_native } = currencies.find(
        (item) => item?.code === pl?.currencyCode
      );
      pl.symbol = symbol_native;
      return pl;
    });
    const sorted = allPlans?.sort((a, b) => b.orderDate - a.orderDate);
    if (!sorted?.length || sorted?.length < 1) return setPlans([]);
    setPlans(sorted);
  }, [user]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setShowHistory(false)}
        className="fixed inset-0 top-0 left-0 bg-[#adacac67] z-10"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[800px] bg-white px-5 py-20 rounded-lg max-h-[80vh] overflow-y-scroll z-20">
        <img
          onClick={() => setShowHistory(false)}
          className="absolute top-5 right-5 w-6 cursor-pointer"
          src={cross}
          alt=""
        />
        <p className="text-center text-lg md:text-xl lg:text-2xl font-semibold">
          History of plans that you subscribed
        </p>
        {plans?.length > 0 ? (
          <div>
            <div className="mt-10 grid grid-cols-5 text-center text-gray-500 font-medium text-xs sm:text-sm md:text-md lg:text-lg gap-x-5 border-b">
              <p>Plan</p>
              <p>Price</p>
              <p>Duration</p>
              <p>Started</p>
              <p>Expires</p>
            </div>
            {plans?.map((plan, index) => (
              <div
                key={index}
                className="mt-5 grid grid-cols-5 text-center font-medium text-xs sm:text-sm md:text-md lg:text-lg gap-x-5"
              >
                <p>{plan?.planName}</p>
                <p>
                  {plan?.symbol} {plan?.price}
                </p>
                <p>{plan?.subscriptionDays} days</p>
                <p>{moment.unix(plan?.orderDate).format("DD MMM YYYY")}</p>
                <p>
                  {moment
                    .unix(plan?.orderDate + plan?.subscriptionDays * 86400)
                    .format("DD MMM YYYY")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center">No plans found</p>
        )}
      </div>
    </>
  );
};

export default History;
