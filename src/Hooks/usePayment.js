import axios from "axios";
import useStore from "../Store/useStore";

const usePayment = (plan, time, setPaymentLoading) => {
  const { setNotify } = useStore();

  const procced = (data) => {
    try {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Flytant",
        description: "Test Transaction",
        image:
          "https://w7.pngwing.com/pngs/912/392/png-transparent-jerry-mouse-tom-cat-tom-and-jerry-poster-tom-and-jerry-mammal-heroes-cat-like-mammal.png",
        order_id: data.id,
        handler: function (response) {
          console.log(response);
        },
        prefill: {
          name: "Shakil Ahmed",
          email: "shakilahmed89427@gmail.com",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  const createInstance = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/createpayment");
      procced(data);
      setPaymentLoading(false);
    } catch (err) {
      setPaymentLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
      document.getElementById("razorscript").remove();
    }
  };

  const startToPay = async () => {
    setPaymentLoading(true);
    try {
      const addedScript = await new Promise((resolve) => {
        const src = "https://checkout.razorpay.com/v1/checkout.js";
        const script = document.createElement("script");
        script.src = src;
        script.setAttribute("id", "razorscript");
        document.body.appendChild(script);
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
      });
      if (addedScript) {
        createInstance();
      } else {
        setPaymentLoading(true);
        setNotify({ status: false, message: "Something went wrong" });
      }
    } catch (err) {
      setPaymentLoading(true);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { startToPay };
};

export default usePayment;
