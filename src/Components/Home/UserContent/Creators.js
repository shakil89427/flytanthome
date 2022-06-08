import React from "react";

const Creators = ({ type }) => {
  const creators = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <div className=" mb-5 flex items-center justify-between">
        <p className="text-lg lg:text-xl font-bold">{type} Creators</p>
        {type === "Top" && (
          <p className="cursor-pointer font-medium">View all</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {creators.map((creator) => (
          <div key={creator} className="rounded-xl overflow-hidden border">
            <div
              style={{
                backgroundImage: `url(https://picsum.photos/200/300?random=${creator})`,
              }}
              className="bg-cover bg-center bg-no-repeat aspect-[5/3]"
            />
            <div className="px-5 flex items-center justify-between -translate-y-1/2">
              <div
                style={{
                  backgroundImage: `url(https://picsum.photos/200/300?random=${creator})`,
                }}
                className="bg-cover bg-center bg-no-repeat w-12 h-12 rounded-full border-2 border-white"
              />
              <p className="w-8 h-8 bg-white rounded-full border flex items-center justify-center text-sm font-semibold">
                15
              </p>
            </div>
            <div className="px-5 pb-5">
              <p className="text-lg font-bold">Random Name</p>
              <p className="text-gray-500">@randomname</p>
              <p className="mt-5 text-sm">
                Lorem ipsum dolor sit, amet consectetur...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creators;
