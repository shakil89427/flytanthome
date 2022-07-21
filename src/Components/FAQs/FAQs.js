import React, { useState } from "react";
import { AiFillCaretRight, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import faqbg from "../../Assets/faqbg.png";

const data = [
  {
    title: " How flytant works for influencers point of view?",
    des: "This works in simple way when any influencers visit the flytant first of all we give bonus point and allow them to link social media.",
  },
  {
    title: " How flytant works for influencers point of view?",
    des: "This works in simple way when any influencers visit the flytant first of all we give bonus point and allow them to link social media.",
  },
  {
    title: " How flytant works for influencers point of view?",
    des: "This works in simple way when any influencers visit the flytant first of all we give bonus point and allow them to link social media.",
  },
  {
    title: " How flytant works for influencers point of view?",
    des: "This works in simple way when any influencers visit the flytant first of all we give bonus point and allow them to link social media.",
  },
  {
    title: " How flytant works for influencers point of view?",
    des: "This works in simple way when any influencers visit the flytant first of all we give bonus point and allow them to link social media.",
  },
  {
    title: " How flytant works for influencers point of view?",
    des: "This works in simple way when any influencers visit the flytant first of all we give bonus point and allow them to link social media.",
  },
];

const FAQs = () => {
  const [selected, setSelected] = useState(false);
  const [category, setCategory] = useState("INFLUENCERS");
  const navigate = useNavigate();

  return (
    <div className="r-box py-24">
      <div className="w-[95%] max-w-[600px] mx-auto text-center">
        <p className="text-2xl lg:text-3xl font-semibold">
          POPULAR FAQs FOR {category}
        </p>
        <p className="text-gray-500 mt-3">
          Hello Visitor! These are the most asked questions from inflluencers.
        </p>
        <form
          className="border-2 mt-5 flex items-center rounded-md pl-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <AiOutlineSearch className="text-2xl text-gray-500" />
          <input
            placeholder="Type your question here"
            className="border-0 outline-none w-full p-2"
            type="text"
          />
        </form>
      </div>

      <div className="py-24 grid grid-cols-1 lg:grid-cols-2  gap-8 w-[95%] max-w-[1100px] mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className={`bg-gray-100 rounded-lg relative ${
              index === selected && "row-span-2"
            }`}
          >
            {index === selected && (
              <div className="absolute h-full w-[6px] bg-black top-0 left-0 rounded-full" />
            )}
            <div
              className="flex justify-between gap-5 items-start p-5 cursor-pointer select-none"
              onClick={() => setSelected(selected === index ? false : index)}
            >
              <p className="text-lg">{item.title}</p>
              <AiFillCaretRight
                style={{
                  transform: selected === index && "rotate(90deg)",
                }}
                className="duration-150"
              />
            </div>
            <div
              className={`overflow-hidden ${
                selected === index ? "h-auto" : "h-0"
              }`}
            >
              <p className="mx-5 mb-5 p-2 bg-white rounded-md text-gray-600">
                {item.des}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          setCategory(category === "INFLUENCERS" ? "BRANDS" : "INFLUENCERS")
        }
        className="w-fit block mx-auto border-2 border-black px-5 py-2 rounded-md hover:bg-black hover:text-white duration-150 font-medium"
      >
        {category === "INFLUENCERS"
          ? "FAQs for Brands"
          : "FAQs for Influencers"}
      </button>
      <div className="py-14 w-[95%] max-w-[1100px] mx-auto">
        <div className="p-10 bg-gray-100 grid grid-cols-3 gap-14 rounded-lg ">
          <div className="col-span-full md:col-span-2">
            <p className="text-xl md:text-2xl font-semibold">
              Flytant is always here to help you ask any question
            </p>
            <p className="text-gray-500 mt-3 mb-10">
              You will get all help from our team.
            </p>
            <p
              onClick={() => navigate("/contact")}
              className="bg-black text-white rounded-xl px-10 py-3 w-fit cursor-pointer"
            >
              Contact us
            </p>
          </div>
          <div className="col-span-full md:col-span-1">
            <img className="block mx-auto" src={faqbg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
