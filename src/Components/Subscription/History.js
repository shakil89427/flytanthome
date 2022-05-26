import React, { useEffect, useState } from "react";
import useStore from "../../Store/useStore";
import moment from "moment";
import cross from "../../Assets/cross.svg";

const History = ({ setShowHistory }) => {
  const { user } = useStore();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const filtered = user?.subscriptions?.filter(
      (sub) => sub?.orderDate + sub.subscriptionDays * 86400 < moment().unix()
    );
    if (!filtered?.length || filtered?.length < 1) return setPlans([]);
    const sorted = filtered.sort((a, b) => a.orderDate - b.orderDate);
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[700px] bg-white px-5 py-14 rounded-md max-h-[80vh] overflow-y-scroll z-20">
        <img
          onClick={() => setShowHistory(false)}
          className="absolute top-5 right-5 w-6 cursor-pointer"
          src={cross}
          alt=""
        />
        <p className="text-center text-2xl font-semibold">
          History of plans that you subscribed
        </p>
        {plans?.length > 0 ? (
          <div>
            <div className="mt-10 grid grid-cols-3 text-center text-gray-500 text-lg font-medium">
              <p>Plan</p>
              <p>Started</p>
              <p>Expired</p>
            </div>
            {plans?.map((plan, index) => (
              <div
                key={index}
                className="mt-5 grid grid-cols-3 text-center font-medium"
              >
                <p>{plan?.planName}</p>
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
