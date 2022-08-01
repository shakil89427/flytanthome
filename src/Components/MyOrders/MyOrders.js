import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import useStore from "../../Store/useStore";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAnalytics from "../../Hooks/useAnalytics";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const MyOrders = () => {
  const { user, myOrders, setMyOrders } = useStore();
  const { addLog } = useAnalytics();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
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

  if (myOrders?.length < 1) {
    return (
      <div className="r-box py-20 flex flex-col items-center justify-center gap-4 mt-10">
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
    );
  }
  return (
    <div className="r-box py-20">
      <div className="md:px-5">
        <h1 className="text-lg lg:text-2xl font-semibold mb-3 flex items-center justify-start gap-x-2 flex-wrap">
          <p
            onClick={() => pathname !== "/myorders" && navigate("/myorders")}
            className={`${
              pathname === "/myorders" ? "cursor-auto" : "cursor-pointer"
            } select-none`}
          >
            My Orders
          </p>
          {pathname?.split("/")?.length > 2 && <p>{">"}</p>}
          {pathname?.split("/")?.length > 2 && (
            <p>{pathname.split("/")[2].replace(/%20/g, " ")}</p>
          )}
        </h1>
        <div className="w-[90%] md:w-[80%] mx-auto my-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
