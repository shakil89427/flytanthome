import useStore from "../Store/useStore";

const useCalculate = (setDataLoading) => {
  const { setPlans } = useStore();
  /* USD Calculate */
  const usd = (allData) => {
    const maped = allData.map((item) => {
      return {
        ...item,
        prices: [
          {
            name: item.name,
            type: "monthly",
            pricePrev: Math.floor(item.usStrikePrice),
            priceNow: Math.floor(item.usBasePrice),
            percentageOff: item.usPercentageOff,
            subscriptionDays: 30,
            currency: "USD",
            symbol: "$",
            id: item.name + 1,
            messageCredits: item?.messageCredits ? item?.messageCredits : 0,
            numberOfApplies: item?.numberOfApplies ? item?.numberOfApplies : 0,
          },
          {
            name: item.name,
            type: "3 months",
            pricePrev: Math.floor(item.usBasePrice * 3),
            priceNow: Math.floor(
              item.usBasePrice * 3 - (item.usBasePrice * 3 * 5) / 100
            ),
            percentageOff: 5,
            subscriptionDays: 90,
            currency: "USD",
            symbol: "$",
            id: item.name + 2,
            messageCredits: item?.messageCredits ? item?.messageCredits * 3 : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 3
              : 0,
          },
          {
            name: item.name,
            type: "6 months",
            pricePrev: Math.floor(item.usBasePrice * 6),
            priceNow: Math.floor(
              item.usBasePrice * 6 - (item.usBasePrice * 6 * 10) / 100
            ),
            percentageOff: 10,
            subscriptionDays: 180,
            currency: "USD",
            symbol: "$",
            id: item.name + 3,
            messageCredits: item?.messageCredits ? item?.messageCredits * 6 : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 6
              : 0,
          },
          {
            name: item.name,
            type: "anually",
            pricePrev: Math.floor(item.usBasePrice * 12),
            priceNow: Math.floor(
              item.usBasePrice * 12 - (item.usBasePrice * 12 * 20) / 100
            ),
            percentageOff: 20,
            subscriptionDays: 360,
            currency: "USD",
            symbol: "$",
            id: item.name + 4,
            messageCredits: item?.messageCredits
              ? item?.messageCredits * 12
              : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 12
              : 0,
          },
        ],
      };
    });
    setPlans(maped);
    setDataLoading(false);
  };

  /* INR Calculate */
  const inr = (allData) => {
    const maped = allData.map((item) => {
      return {
        ...item,
        prices: [
          {
            name: item.name,
            type: "monthly",
            pricePrev: Math.floor(item.inStrikePrice),
            priceNow: Math.floor(item.inBasePrice),
            percentageOff: item.inPercentageOff,
            subscriptionDays: 30,
            currency: "INR",
            symbol: "₹",
            id: item.name + 1,
            messageCredits: item?.messageCredits ? item?.messageCredits : 0,
            numberOfApplies: item?.numberOfApplies ? item?.numberOfApplies : 0,
          },
          {
            name: item.name,
            type: "3 months",
            pricePrev: Math.floor(item.inBasePrice * 3),
            priceNow: Math.floor(
              item.inBasePrice * 3 - (item.inBasePrice * 3 * 5) / 100
            ),
            percentageOff: 5,
            subscriptionDays: 90,
            currency: "INR",
            symbol: "₹",
            id: item.name + 2,
            messageCredits: item?.messageCredits ? item?.messageCredits * 3 : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 3
              : 0,
          },
          {
            name: item.name,
            type: "6 months",
            pricePrev: Math.floor(item.inBasePrice * 6),
            priceNow: Math.floor(
              item.inBasePrice * 6 - (item.inBasePrice * 6 * 10) / 100
            ),
            percentageOff: 10,
            subscriptionDays: 180,
            currency: "INR",
            symbol: "₹",
            id: item.name + 3,
            messageCredits: item?.messageCredits ? item?.messageCredits * 6 : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 6
              : 0,
          },
          {
            name: item.name,
            type: "anually",
            pricePrev: Math.floor(item.inBasePrice * 12),
            priceNow: Math.floor(
              item.inBasePrice * 12 - (item.inBasePrice * 12 * 20) / 100
            ),
            percentageOff: 20,
            subscriptionDays: 360,
            currency: "INR",
            symbol: "₹",
            id: item.name + 4,
            messageCredits: item?.messageCredits
              ? item?.messageCredits * 12
              : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 12
              : 0,
          },
        ],
      };
    });
    setPlans(maped);
    setDataLoading(false);
  };

  /* Other Calculate */
  const other = (allData, info) => {
    const maped = allData.map((item) => {
      return {
        ...item,
        prices: [
          {
            name: item.name,
            type: "monthly",
            pricePrev: Math.floor(item.usStrikePrice * info.value),
            priceNow: Math.floor(item.usBasePrice * info.value),
            percentageOff: item.usPercentageOff,
            subscriptionDays: 30,
            currency: info.currency,
            symbol: info.symbol,
            id: item.name + 1,
            messageCredits: item?.messageCredits ? item?.messageCredits : 0,
            numberOfApplies: item?.numberOfApplies ? item?.numberOfApplies : 0,
          },
          {
            name: item.name,
            type: "3 months",
            pricePrev: Math.floor(item.usBasePrice * 3 * info.value),
            priceNow: Math.floor(
              item.usBasePrice * 3 * info.value -
                (item.usBasePrice * 3 * info.value * 5) / 100
            ),
            percentageOff: 5,
            subscriptionDays: 90,
            currency: info.currency,
            symbol: info.symbol,
            id: item.name + 2,
            messageCredits: item?.messageCredits ? item?.messageCredits * 3 : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 3
              : 0,
          },
          {
            name: item.name,
            type: "6 months",
            pricePrev: Math.floor(item.usBasePrice * 6 * info.value),
            priceNow: Math.floor(
              item.usBasePrice * 6 * info.value -
                (item.usBasePrice * 6 * info.value * 10) / 100
            ),
            percentageOff: 10,
            subscriptionDays: 180,
            currency: info.currency,
            symbol: info.symbol,
            id: item.name + 3,
            messageCredits: item?.messageCredits ? item?.messageCredits * 6 : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 6
              : 0,
          },
          {
            name: item.name,
            type: "anually",
            pricePrev: Math.floor(item.usBasePrice * 12 * info.value),
            priceNow: Math.floor(
              item.usBasePrice * 12 * info.value -
                (item.usBasePrice * 12 * info.value * 20) / 100
            ),
            percentageOff: 20,
            subscriptionDays: 360,
            currency: info.currency,
            symbol: info.symbol,
            id: item.name + 4,
            messageCredits: item?.messageCredits
              ? item?.messageCredits * 12
              : 0,
            numberOfApplies: item?.numberOfApplies
              ? item?.numberOfApplies * 12
              : 0,
          },
        ],
      };
    });
    setPlans(maped);
    setDataLoading(false);
  };

  return { usd, inr, other };
};

export default useCalculate;
