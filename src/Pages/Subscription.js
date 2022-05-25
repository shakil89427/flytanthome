import React, { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import available from "../Assets/available.png";
import notAvailable from "../Assets/notAvailable.png";
import razorCurrencies from "../Raw/SupportedCurrencies";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getString } from "firebase/remote-config";
import { useNavigate } from "react-router-dom";
import useCalculate from "../Hooks/useCalculate";
import usePayment from "../Hooks/usePayment";

const Subscription = () => {
  const db = getFirestore();
  const navigate = useNavigate();
  const { remoteConfig, user, setNotify } = useStore();
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(false);
  const [selected, setSelected] = useState(false);
  const [dataloading, setDataLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { usd, inr, other } = useCalculate(setPlans, setDataLoading);
  const { startToPay } = usePayment(plan, selected, setPaymentLoading);

  /* Fetch subscription data */
  const getData = async () => {
    try {
      const colRef = collection(db, "subscription");
      const q = query(colRef, orderBy("inBasePrice", "asc"));
      const response = await getDocs(q);
      const allPlans = response.docs.map((doc) => ({ ...doc.data() }));
      const countries = JSON.parse(getString(remoteConfig, "country_list"));
      const currencies = JSON.parse(getString(remoteConfig, "currency_list"));
      /* USD */
      if (!user?.countryCode || user?.countryCode === "") {
        const { symbol_native } = currencies.find(
          (item) => item.code === "USD"
        );
        return usd(allPlans, {
          currency: "USD",
          symbol: symbol_native,
        });
      }
      /* INR */
      if (user?.countryCode === "IN") {
        const { symbol_native } = currencies.find(
          (item) => item.code === "INR"
        );
        return inr(allPlans, {
          currency: "INR",
          symbol: symbol_native,
        });
      }
      /* Others */
      const { currencyCode } = countries.find(
        (item) => item.countryCode === user.countryCode
      );
      if (!razorCurrencies.includes(currencyCode)) {
        const { symbol_native } = currencies.find(
          (item) => item.code === "USD"
        );
        return usd(allPlans, {
          currency: "USD",
          symbol: symbol_native,
        });
      }
      const { symbol_native } = currencies.find(
        (item) => item.code === currencyCode
      );
      const {
        data: { conversion_rates },
      } = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_CURRENCY_ACCESS_KEY}/latest/USD`
      );
      other(allPlans, {
        currency: currencyCode,
        symbol: symbol_native,
        value: Math.ceil(conversion_rates[currencyCode]),
      });
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="r-box">
      {paymentLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#c9c7c75b]">
          <Spinner />
        </div>
      )}
      {dataloading && <Spinner />}
      {!dataloading && (
        <div className="pt-20 pb-32">
          <div className="mb-20">
            <h1 className="text-center text-3xl font-semibold">
              Subscription Plans
            </h1>
            <p className="text-center max-w-[350px] mx-auto my-3 text-gray-500 font-medium">
              Choose a plan that's right for you and start availling
              sponsorships
            </p>
          </div>
          {!plan ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
              {plans?.map((plan) => (
                <div
                  key={plan?.planId}
                  className="flex flex-col justify-between rounded-lg shadow-md border px-4 py-10 hover:scale-105 duration-150"
                >
                  <div>
                    <p className="bg-black text-white w-fit px-3 py-1">
                      {plan?.name}
                    </p>

                    <div className="my-8">
                      <p className="mb-4 text-sm">
                        <span className="text-4xl font-bold">
                          {plan?.symbol} {plan?.prices[0]?.priceNow}
                        </span>{" "}
                        / month
                      </p>
                      <div>
                        <del className="mr-5 font-medium text-gray-500">
                          {plan.symbol} {plan.strike}{" "}
                          <span className="text-sm">/month</span>
                        </del>
                        <span className="font-medium">
                          Get {plan.percentageOff}% Off
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
                          <img
                            src={item?.active ? available : notAvailable}
                            alt=""
                          />
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
                  <div className="mt-10">
                    <button
                      onClick={() =>
                        setPlan(plans.find((item) => item?.name === plan?.name))
                      }
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
          ) : (
            <div className="border shadow-lg px-5 py-12 rounded-md">
              <div className="w-full max-w-[550px] mx-auto">
                <p
                  onClick={() => setPlan(false)}
                  className="w-fit bg-black text-white px-7 py-2"
                >
                  {plan?.name}
                </p>
                {plan?.prices?.map((item) => (
                  <div
                    onClick={() =>
                      selected === item?.subscriptionDays
                        ? setSelected(false)
                        : setSelected(item.subscriptionDays)
                    }
                    key={item.subscriptionDays}
                    style={{
                      backgroundColor:
                        selected === item.subscriptionDays && "black",
                      color: selected === item.subscriptionDays && "white",
                    }}
                    className="flex items-center justify-between gap-5 border-2 border-black mt-8 px-5 py-4 rounded-md cursor-pointer hover:bg-gray-200  duration-150"
                  >
                    <p className="font-bold text-lg">
                      Price {plan?.symbol} {item?.priceNow} / {item?.type}
                    </p>
                    {item?.pricePrev && (
                      <p>
                        <del className="font-medium">
                          {plan?.symbol}
                          {item?.pricePrev}
                        </del>{" "}
                        You will get {plan?.percentageOff}% off
                      </p>
                    )}
                  </div>
                ))}
                <p
                  onClick={() => selected && startToPay()}
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
          )}
        </div>
      )}
    </div>
  );
};

export default Subscription;
