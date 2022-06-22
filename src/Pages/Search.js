import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const inputRef = useRef();

  const search = async (e) => {
    e.preventDefault();
    alert(e.target[0].value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="r-box py-10">
      <form
        onSubmit={search}
        className="border border-black rounded-full pl-5 flex items-center overflow-hidden w-full max-w-[1000px] mx-auto"
      >
        <BiSearch className="text-2xl" />
        <input
          ref={inputRef}
          placeholder="Search by influencer with name,place"
          type="text"
          className="w-full p-2 border-0 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-10 py-3 font-medium"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
