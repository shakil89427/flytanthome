import moment from "moment";
import React, { useState } from "react";
import useStore from "../../Store/useStore";

const Connect = ({ setShowConnect }) => {
  const { user } = useStore();
  const [showMain, setShowMain] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[0].value;
    const phone = e.target[0].value;
    const creationDate = moment().unix();
    const finalData = { name, email, phone, creationDate };
    console.log(finalData);
  };

  return (
    <div className="absolute z-20 inset-0 top-0 left-0 bg-[#08080850] flex items-end">
      {showMain && (
        <div className="bg-white w-full p-5 grid grid-cols-2 gap-x-5 gap-y-10 rounded-lg">
          {user?.userId && (
            <button className="bg-black text-white py-3 rounded-lg text-lg font-medium">
              Follow
            </button>
          )}
          <button
            onClick={() => {
              setShowMain(false);
              setShowForm(true);
            }}
            className={`bg-gray-200 py-3 rounded-lg text-lg font-medium ${
              user?.userId ? "col-span-1" : "col-span-2"
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setShowConnect(false)}
            className="col-span-2 border-2 py-3 border-black rounded-lg text-lg font-medium"
          >
            Cancel
          </button>
        </div>
      )}
      {showForm && (
        <div className="bg-white w-full p-5 rounded-lg">
          <form className="text-lg font-semibold" onSubmit={submitForm}>
            <p>Name</p>
            <input
              required
              type="text"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <p>Email</p>
            <input
              required
              type="email"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <p>Phone Number</p>
            <input
              required
              type="number"
              className="bg-[#7c7c7c25] w-full p-2 mt-1 mb-5 rounded-md outline-none"
            />
            <button
              type="submit"
              className="w-full bg-black border-2 border-black text-white py-3 rounded-lg my-3 text-lg font-medium"
            >
              Submit
            </button>
          </form>
          <button
            onClick={() => {
              setShowForm(false);
              setShowMain(true);
            }}
            className="border-2 py-3 text-lg  font-medium border-black rounded-lg w-full text-center cursor-pointer"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Connect;
