import React from "react";

const Sponsorships = () => {
  const sponsorships = [1, 2, 3, 4];
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-lg lg:text-xl font-bold">Latest Sponsorships</p>
        <p className="cursor-pointer font-medium">View all</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sponsorships.map((sponsorship) => (
          <div key={sponsorship} className="rounded-xl border overflow-hidden">
            <div
              style={{
                backgroundImage: `url(https://picsum.photos/200/300?random=${sponsorship})`,
              }}
              className="bg-cover bg-center bg-no-repeat aspect-[7/5]"
            />
            <div className="p-5">
              <p className="text-lg font-bold">Sponsorship title</p>
              <p className="text-gray-500">@randomuser</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">10 min ago</p>
                <div className="w-1/4 h-6 relative">
                  {sponsorships.map((item) => (
                    <div
                      key={item}
                      style={{
                        backgroundImage: `url(https://picsum.photos/200/300?random=${item})`,
                        left: `${12 * item}%`,
                      }}
                      className={`bg-cover bg-center bg-no-repeat w-6 h-6 rounded-full absolute top-0`}
                    />
                  ))}
                  <div
                    style={{ left: `${12 * (sponsorships.length + 1)}%` }}
                    className="w-6 h-6 rounded-full absolute top-0 flex items-center justify-center bg-gray-100 text-xs font-semibold"
                  >
                    10+
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsorships;
