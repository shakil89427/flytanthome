import axios from "axios";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import useStore from "../Store/useStore";

const usePayment = (plan, setPaymentLoading) => {
  const { user, setUser, setNotify } = useStore();
  const db = getFirestore();

  const updateOnDb = async (orderId) => {
    try {
      setPaymentLoading(true);
      const tempData = {
        couponCode: "",
        currencyCode: plan?.currency,
        orderDate: moment().unix(),
        orderId,
        planName: plan?.name,
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
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong on our end" });
    }
  };

  const procced = (id) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      name: "Flytant",
      description: "It will be a short description",
      image: "https://picsum.photos/seed/picsum/200/300",
      amount: plan?.priceNow * 100,
      currency: plan?.currency,
      order_id: id,
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      handler: ({ razorpay_payment_id }) => {
        updateOnDb(razorpay_payment_id);
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      console.log(response);
    });
    razorpay.open();
  };

  const startToPay = async () => {
    setPaymentLoading(true);
    try {
      const {
        data: { id },
      } = await axios.post("https://flytant.herokuapp.com/createpayment", {
        ammount: plan?.priceNow,
        currency: plan?.currency,
        notes: {
          userId: user?.userId,
          planName: plan?.name,
          subscriptionDays: plan?.subscriptionDays,
        },
      });
      procced(id);
      setPaymentLoading(false);
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { startToPay };
};

export default usePayment;
