import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from "../Assets/logoBlack.png";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchAndActivate, getString } from "firebase/remote-config";
import useAnalytics from "../Hooks/useAnalytics";

const Products = () => {
  const { products, setProducts, remoteConfig, authState, mixpanelLog } =
    useStore();
  const { addLog } = useAnalytics();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    if (authState) return;
    if (products?.length < 1) {
      axios
        .get("https://arcane-castle-29935.herokuapp.com/products")
        .then((res) => calculate(res.data))
        .catch((err) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [authState]);

  if (authState) {
    return (
      <div className="r-box h-14 md:h-24 flex items-center justify-start border-b">
        <img
          onClick={() => {
            addLog("nav_logo");
            navigate("/");
          }}
          className="cursor-pointer w-[130px] md:w-[185px]"
          src={logo}
          alt=""
        />
      </div>
    );
  }

  return (
    <>
      <div className="r-box h-14 md:h-24 flex items-center justify-start border-b">
        <img
          onClick={() => {
            addLog("nav_logo");
            mixpanelLog("clicked_nav_logo");
            navigate("/");
          }}
          className="cursor-pointer w-[130px] md:w-[185px]"
          src={logo}
          alt=""
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="pt-14 pb-28 r-box">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Products;
