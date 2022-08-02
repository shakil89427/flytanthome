import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAnalytics from "../../Hooks/useAnalytics";
import useStore from "../../Store/useStore";

const OrderDetails = () => {
  const { myOrders } = useStore();
  const { productName } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const { addLog } = useAnalytics();

  useEffect(() => {
    const matched = myOrders.find(
      (order) =>
        order?.productName?.toLowerCase() === productName?.toLowerCase()
    );
    if (matched?.id) {
      setOrder(matched);
    } else {
      navigate("/myorders");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5">
      {/*  */}
      <div
        style={{
          boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-5 xl:p-10 rounded-lg"
      >
        <div>
          <p className="font-semibold mb-5">Delivery Address</p>
          <p className="text-lg lg:text-xl font-bold mb-2">{order?.name}</p>
          <p className="mb-2 max-w-[320px] text-gray-500">
            {`${order?.address}, ${order?.city}, ${order?.state}, ${order?.country} ${order?.landmark}`}
          </p>
          <p className="mb-2 text-gray-500 break-all">
            <span className="font-medium text-black">Email -</span>{" "}
            {order?.email}
          </p>
          <p className="text-gray-500 break-all">
            <span className="font-medium text-black">Phone number -</span>{" "}
            {order?.contactNumber}
          </p>
        </div>
        <div className="">
          <p className="font-semibold mb-5">Order ID</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10">
            <div className="w-full">
              <p className="text-gray-500 mb-2 break-all">{order?.orderId}</p>
              <p className="text-gray-500">
                <span className="font-medium text-black">Ordered on - </span>
                {moment.unix(order?.creationDate).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="">
              <a
                onClick={() => addLog("contact_us")}
                href="mailto:orders@flytant.com"
                target="_blank"
                rel="noreferrer"
              >
                <p className="border-2 flex items-center justify-center h-12 rounded-md text-gray-500 font-semibold">
                  Contact us
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        style={{
          boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
        }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-10 p-5 lg:p-10 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="">
            <img src={order?.productImage} alt="" className="lg:w-[90%]" />
          </div>
          <div>
            <p className="text-lg lg:text-xl font-bold mb-1">
              {order?.productName}
            </p>
            {order?.cardType?.toLowerCase() === "customized" && (
              <p className="font-medium mb-1 text-gray-500">Customizable</p>
            )}
            <p className="font-semibold mb-1">{order?.name}</p>
            <p className="font-medium text-gray-500">QTY-{order?.quantity}</p>
          </div>
        </div>
        {/* Progress 1 */}
        <div className="md:hidden flex items-center gap-5">
          <div className="flex flex-col items-center justify-between relative w-fit h-full">
            <div className="w-4 h-4 rounded-full bg-black" />
            <div
              className={`w-4 h-4 rounded-full ${
                order?.orderStatus?.shipped ? "bg-black" : "bg-gray-400"
              }`}
            />
            <div
              className={`w-4 h-4 rounded-full ${
                order?.orderStatus?.delivered ? "bg-black" : "bg-gray-400"
              }`}
            />
            <div className="absolute h-full top-0 w-1 bg-gray-400 -z-20" />
            <div
              className={`absolute top-0 w-1 bg-black -z-10 ${
                order?.orderStatus?.delivered
                  ? "h-full"
                  : order?.orderStatus?.shipped
                  ? "h-1/2"
                  : "h-0"
              }`}
            />
          </div>
          <div className="grid grid-rows-3 gap-16 font-semibold text-sm">
            <div>
              <p>Order Confirmed</p>
              {order?.creationDate && (
                <p>{moment.unix(order?.creationDate).format("DD MMM YYYY")}</p>
              )}
            </div>
            <div>
              <p>Order Shipped</p>
              {order?.shippedDate && (
                <p>{moment.unix(order?.shippedDate).format("DD MMM YYYY")}</p>
              )}
            </div>
            <div>
              <p>Order Delivered</p>
              {order?.deliverDate && (
                <p>{moment.unix(order?.deliverDate).format("DD MMM YYYY")}</p>
              )}
            </div>
          </div>
        </div>
        {/* Progress 2 */}
        <div className="mt-2 hidden md:block">
          <div className="text-sm font-semibold grid grid-cols-3 text-center">
            <p>Order Confirmed</p>
            <p>Order Shipped</p>
            <p>Order Delivered</p>
          </div>
          <div className="my-5 flex items-center justify-between relative w-[70%] mx-auto">
            <div className="w-5 h-5 rounded-full bg-black" />
            <div
              className={`w-5 h-5 rounded-full ${
                order?.orderStatus?.shipped ? "bg-black" : "bg-gray-400"
              }`}
            />
            <div
              className={`w-5 h-5 rounded-full ${
                order?.orderStatus?.delivered ? "bg-black" : "bg-gray-400"
              }`}
            />
            <div className="absolute w-full left-0 h-1 bg-gray-400 -z-20" />
            <div
              className={`absolute left-0 h-1 bg-black -z-10 ${
                order?.orderStatus?.delivered
                  ? "w-full"
                  : order?.orderStatus?.shipped
                  ? "w-1/2"
                  : "w-0"
              }`}
            />
          </div>
          <div className="text-sm font-semibold grid grid-cols-3 text-center">
            {order?.creationDate && (
              <p>{moment.unix(order?.creationDate).format("DD MMM YYYY")}</p>
            )}
            {order?.shippedDate && (
              <p>{moment.unix(order?.shippedDate).format("DD MMM YYYY")}</p>
            )}
            {order?.deliverDate && (
              <p>{moment.unix(order?.deliverDate).format("DD MMM YYYY")}</p>
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div
        style={{
          boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
        }}
        className="rounded-lg p-5 xl:p-10"
      >
        <p className="font-semibold mb-5">Price Details</p>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 font-medium">
          <div className="flex items-center justify-between lg:flex-col lg:items-start gap-2">
            <p>Price</p>
            <p>
              {order?.currency}
              {order?.price}
            </p>
          </div>
          <div className="flex items-center justify-between lg:flex-col lg:items-start gap-2">
            <p>Discount</p>
            <p className="text-green-600">
              -{order?.currency}
              {order?.discount}
            </p>
          </div>
          <div className="flex items-center justify-between lg:flex-col lg:items-start gap-2">
            <p>Quantity</p>
            <p>x{order?.quantity}</p>
          </div>
          <div className="flex items-center justify-between lg:flex-col lg:items-start gap-2">
            <p>Delivery charges</p>
            <p className="text-red-600">
              +{order?.currency}
              {order?.shippingCost}
            </p>
          </div>
          <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2">
            <p>Total</p>
            <p className="font-bold">
              {order?.currency}
              {order?.paidAmount}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-40 text-center">
        <p className="text-lg lg:text-xl font-semibold mb-2">
          You're Important to us
        </p>
        <p className="text-gray-500">Your product will be delivered safely</p>
      </div>
    </div>
  );
};

export default OrderDetails;
