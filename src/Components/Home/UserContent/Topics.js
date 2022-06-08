import React from "react";

const Topics = () => {
  const topics = [
    {
      type: "Fashion",
      time: "1 hour ago",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, laboriosam?",
      img: `https://picsum.photos/200/300?random=${Math.random()}`,
    },
    {
      type: "Fashion",
      time: "1 hour ago",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, laboriosam?",
      img: `https://picsum.photos/200/300?random=${Math.random()}`,
    },
    {
      type: "Fashion",
      time: "1 hour ago",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, laboriosam?",
      img: `https://picsum.photos/200/300?random=${Math.random()}`,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold pb-4 border-b">
        Topics you might be interested in
      </p>
      {topics.map((topic) => (
        <div key={topic.img} className="grid grid-cols-4 border-b pb-2">
          <div className="col-span-3">
            <p className="text-gray-500 text-sm mb-2">
              {topic.type} {topic.time}
            </p>
            <p className="font-medium">{topic.title}</p>
          </div>
          <div className="col-span-1">
            <div
              style={{ backgroundImage: `url(${topic.img})` }}
              className="bg-cover bg-center bg-no-repeat aspect-square rounded-md"
            />
          </div>
        </div>
      ))}
      <p className="w-fit cursor-pointer">View more</p>
      <img
        className="aspect-square"
        src={`https://picsum.photos/200/300?random=${Math.random()}`}
        alt=""
      />
    </div>
  );
};

export default Topics;
