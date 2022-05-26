import { getString } from "firebase/remote-config";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useStore from "../../Store/useStore";
import History from "./History";
import { FaHistory } from "react-icons/fa";

const ActivePlans = () => {
  const { user, allPlans, remoteConfig } = useStore();
  const [data, setData] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const valid = user?.subscriptions?.filter(
      (sub) => sub.orderDate + sub.subscriptionDays * 86400 >= moment().unix()
    );
    if (!valid?.length || valid?.length < 1) return setData({ invalid: true });

    let allNames = [];
    let allPrices = [];
    let allDates = [];
    let allCampaignCredits = 0;
    let allMessageCredits = 0;

    const currencies = JSON.parse(getString(remoteConfig, "currency_list"));

    valid?.forEach((validPlan) => {
      const { symbol_native } = currencies.find(
        (item) => item?.code === validPlan?.currencyCode
      );
      allNames.push(validPlan?.planName);
      allPrices.push({
        price: validPlan?.price,
        symbol: symbol_native,
      });
      allDates.push(validPlan.orderDate);

      const time = validPlan?.subscriptionDays / 30;
      allPlans.forEach((plan) => {
        if (validPlan?.planName === plan?.name && plan?.numberOfApplies) {
          allCampaignCredits =
            allCampaignCredits + plan?.numberOfApplies * time;
        }
        if (validPlan?.planName === plan?.name && plan?.messageCredits) {
          allMessageCredits = allMessageCredits + plan?.messageCredits * time;
        }
      });
    });

    const sortedDate = allDates?.sort((a, b) => a - b);

    const final = {
      names: allNames,
      prices: allPrices,
      startDate: moment.unix(sortedDate[0]).format("MMM DD YYYY"),
      endDate: moment.unix(user.subscriptionEndingDate).format("MMM DD YYYY"),
      allCampaignCredits,
      availableCampaignCredits: user?.numberOfApplies,
      allMessageCredits,
      availableMessageCredits: user?.messageCredits,
    };
    setData(final);
  }, []);

  return (
    <div>
      {showHistory && <History setShowHistory={setShowHistory} />}
      <div className="relative">
        <p className="text-center text-xl md:text-2xl lg:text-3xl font-semibold">
          Your active plan
        </p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xl font-medium cursor-pointer flex items-center gap-1">
          <FaHistory onClick={() => setShowHistory(true)} />
          <p onClick={() => setShowHistory(true)} className="hidden lg:block">
            History
          </p>
        </div>
      </div>
      {data?.invalid ? (
        <p className="mt-5 text-center">No active plan found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
          <div className="border shadow-lg p-14 rounded-lg grid grid-cols-1 gap-7">
            <div className="flex items-center gap-2 flex-wrap">
              {data?.names?.map((name, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl lg:text-2xl font-medium bg-black text-white w-fit px-5 py-1 pt-2 rounded-md"
                >
                  {name}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              {data?.prices?.map((p, index) => (
                <p
                  key={index}
                  className="text-xl md:text-2xl lg:text-3xl font-medium"
                >
                  {p?.symbol}
                  {p?.price}
                </p>
              ))}
            </div>
            <div className="text-lg font-medium flex justify-between">
              <p className="text-gray-500">Started at {data?.startDate}</p>
              <p className="text-gray-500">Expire on {data?.endDate}</p>
            </div>
          </div>
          <div className="border shadow-lg p-14 rounded-lg">
            <div className="mb-14">
              <p className="text-lg font-medium">Apply Campaigns credits</p>
              <div className="relative mt-3">
                <div className="bg-gray-300 h-5 w-full rounded-full overflow-hidden relative">
                  <div
                    style={{
                      width: `${
                        (data?.availableCampaignCredits * 100) /
                        data?.allCampaignCredits
                      }%`,
                    }}
                    className="absolute bg-black inset-y-0 left-0"
                  />
                </div>
                <p className="absolute right-0 -bottom-6 text-sm font-medium">
                  {data?.availableCampaignCredits}/{data?.allCampaignCredits}
                </p>
              </div>
            </div>
            <div className="mb-5">
              <p className="text-lg font-medium">Direct Message credits</p>
              <div className="relative mt-3">
                <div className="bg-gray-300 h-5 w-full rounded-full overflow-hidden relative">
                  <div
                    style={{
                      width: `${
                        (data?.availableMessageCredits * 100) /
                        data?.allMessageCredits
                      }%`,
                    }}
                    className="absolute bg-black inset-y-0 left-0"
                  />
                </div>
                <p className="absolute right-0 -bottom-6 text-sm font-medium">
                  {data?.availableMessageCredits}/{data?.allMessageCredits}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivePlans;
