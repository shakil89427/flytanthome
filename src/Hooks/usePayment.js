import axios from "axios";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { fetchAndActivate, getString } from "firebase/remote-config";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../Store/useStore";
import { logEvent } from "firebase/analytics";

const usePayment = (plan, setPaymentLoading) => {
  const { user, setUser, setNotify, remoteConfig, analytics } = useStore();
  const db = getFirestore();
  const navigate = useNavigate();
  const location = useLocation();

  const updateOnDb = async (orderId) => {
    try {
      logEvent(analytics, "purchase", {
        currency: plan.currency,
        transaction_id: orderId,
        value: plan.priceNow,
        items: [
          {
            item_id: plan.id,
            item_name: "Web_subscription",
          },
        ],
      });
    } catch (err) {}
    try {
      setPaymentLoading(true);
      const tempData = {
        couponCode: "",
        currencyCode: plan?.currency,
        orderDate: moment().unix(),
        orderId,
        plan: plan?.name,
        price: plan?.priceNow,
        subscriptionDays: plan?.subscriptionDays,
      };
      const expiry = plan?.subscriptionDays * 86400;

      let tempUpdated = {};

      if (user?.subscriptionEndingDate >= moment().unix()) {
        tempUpdated.subscriptionEndingDate =
          user?.subscriptionEndingDate + expiry;
        tempUpdated.numberOfApplies = user?.numberOfApplies
          ? user?.numberOfApplies + plan?.numberOfApplies
          : plan?.numberOfApplies;
        tempUpdated.messageCredits = user?.messageCredits
          ? user?.messageCredits + plan?.messageCredits
          : plan?.messageCredits;
      } else {
        tempUpdated.subscriptionEndingDate = moment().unix() + expiry;
        tempUpdated.numberOfApplies = plan?.numberOfApplies;
        tempUpdated.messageCredits = plan?.messageCredits;
      }

      const updated = {
        ...tempUpdated,
        isSubscribed: true,
        subscriptions: arrayUnion(tempData),
      };
      const userRef = doc(db, "users", user.userId);
      await updateDoc(userRef, updated);
      const res = await getDoc(userRef);
      setUser({ ...res.data(), id: res.id });
      setPaymentLoading(false);
      navigate("/paymentsuccess", { state: { from: location } });
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong on our end" });
    }
  };

  const procced = async (id) => {
    try {
      await fetchAndActivate(remoteConfig);
      const { key_id } = await JSON.parse(
        getString(remoteConfig, "razorpay_keys")
      );
      setPaymentLoading(false);
      const options = {
        key: key_id,
        name: "Flytant",
        amount: (plan?.priceNow * 100).toString(),
        currency: plan?.currency,
        order_id: id,
        handler: ({ razorpay_payment_id }) => {
          updateOnDb(razorpay_payment_id);
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response) => {
        setNotify({ status: false, messgae: "Payment failed" });
      });
      razorpay.open();
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const startToPay = async () => {
    setPaymentLoading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      setPaymentLoading(false);
      return setNotify({
        status: false,
        message: "Razorpay SDK failed to load. Are you online?",
      });
    }
    try {
      const {
        data: { id },
      } = await axios.post("http://localhost:5000/createpayment", {
        ammount: plan?.priceNow,
        currency: plan?.currency,
        notes: {
          userId: user?.userId,
          planName: plan?.name,
          subscriptionDays: plan?.subscriptionDays,
        },
      });
      procced(id);
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { startToPay };
};

export default usePayment;
