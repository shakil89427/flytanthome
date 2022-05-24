const usePayment = (plan, time, setPaymentLoading) => {
  const startToPay = () => {
    console.log(plan, time);
  };
  return { startToPay };
};

export default usePayment;
