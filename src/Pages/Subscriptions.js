import React, { useEffect, useState } from "react";
import useStore from "../Store/useStore";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getString } from "firebase/remote-config";
import Spinner from "../Components/Spinner/Spinner";
import axios from "axios";
import available from "../Assets/available.png";
import notAvailable from "../Assets/notAvailable.png";
import { useNavigate } from "react-router-dom";
import useCalculate from "../Hooks/useCalculate";
import usePayment from "../Hooks/usePayment";

const Subscriptions = () => {
  const navigate = useNavigate();
  const { remoteConfig, user, setNotify } = useStore();
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currencyValue, setCurrencyValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  useCalculate(currencyValue, allSubscriptions, setSubscriptions, setLoading);
  const { startToPay } = usePayment(show, selected, setPaymentLoading);
  const db = getFirestore();
  const colRef = collection(db, "subscription");
  const q = query(colRef, orderBy("inBasePrice", "asc"));

  /* Get actual currency */
  const applyChanges = async () => {
    try {
      const allCountries = JSON.parse(getString(remoteConfig, "country_list"));
      const allCurrencies = JSON.parse(
        getString(remoteConfig, "currency_list")
      );
      /* USD */
      if (!user?.countryCode || user?.countryCode === "") {
        const matchedSymbol = allCurrencies.find((item) => item.code === "USD");
        return setCurrencyValue({
          currency: "USD",
          symbol: matchedSymbol.symbol_native,
        });
      }
      /* INR */
      if (user?.countryCode === "IN") {
        const matchedSymbol = allCurrencies.find((item) => item.code === "INR");
        return setCurrencyValue({
          currency: "INR",
          symbol: matchedSymbol.symbol_native,
        });
      }
      /* Others */
      const { currencyCode } = allCountries.find(
        (item) => item.countryCode === user.countryCode
      );

      const matchedSymbol = allCurrencies.find(
        (item) => item.code === currencyCode
      );
      const {
        data: { conversion_rates },
      } = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_CURRENCY_ACCESS_KEY}/latest/USD`
      );
      setCurrencyValue({
        currency: currencyCode,
        symbol: matchedSymbol.symbol_native,
        value: Math.ceil(conversion_rates[currencyCode]),
      });
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      setLoading(false);
    }
  };

  /* Fetch subscription data */
  const getData = async () => {
    try {
      const allData = await getDocs(q);
      setAllSubscriptions(allData?.docs?.map((doc) => ({ ...doc.data() })));
      applyChanges();
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="r-box">
      {loading && <Spinner />}
      {!loading && (
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
          {!show ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
              {subscriptions?.map((subscription) => (
                <div
                  key={subscription?.planId}
                  className="flex flex-col justify-between rounded-lg shadow-md border px-4 py-10 hover:scale-105 duration-150"
                >
                  <div>
                    <p className="bg-black text-white w-fit px-3 py-1">
                      {subscription?.name}
                    </p>
                    <p className="my-8 text-sm">
                      <span className="text-4xl font-bold">
                        {subscription?.symbol}{" "}
                        {subscription?.prices[0]?.priceNow}
                      </span>{" "}
                      / month
                    </p>
                    <div className="flex flex-col my-7 gap-8">
                      <p className="font-semibold">Plan Features</p>
                      {subscription?.features?.map((item, index) => (
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
                        setShow(
                          subscriptions.find(
                            (item) => item?.name === subscription?.name
                          )
                        )
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
                  onClick={() => setShow(false)}
                  className="w-fit bg-black text-white px-7 py-2"
                >
                  {show?.name}
                </p>
                {show?.prices?.map((item) => (
                  <div
                    onClick={() =>
                      selected === item?.priceNow
                        ? setSelected(false)
                        : setSelected(item.priceNow)
                    }
                    key={item.priceNow}
                    style={{
                      backgroundColor: selected === item.priceNow && "black",
                      color: selected === item.priceNow && "white",
                    }}
                    className="flex items-center justify-between gap-5 border-2 border-black mt-8 px-5 py-4 rounded-md cursor-pointer hover:bg-gray-200  duration-150"
                  >
                    <p className="font-bold text-lg">
                      Price {show?.symbol} {item?.priceNow} / {item?.type}
                    </p>
                    {item?.pricePrev && (
                      <p>
                        <del className="font-medium">
                          {show?.symbol}
                          {item?.pricePrev}
                        </del>{" "}
                        You will get {show?.percentageOff}% off
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

export default Subscriptions;
