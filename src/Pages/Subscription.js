import React, { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import razorCurrencies from "../Raw/SupportedCurrencies";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { fetchAndActivate, getString } from "firebase/remote-config";
import { Outlet } from "react-router-dom";
import useCalculate from "../Hooks/useCalculate";
import ActivePlans from "../Components/Subscription/ActivePlans";

const Subscription = () => {
  const { allPlans, setAllPlans, remoteConfig, user, setNotify } = useStore();
  const [dataloading, setDataLoading] = useState(true);
  const { usd, inr, other } = useCalculate(setDataLoading);
  const db = getFirestore();

  const checkCurrency = async (allData) => {
    if (!user?.countryCode || user?.countryCode === "") return usd(allData);
    if (user?.countryCode === "IN") return inr(allData);
    try {
      await fetchAndActivate(remoteConfig);
      const countries = await JSON.parse(
        getString(remoteConfig, "country_list")
      );
      /* Others */
      const { currencyCode } = countries?.find(
        (item) => item?.countryCode === user?.countryCode
      );
      if (!razorCurrencies?.includes(currencyCode)) return usd(allData);
      const {
        data: { rates },
      } = await axios.get("https://api.exchangerate.host/latest", {
        params: {
          base: "USD",
          symbols: currencyCode,
        },
      });
      const currencies = await JSON.parse(
        getString(remoteConfig, "currency_list")
      );
      const { symbol_native } = currencies?.find(
        (item) => item?.code === currencyCode
      );
      other(allData, {
        currency: currencyCode,
        symbol: symbol_native,
        value: rates[currencyCode],
      });
    } catch (err) {
      usd(allData);
    }
  };

  /* Fetch subscription data */
  const getData = async () => {
    try {
      const colRef = collection(db, "subscription");
      const q = query(colRef, orderBy("inBasePrice", "asc"));
      const response = await getDocs(q);
      const allData = response?.docs?.map((doc) => ({ ...doc.data() }));
      setAllPlans(allData);
      checkCurrency(allData);
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (allPlans?.length > 0) {
      checkCurrency(allPlans);
    } else {
      getData();
    }
  }, []);

  return (
    <div className="r-box">
      {dataloading ? (
        <Spinner />
      ) : (
        <div>
          {user?.subscriptions?.length > 0 && <ActivePlans />}
          <div className="pt-20 pb-32">
            <div className="mb-20">
              <h1 className="text-center text-2xl lg:text-3xl font-semibold">
                Subscription Plans
              </h1>
              <p className="text-center max-w-[350px] mx-auto my-3 text-gray-500 font-medium">
                Choose a plan that's right for you and start availling
                sponsorships
              </p>
            </div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
