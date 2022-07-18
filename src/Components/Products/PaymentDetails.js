import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Input from "./Input";
import useProductPayment from "../../Hooks/useProductPayment";
import Spinner from "../Spinner/Spinner";

const PaymentDetails = () => {
  const { user, products, setShowLogin, countryCode, setNotify, quantity } =
    useStore();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState(false);
  const { startToPay } = useProductPayment(product, setPaymentLoading, setStep);
  const navigate = useNavigate();
  const location = useLocation();
  const [focused, setFocused] = useState({});
  /* Form Data Start*/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [landMark, setLandMark] = useState("");
  /* Form Data End*/

  const processPayment = () => {
    if (!user?.userId) return setShowLogin(true);
    const inputData = {
      name,
      email,
      phone,
      pinCode,
      city,
      state,
      country,
      address,
      landMark,
    };
    const priceData =
      user?.countryCode === "IN" || countryCode === "IN"
        ? product?.inFinal
        : product?.usFinal;
    startToPay(inputData, priceData);
  };

  const saveForm = (e) => {
    e.preventDefault();
    if (!phone) {
      return setNotify({ status: false, message: "Enter a valid number" });
    }
    if (!isValidPhoneNumber(phone)) {
      return setNotify({ status: false, message: "Invalid number" });
    }
    if (
      name?.length > 0 &&
      email?.length > 0 &&
      phone?.length > 0 &&
      pinCode?.length > 0 &&
      city?.length > 0 &&
      state?.length > 0 &&
      country?.length > 0 &&
      address?.length > 0 &&
      landMark?.length > 0
    ) {
      setStep(50);
    }
  };

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
      {paymentLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#85848448] z-[999] flex items-center justify-center">
          <Spinner />
        </div>
      )}
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
        {step === 0 && (
          <form onSubmit={saveForm}>
            <p className="font-semibold text-lg md:text-xl xl:text-2xl mt-20 mb-10">
              Contact Information
            </p>
            <div className="grid grid-cols-1 gap-5">
              <Input
                name={"name"}
                value={name}
                setValue={setName}
                focused={focused}
                setFocused={setFocused}
                placeHolder={"Full name"}
                type={"text"}
              />
              <Input
                name={"email"}
                value={email}
                setValue={setEmail}
                focused={focused}
                setFocused={setFocused}
                placeHolder={"Email address"}
                type={"email"}
              />
              <PhoneInput
                className="border-2 h-11 p-2 overflow-hidden otpNumber"
                international
                defaultCountry={countryCode || "US"}
                countryCallingCodeEditable={false}
                value={phone}
                onChange={setPhone}
              />
            </div>
            <p className="font-semibold text-lg md:text-xl xl:text-2xl mt-12 mb-10">
              Address Details
            </p>
            <div className="grid grid-cols-2 gap-5">
              <Input
                name={"pinCode"}
                value={pinCode}
                setValue={setPinCode}
                focused={focused}
                setFocused={setFocused}
                placeHolder={"Pincode"}
                type={"text"}
              />
              <Input
                name={"city"}
                value={city}
                setValue={setCity}
                focused={focused}
                setFocused={setFocused}
                placeHolder={"City"}
                type={"text"}
              />
              <Input
                name={"state"}
                value={state}
                setValue={setState}
                focused={focused}
                setFocused={setFocused}
                placeHolder={"State"}
                type={"text"}
              />
              <Input
                name={"country"}
                value={country}
                setValue={setCountry}
                focused={focused}
                setFocused={setFocused}
                placeHolder={"Country"}
                type={"text"}
              />
              <div className="col-span-2">
                <Input
                  name={"address"}
                  value={address}
                  setValue={setAddress}
                  focused={focused}
                  setFocused={setFocused}
                  placeHolder={"Address Line 1"}
                  type={"text"}
                />
              </div>
              <div className="col-span-2">
                <Input
                  name={"landMark"}
                  value={landMark}
                  setValue={setLandMark}
                  focused={focused}
                  setFocused={setFocused}
                  placeHolder={"Landmark"}
                  type={"text"}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-black text-white py-3 mt-5 block ml-auto w-1/2 font-medium"
            >
              Continue
            </button>
          </form>
        )}
        {step === 50 && (
          <div>
            <p
              onClick={processPayment}
              className="mt-20 mb-10 bg-black text-white py-3 text-center text-lg font-medium rounded-md cursor-pointer"
            >
              Checkout
            </p>
            <div className="flex items-center justify-between font-medium text-gray-500">
              <p>Deliver to:</p>
              <p
                onClick={() => setStep(0)}
                className="border-2 px-3 py-1 rounded-md cursor-pointer"
              >
                Change
              </p>
            </div>
            <div>
              <p className="font-semibold my-5">{name}</p>
              <p className="max-w-[350px]">{`${address}, ${city}, ${state}, ${country} ${landMark}`}</p>
              <p className="mt-5">{phone}</p>
            </div>
            <div className="my-10 py-10 border-t border-b grid grid-cols-5 gap-3">
              <div className="col-span-3">
                <p className="font-semibold text-lg md:text-xl">
                  {product?.name}
                </p>
                {product?.customizable && (
                  <p className="mt-2 text-gray-500">Customizable</p>
                )}
                <div className="flex items-center gap-5 mt-5">
                  {user?.countryCode === "IN" || countryCode === "IN" ? (
                    <p className="font-bold text-md md:text-lg lg:text-xl">
                      {product?.inFinal?.symbol}
                      {product?.inFinal?.priceNow}
                    </p>
                  ) : (
                    <p className="font-bold text-md md:text-lg lg:text-xl">
                      {product?.usFinal?.symbol}
                      {product?.usFinal?.priceNow}
                    </p>
                  )}
                  {user?.countryCode === "IN" || countryCode === "IN" ? (
                    <p className="text-[#06A015] font-semibold text-sm md:text-md">
                      {product?.inFinal?.discount}% off
                    </p>
                  ) : (
                    <p className="text-[#06A015] font-semibold text-sm md:text-md">
                      {product?.usFinal?.discount}% off
                    </p>
                  )}
                </div>
                <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-500">
                  {user?.countryCode === "IN" || countryCode === "IN" ? (
                    <del>
                      {product?.inFinal?.symbol}
                      {product?.inFinal?.pricePrev}
                    </del>
                  ) : (
                    <del>
                      {product?.usFinal?.symbol}
                      {product?.usFinal?.pricePrev}
                    </del>
                  )}
                </p>
              </div>
              <div className="col-span-2">
                <img src={product?.blob[0]?.url} alt="" />
                <p className="mt-3 text-center font-medium text-gray-500">
                  QTY- {quantity}
                </p>
              </div>
            </div>
            <div className="font-semibold">
              <p className="font-bold">Price Details</p>
              <div className="flex items-center justify-between mt-5">
                <p>Price</p>
                {user?.countryCode === "IN" || countryCode === "IN" ? (
                  <p>
                    {product?.inFinal?.symbol}
                    {product?.inFinal?.pricePrev}
                  </p>
                ) : (
                  <p>
                    {product?.usFinal?.symbol}
                    {product?.usFinal?.pricePrev}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-5">
                <p>Discount</p>
                {user?.countryCode === "IN" || countryCode === "IN" ? (
                  <p className=" text-green-700">
                    -{product?.inFinal?.symbol}
                    {product?.inFinal?.discountAmmount}
                  </p>
                ) : (
                  <p className=" text-green-700">
                    -{product?.usFinal?.symbol}
                    {product?.usFinal?.discountAmmount}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-5">
                <p>Delivery charges</p>
                {user?.countryCode === "IN" || countryCode === "IN" ? (
                  <p className=" text-red-700">
                    +{product?.inFinal?.symbol}
                    {product?.inFinal?.shippingCost}
                  </p>
                ) : (
                  <p className=" text-red-700">
                    +{product?.usFinal?.symbol}
                    {product?.usFinal?.shippingCost}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-5 pb-10 border-b">
                <p>Quantity</p>
                <p>x{quantity}</p>
              </div>
              <div className="flex items-center justify-between font-bold mt-5">
                <p>Total Ammount</p>
                {user?.countryCode === "IN" || countryCode === "IN" ? (
                  <p>
                    {product?.inFinal?.symbol}
                    {product?.inFinal?.priceNow * quantity +
                      product?.inFinal?.shippingCost}
                  </p>
                ) : (
                  <p>
                    {product?.usFinal?.symbol}
                    {product?.usFinal?.priceNow * quantity +
                      product?.usFinal?.shippingCost}
                  </p>
                )}
              </div>
              <p
                onClick={processPayment}
                className="mt-20 mb-10 bg-black text-white py-3 text-center text-lg font-medium rounded-md cursor-pointer"
              >
                Checkout
              </p>
            </div>
          </div>
        )}
        {step === 100 && (
          <div className="mt-20">
            <p className="text-center text-lg font-medium">
              Order placed successfully
            </p>
            <p
              onClick={() => navigate("/products")}
              className="w-fit px-5 py-3 bg-black text-white mx-auto cursor-pointer rounded-md mt-5"
            >
              Back to Products
            </p>
          </div>
        )}
      </div>
      <div>
        <p className="flex items-center justify-center gap-5 text-lg font-semibold">
          <AiFillSafetyCertificate className="text-2xl" />
          <span>Safe and Secure Payments</span>
        </p>
        <p className="mt-20 text-center font-semibold text-gray-600">
          You're valuable to us!!
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;
