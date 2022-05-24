import axios from "axios";
import useStore from "../Store/useStore";

const usePayment = (plan, time, setPaymentLoading) => {
  const { setNotify } = useStore();

  const procced = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data?.amount,
      currency: data?.currency,
      name: "Flytant",
      description: "Test Transaction",
      image:
        "https://spng.pngfind.com/pngs/s/18-187058_free-png-download-hand-with-dollar-sign-png.png",
      order_id: data?.id,
      handler: (response) => {
        console.log(response);
      },
      prefill: {
        name: "Shakil Ahmed",
        email: "shakilahmed89427@gmail.com",
      },
      notes: {
        address: "Flytant India",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      console.log(response);
    });
    razorpay.open();
  };

  const createInstance = async () => {
    try {
      const { data } = await axios.post(
        "https://flytant.herokuapp.com/createpayment"
      );
      procced(data);
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
        script.setAttribute("id", "razorscript");
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
