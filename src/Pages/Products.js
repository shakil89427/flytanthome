import axios from "axios";
import React, { useState, useEffect } from "react";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import { Outlet } from "react-router-dom";

const Products = () => {
  const { user, products, setProducts } = useStore();
  const [loading, setLoading] = useState(true);

  const calculate = (items) => {
    const maped = items?.map((item) => {
      const priceNow =
        user?.countryCode === "IN" ? item?.inPrice : item?.usPrice;
      const pricePrev =
        user?.countryCode === "IN"
          ? item?.inStrikeThroughPrice
          : item?.usStrikeThroughPrice;
      const symbol = user?.countryCode === "IN" ? "₹" : "$";
      const discount = Math.floor(100 - (priceNow * 100) / pricePrev);
      const discountAmmount = pricePrev - priceNow;
      return {
        ...item,
        priceData: { priceNow, pricePrev, symbol, discount, discountAmmount },
      };
    });
    setProducts(maped);
    setLoading(false);
  };

  useEffect(() => {
    if (products?.length < 1) {
      axios
        .get("https://flytant.herokuapp.com/products")
        .then(({ data }) => calculate(data))
        .catch(() => setLoading(false));
    } else {
      calculate(products);
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
