import axios from "axios";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import moment from "moment";
import useStore from "../Store/useStore";

const usePayment = (plan, time, setPaymentLoading) => {
  const { user, setNotify } = useStore();
  const db = getFirestore();

  const updateOnDb = async ({ orderId, price }) => {
    try {
      setPaymentLoading(true);
      const tempData = {
        couponCode: "",
        currencyCode: plan.currency,
        orderDate: moment().unix(),
        orderId,
        planName: plan.name,
        price,
        subscriptionDays: time,
      };
      const expiry = time * 86400;
      const subscriptionEndingDate =
        user?.subscriptionEndingDate > moment().unix()
          ? user?.subscriptionEndingDate + expiry
          : moment().unix() + expiry;
      const updated = {
        subscriptionEndingDate,
        isSubscribed: true,
        subscriptions: arrayUnion(tempData),
      };
      const userRef = doc(db, "users", user.userId);
      await updateDoc(userRef, updated);
      setPaymentLoading(false);
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong on our end" });
    }
  };

  const procced = (id, price) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      name: "Flytant",
      description: "It will be a short description",
      image: "https://picsum.photos/seed/picsum/200/300",
      amount: price * 100,
      currency: plan.currency,
      order_id: id,
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      handler: ({ razorpay_payment_id }) => {
        updateOnDb({ orderId: razorpay_payment_id, price });
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      console.log(response);
    });
    razorpay.open();
  };

  const createInstance = async () => {
    const { priceNow } = plan.prices.find((i) => time === i.subscriptionDays);
    try {
      const {
        data: { id },
      } = await axios.post("https://flytant.herokuapp.com/createpayment", {
        ammount: priceNow,
        currency: plan.currency,
        notes: {
          userId: user.userId,
          planName: plan.name,
          subscriptionDays: time,
        },
      });
      procced(id, priceNow);
      setPaymentLoading(false);
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  const startToPay = async () => {
    setPaymentLoading(true);
    try {
      const addedScript = await new Promise((resolve) => {
        const src = "https://checkout.razorpay.com/v1/checkout.js";
        const script = document.createElement("script");
        script.src = src;
        document.body.appendChild(script);
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
      });
      if (addedScript) {
        createInstance();
      } else {
        setPaymentLoading(false);
        setNotify({ status: false, message: "Something went wrong" });
      }
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { startToPay };
};

export default usePayment;
