import axios from "axios";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { fetchAndActivate, getString } from "firebase/remote-config";
import moment from "moment";
import useStore from "../Store/useStore";

const usePayment = (product, setPaymentLoading, setStep) => {
  const {
    user,
    setNotify,
    remoteConfig,
    quantity,
    setQuantity,
    customText,
    setCustomText,
  } = useStore();
  const db = getFirestore();

  const updateOnDb = async (paymentId, inputData, priceData) => {
    setPaymentLoading(true);
    try {
      const finalData = {
        ...inputData,
        cardType: product?.customizable ? "customized" : "",
        nameOnCard: product?.customizable ? customText : false,
        creationDate: moment().unix(),
        currency: priceData?.currency,
        discount: priceData?.discountAmmount,
        orderComplete: false,
        paymentId,
        orderStatus: {
          delivered: false,
          placed: true,
          shipped: false,
        },
        paidAmount: priceData?.total * quantity + priceData?.shippingCost,
        price: priceData?.pricePrev,
        productId: product?.productId,
        productImage: product?.blob[0]?.url,
        quantity,
        shippingCost: product?.shippingCost,
        userId: user?.userId,
      };
      const colRef = collection(db, "orders");
      const docRef = doc(colRef);
      await setDoc(docRef, { ...finalData, orderId: docRef.id });
      setQuantity(1);
      setCustomText("");
      setPaymentLoading(false);
      setStep(100);
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong on our end" });
    }
  };

  const procced = async (id, inputData, priceData) => {
    try {
      await fetchAndActivate(remoteConfig);
      const { key_id } = await JSON.parse(
        getString(remoteConfig, "razorpay_keys")
      );
      setPaymentLoading(false);
      const options = {
        key: key_id,
        name: "Flytant",
        amount: (
          (priceData?.priceNow * quantity + priceData?.shippingCost) *
          100
        ).toString(),
        currency: priceData?.currency,
        order_id: id,
        handler: ({ razorpay_payment_id }) => {
          updateOnDb(razorpay_payment_id, inputData, priceData);
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

  const startToPay = async (inputData, priceData) => {
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
      } = await axios.post("https://flytant.herokuapp.com/createpayment", {
        ammount: priceData?.priceNow * quantity + priceData?.shippingCost,
        currency: priceData?.currency,
        notes: {
          userId: user?.userId,
          productId: product?.productId,
        },
      });
      procced(id, inputData, priceData);
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { startToPay };
};

export default usePayment;
