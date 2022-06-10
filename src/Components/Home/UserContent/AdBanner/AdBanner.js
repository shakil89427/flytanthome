import React from "react";

const AddBanner = () => {
  return (
    <div className="w-full lg:w-[70%] lg:mx-auto">
      <div
        style={{
          backgroundImage: `url(https://www.birdlife.org/wp-content/uploads/2021/09/Nature_positive_shutterstock_1451653292_1_1-1024x494.jpg)`,
        }}
        className="bg-cover bg-center bg-no-repeat aspect-[7/3] rounded-md"
      />
    </div>
  );
};

export default AddBanner;
