import moment from "moment";
import React from "react";
import useStore from "../../Store/useStore";
import { useNavigate } from "react-router-dom";
import useAnalytics from "../../Hooks/useAnalytics";

const AllOrders = () => {
  const { myOrders } = useStore();
  const { addLog } = useAnalytics();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-5">
      {myOrders?.length > 0 &&
        myOrders?.map((order) => (
          <div
            style={{
              boxShadow: `0px 0px 15px 0px rgba(13,12,12,.10)`,
            }}
            onClick={() => {
              addLog("order_details");
              navigate(`/myorders/${order?.productName}`);
            }}
            key={order?.id}
            className="grid grid-cols-1 lg:grid-cols-4 gap-5 p-5 lg:p-10 rounded-lg cursor-pointer"
          >
            <div className="">
              <img src={order?.productImage} alt="" className="lg:w-[90%]" />
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
                <p className="font-medium mb-1 text-gray-500">Customizable</p>
              )}
              <p className="mb-1 font-medium text-gray-500">
                Ordered {moment.unix(order?.creationDate).format("DD MMM YYYY")}
              </p>
              <p className="font-medium lg:hidden">
                {order?.orderStatus?.delivered
                  ? "Delivered"
                  : order?.orderStatus?.shipped
                  ? "Shipped"
                  : "Ordered"}
              </p>
            </div>
            <p className="text-lg lg:text-xl font-semibold text-center hidden lg:block">
              {order?.currency}
              {order?.price}
            </p>
            <p className="font-medium text-center hidden lg:block">
              {order?.orderStatus?.delivered
                ? "Delivered"
                : order?.orderStatus?.shipped
                ? "Shipped"
                : "Ordered"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default AllOrders;
