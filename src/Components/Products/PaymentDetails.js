import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";

const PaymentDetails = () => {
  const { user, products } = useStore();
  const [product, setProduct] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!user?.userId) return navigate("/products");
    try {
      const id = location.state.from.pathname.split("/products/")[1];
      const matched = products.find((item) => item.id === id);
      if (matched.id) {
        setProduct(matched);
      }
    } catch (err) {
      navigate("/products");
    }
    window.scroll(0, 0);
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1200px] mx-auto">
      {/* Left */}
      <div>
        {/* Step */}
        <div className="flex items-center justify-between relative font-medium w-[80%] mx-auto">
          <p className="w-10 h-10 border-2 rounded-full flex items-center justify-center border-black text-black relative bg-white">
            <span>1</span>
            <span className="absolute top-11">Address</span>
          </p>
          <p
            style={{
              color: step >= 50 ? "black" : "#a19f9fa6",
              borderColor: step >= 50 ? "black" : "#c7c5c577",
            }}
            className="w-10 h-10 border-2 rounded-full flex items-center justify-center relative bg-white"
          >
            <span>2</span>
            <span className="absolute top-11">Order</span>
          </p>
          <p
            style={{
              color: step === 100 ? "black" : "#a19f9fa6",
              borderColor: step === 100 ? "black" : "#c7c5c577",
            }}
            className="w-10 h-10 border-2 rounded-full flex items-center justify-center relative bg-white"
          >
            <span>3</span>
            <span className="absolute top-11">Payment</span>
          </p>
          <div className="absolute w-full h-[2px] bg-[#a19f9f3f] -z-20" />
          <div
            style={{ width: `${step}%` }}
            className="absolute h-[2px] bg-black -z-10 duration-150"
          />
        </div>
        <form action="#">
          <p className="font-semibold text-lg md:text-xl xl:text-2xl mt-20 mb-10">
            Contact Information
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
