import { useEffect } from "react";

const useCalculate = (
  currencyValue,
  allSubscriptions,
  setSubscriptions,
  setLoading
) => {
  useEffect(() => {
    if (!currencyValue?.currency) return;
    /* USD */
    if (currencyValue?.currency === "USD") {
      const filtered = allSubscriptions.map((item) => {
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
          currency: currencyValue?.currency,
          symbol: currencyValue?.symbol,
        };
      });
      setSubscriptions(filtered);
      return setLoading(false);
    }
    /* INR */
    if (currencyValue?.currency === "INR") {
      const filtered = allSubscriptions.map((item) => {
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
          currency: currencyValue?.currency,
          symbol: currencyValue?.symbol,
        };
      });
      setSubscriptions(filtered);
      return setLoading(false);
    }
    /* Others */
    const filtered = allSubscriptions.map((item) => {
      const prev = item.usBasePrice * currencyValue.value;
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
        currency: currencyValue?.currency,
        symbol: currencyValue?.symbol,
      };
    });
    setSubscriptions(filtered);
    setLoading(false);
  }, [allSubscriptions, currencyValue]);
};

export default useCalculate;
