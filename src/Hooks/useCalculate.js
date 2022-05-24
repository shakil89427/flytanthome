const useCalculate = (setPlans, setDataLoading) => {
  /* USD Calculate */
  const usd = (allPlans, info) => {
    const maped = allPlans.map((item) => {
      const prev = item.usBasePrice;
      const now = prev - Math.ceil((prev * item.usPercentageOff) / 100);
      return {
        ...item,
        prices: [
          {
            type: "monthly",
            pricePrev: false,
            priceNow: prev,
          },
          {
            type: "3 months",
            pricePrev: prev * 3,
            priceNow: now * 3,
          },
          {
            type: "6 months",
            pricePrev: prev * 6,
            priceNow: now * 6,
          },
          {
            type: "anuallay",
            pricePrev: prev * 12,
            priceNow: now * 12,
          },
        ],
        percentageOff: item.usPercentageOff,
        currency: info.currency,
        symbol: info.symbol,
      };
    });
    setPlans(maped);
    setDataLoading(false);
  };

  /* INR Calculate */
  const inr = (allPlans, info) => {
    const maped = allPlans.map((item) => {
      const prev = item.inBasePrice;
      const now = prev - Math.ceil((prev * item.inPercentageOff) / 100);
      return {
        ...item,
        prices: [
          {
            type: "monthly",
            pricePrev: false,
            priceNow: prev,
          },
          {
            type: "3 months",
            pricePrev: prev * 3,
            priceNow: now * 3,
          },
          {
            type: "6 months",
            pricePrev: prev * 6,
            priceNow: now * 6,
          },
          {
            type: "anuallay",
            pricePrev: prev * 12,
            priceNow: now * 12,
          },
        ],
        percentageOff: item.inPercentageOff,
        currency: info.currency,
        symbol: info.symbol,
      };
    });
    setPlans(maped);
    setDataLoading(false);
  };

  /* Other Calculate */
  const other = (allPlans, info) => {
    const maped = allPlans.map((item) => {
      const prev = item.usBasePrice * info.value;
      const now = prev - Math.ceil((prev * item.usPercentageOff) / 100);
      return {
        ...item,
        prices: [
          {
            type: "monthly",
            pricePrev: false,
            priceNow: prev,
          },
          {
            type: "3 months",
            pricePrev: prev * 3,
            priceNow: now * 3,
          },
          {
            type: "6 months",
            pricePrev: prev * 6,
            priceNow: now * 6,
          },
          {
            type: "anuallay",
            pricePrev: prev * 12,
            priceNow: now * 12,
          },
        ],
        percentageOff: item.usPercentageOff,
        currency: info.currency,
        symbol: info.symbol,
      };
    });
    setPlans(maped);
    setDataLoading(false);
  };

  return { usd, inr, other };
};

export default useCalculate;
