import axios from "axios";
import React, { useState, useEffect } from "react";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import { Outlet } from "react-router-dom";
import { fetchAndActivate, getString } from "firebase/remote-config";

const Products = () => {
  const { products, setProducts, remoteConfig } = useStore();
  const [loading, setLoading] = useState(true);

  const calculate = async (items) => {
    await fetchAndActivate(remoteConfig);
    const { inShippingCharges, usShippingCharges } = await JSON.parse(
      getString(remoteConfig, "shippingCharges")
    );
    const maped = items?.map((item) => {
      const usFinal = {
        priceNow: item?.usPrice,
        pricePrev: item?.usStrikeThroughPrice,
        symbol: "$",
        currency: "USD",
        shippingCost: usShippingCharges,
        discount: Math.floor(
          100 - (item?.usPrice * 100) / item?.usStrikeThroughPrice
        ),
        discountAmmount: item?.usStrikeThroughPrice - item?.usPrice,
      };
      const inFinal = {
        priceNow: item?.inPrice,
        pricePrev: item?.inStrikeThroughPrice,
        symbol: "₹",
        currency: "INR",
        shippingCost: inShippingCharges,
        discount: Math.floor(
          100 - (item?.inPrice * 100) / item?.inStrikeThroughPrice
        ),
        discountAmmount: item?.inStrikeThroughPrice - item?.inPrice,
      };
      return { ...item, usFinal, inFinal };
    });
    setProducts(maped);
    setLoading(false);
  };

  useEffect(() => {
    if (products?.length < 1) {
      axios
        .get("http://localhost:5000/products")
        .then(({ data }) => calculate(data))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="pt-14 pb-28 r-box">
      <Outlet />
    </div>
  );
};

export default Products;
