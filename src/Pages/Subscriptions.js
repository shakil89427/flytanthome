import React, { useEffect, useState } from "react";
import useStore from "../Store/useStore";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getRemoteConfig, getString } from "firebase/remote-config";
import Spinner from "../Components/Spinner/Spinner";
import axios from "axios";
import available from "../Assets/available.png";
import notAvailable from "../Assets/notAvailable.png";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const navigate = useNavigate();
  const { user, app, setNotify } = useStore();
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currencyValue, setCurrencyValue] = useState({});
  const [loading, setLoading] = useState(true);
  const remoteConfig = getRemoteConfig(app);
  const db = getFirestore();
  const colRef = collection(db, "subscription");
  const q = query(colRef, orderBy("inBasePrice", "asc"));

  /* Filter by currency */
  useEffect(() => {
    if (!currencyValue?.currency) return;
    /* USD */
    if (currencyValue?.currency === "USD") {
      const filtered = allSubscriptions.map((item) => {
        return {
          ...item,
          basePrice: item.usBasePrice,
          percentageOff: item.usPercentageOff,
          strikePrice: item.usStrikePrice,
          currency: currencyValue?.currency,
          symbol: currencyValue?.symbol,
        };
      });
      setSubscriptions(filtered);
      return setLoading(false);
    }
    /* INR */
    if (currencyValue?.currency === "INR") {
      const filtered = allSubscriptions.map((item) => {
        return {
          ...item,
          basePrice: item.inBasePrice,
          percentageOff: item.inPercentageOff,
          strikePrice: item.inStrikePrice,
          currency: currencyValue?.currency,
          symbol: currencyValue?.symbol,
        };
      });
      setSubscriptions(filtered);
      return setLoading(false);
    }
    /* Others */
    const filtered = allSubscriptions.map((item) => {
      return {
        ...item,
        basePrice: Math.round(item.usBasePrice * currencyValue.value),
        percentageOff: item.usPercentageOff,
        strikePrice: Math.round(item.usStrikePrice * currencyValue.value),
        currency: currencyValue?.currency,
        symbol: currencyValue?.symbol,
      };
    });
    setSubscriptions(filtered);
    setLoading(false);
  }, [allSubscriptions, currencyValue]);

  /* Get actual currency */
  const applyChanges = async (allCountries, allCurrencies) => {
    try {
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
        data: { quotes },
      } = await axios.get("http://api.currencylayer.com/live", {
        params: {
          access_key: process.env.REACT_APP_CURRENCY_ACCESS_KEY,
          source: "USD",
          currencies: currencyCode,
        },
      });

      setCurrencyValue({
        currency: currencyCode,
        symbol: matchedSymbol.symbol_native,
        value: quotes[Object.keys(quotes)[0]],
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
      setAllSubscriptions(
        allData?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      const allCountries = await JSON.parse(
        getString(remoteConfig, "country_list")
      );
      const allCurrencies = await JSON.parse(
        getString(remoteConfig, "currency_list")
      );
      applyChanges(allCountries, allCurrencies);
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
      <div className="pt-20 pb-32">
        <div className="mb-20">
          <h1 className="text-center text-3xl font-semibold">
            Subscription Plans
          </h1>
          <p className="text-center max-w-[350px] mx-auto my-3 text-gray-500 font-medium">
            Choose a plan that's right for you and start availling sponsorships
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {subscriptions?.map((subscription) => (
            <div
              key={subscription?.id}
              className="flex flex-col justify-between rounded-lg shadow-md border px-4 pt-10 pb-3"
            >
              <div>
                <p className="bg-black text-white w-fit px-3 py-1">
                  {subscription?.name}
                </p>
                <p className="my-4 text-sm">
                  <span className="text-3xl font-bold">
                    {subscription?.symbol} {subscription?.basePrice}
                  </span>{" "}
                  / month
                </p>
                <div className="flex flex-col my-7 gap-4">
                  <p className="font-semibold">Plan Features</p>
                  {subscription.features.map((item, index) => (
                    <div
                      key={index}
                      className="flex font-medium items-start text-sm text-[#949393] w-full"
                    >
                      <img
                        src={item?.active ? available : notAvailable}
                        alt=""
                      />
                      <p
                        style={{ color: item?.active ? "black" : "#949393" }}
                        className="ml-3"
                      >
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button className="bg-black text-white w-full py-3 rounded-lg text-sm">
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
      </div>
    </div>
  );
};

export default Subscriptions;
