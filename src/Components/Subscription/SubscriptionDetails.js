import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePayment from "../../Hooks/usePayment";
import useStore from "../../Store/useStore";
import Spinner from "../Spinner/Spinner";
import useAnalytics from "../../Hooks/useAnalytics";

const SubscriptionDetails = () => {
  const { plans } = useStore();
  const { name } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState({});
  const [selected, setSelected] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { startToPay } = usePayment(selected, setPaymentLoading);
  const { addLog } = useAnalytics();

  useEffect(() => {
    const matched = plans.find(
      (i) => i.name.toLowerCase() === name.toLowerCase()
    );
    if (matched?.name) {
      setPlan(matched);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {paymentLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#c9c7c75b]">
          <Spinner />
        </div>
      )}
      <div className="border shadow-lg px-5 py-12 rounded-md">
        <div className="w-full max-w-[550px] mx-auto">
          <p className="w-fit bg-black text-white px-7 py-2">{plan?.name}</p>
          {plan?.prices?.map((item) => (
            <div
              onClick={() =>
                selected?.id === item?.id
                  ? setSelected(false)
                  : setSelected(item)
              }
              key={item.id}
              style={{
                backgroundColor: selected?.id === item?.id && "black",
                color: selected?.id === item?.id && "white",
              }}
              className="flex items-center justify-between gap-5 border-2 border-black mt-8 px-5 py-4 rounded-md cursor-pointer hover:bg-[#E8E8E8]  duration-150"
            >
              <p className="font-bold text-lg">
                Price {item?.symbol} {item?.priceNow} / {item?.type}
              </p>
              {item?.subscriptionDays !== 30 && (
                <p>
                  <del className="font-medium">
                    {item?.symbol}
                    {item?.pricePrev}
                  </del>{" "}
                  You will get {item?.percentageOff}% off
                </p>
              )}
            </div>
          ))}
          <p
            onClick={() => {
              addLog("proceed");
              selected && startToPay();
            }}
            style={{
              backgroundColor: selected ? "black" : "gray",
              cursor: selected && "pointer",
            }}
            className="w-fit mx-auto text-white px-10 py-3 mt-8 rounded-md text-xl font-semibold"
          >
            Proceed
          </p>
        </div>
      </div>
    </>
  );
};

export default SubscriptionDetails;
