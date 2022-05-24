import axios from "axios";
import useStore from "../Store/useStore";

const usePayment = (plan, time) => {
  const { setNotify } = useStore();

  const startToPay = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/createpayment");
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
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { startToPay };
};

export default usePayment;
