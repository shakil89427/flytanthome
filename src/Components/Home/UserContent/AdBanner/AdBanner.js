import React from "react";

const AddBanner = () => {
  return (
    <div className="">
      <div
        style={{
          backgroundImage: `url(https://picsum.photos/200/300?random=1)`,
        }}
        className="bg-cover bg-center bg-no-repeat aspect-[6/2] rounded-md"
      />
    </div>
  );
};

export default AddBanner;
