import React, { useState, useEffect } from "react";
import Spinner from "../Components/Spinner/Spinner";
import useStore from "../Store/useStore";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../Hooks/useAnalytics";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import moment from "moment";

const MyOrders = () => {
  const { user, myOrders, setMyOrders } = useStore();
  const { addLog } = useAnalytics();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const db = getFirestore();
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user?.userId),
        orderBy("creationDate", "desc")
      );
      const { docs } = await getDocs(q);
      const finalData = docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMyOrders(finalData);
      setLoading(false);
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (myOrders?.length > 0) {
      setLoading(false);
    } else {
      getOrders();
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (err) {
    return (
      <div className="r-box py-20">
        <p className="text-center">Something went wrong</p>
      </div>
    );
  }
  return (
    <div className="r-box py-20">
      <div className="md:px-5">
        <h1 className="text-2xl font-semibold mb-3">My Orders</h1>
        <div className="w-[90%] md:w-[80%] mx-auto my-12 grid grid-cols-1 gap-5">
          {myOrders?.length < 1 && (
            <div className="flex flex-col items-center justify-center gap-4 mt-10">
              <p className="font-semibold lg:text-xl">No Order Placed Yet!</p>
              <p
                className="bg-black text-white rounded-full px-5 py-2 font-medium cursor-pointer"
                onClick={() => {
                  addLog("buy_card");
                  navigate("/socialcard");
                }}
              >
                Buy Card
              </p>
            </div>
          )}
          {myOrders?.length > 0 &&
            myOrders?.map((order) => (
              <div
                style={{
                  boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
                }}
                key={order?.id}
                className="grid grid-cols-1 lg:grid-cols-4 gap-5 p-5 rounded-lg"
              >
                <div className="">
                  <img
                    src={order?.productImage}
                    alt=""
                    className="lg:w-[90%]"
                  />
                </div>
                <div className="">
                  <p className="text-xl lg:text-2xl font-bold mb-1">
                    {order?.productName}
                  </p>
                  <p className="text-lg lg:hidden font-semibold mb-1">
                    {order?.currency}
                    {order?.price}
                  </p>
                  {order?.cardType?.toLowerCase() === "customized" && (
                    <p className="font-medium mb-1 text-gray-500">
                      Customizable
                    </p>
                  )}
                  <p className="mb-1 font-medium text-gray-500">
                    Ordered{" "}
                    {moment.unix(order?.creationDate).format("DD MMM YYYY")}
                  </p>
                  <p className="font-medium lg:hidden">
                    {order?.delivered
                      ? "Delivered"
                      : order?.shipped
                      ? "Shipped"
                      : "Ordered"}
                  </p>
                </div>
                <p className="text-lg lg:text-xl font-semibold text-center hidden lg:block">
                  {order?.currency}
                  {order?.price}
                </p>
                <p className="font-medium text-center hidden lg:block">
                  {order?.delivered
                    ? "Delivered"
                    : order?.shipped
                    ? "Shipped"
                    : "Ordered"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
