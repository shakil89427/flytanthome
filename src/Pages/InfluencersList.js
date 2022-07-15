import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Spinner from "../Components/Spinner/Spinner";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const InfluencersList = () => {
  const [listData, setListData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const { id } = useParams();
  const db = getFirestore();
  const docRef = doc(db, "influencersList", id);

  const delateProfile = async (item) => {
    try {
      const filtered = listData?.influencers?.filter((link) => link !== item);
      setListData((prev) => ({ ...prev, influencers: filtered }));
      await updateDoc(docRef, { influencers: arrayRemove(item) });
    } catch (err) {}
  };

  const addProfile = async (e) => {
    e.preventDefault();
    try {
      setListData((prev) => ({
        ...prev,
        influencers: prev?.influencers
          ? [e.target[0].value, ...prev?.influencers]
          : [e.target[0].value],
      }));
      setShowAddProfile(false);
      await updateDoc(docRef, { influencers: arrayUnion(e.target[0].value) });
    } catch (err) {}
  };

  const getList = async () => {
    try {
      const response = await getDoc(docRef);
      setListData(response.data());
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {showAddProfile && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[#8a898954] z-[99999] flex items-center justify-center">
          <div className="w-[95%] max-w-[450px] p-7 bg-white rounded-lg">
            <p className="text-lg font-medium">Add Profile</p>
            <form onSubmit={addProfile} className="my-5">
              <input
                type="text"
                placeholder="Profile url"
                className="w-full mb-3 outline-none border border-black p-3 rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md"
              >
                Save Profile
              </button>
            </form>
            <p
              onClick={() => setShowAddProfile(false)}
              className="w-fit mx-auto font-medium cursor-pointer"
            >
              Cancel
            </p>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999999] w-screen h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="w-screen h-screen bg-black flex flex-col items-center">
        <NavBar bg={true} />
        {listData?.name && (
          <p className="font-semibold text-lg md:text-xl r-box text-white my-10">
            {listData?.name}
          </p>
        )}
        {listData?.name && (
          <div className="r-box text-white h-full overflow-scroll scrollbar w-full text-center">
            <table className="w-full min-w-[1300px]">
              <tr className="text-gray-400">
                <th>Sr</th>
                <th>Image</th>
                <th>Profile</th>
                <th>Followers</th>
                <th>Like/Post</th>
                <th>Comment/Post</th>
                <th>Post/Week</th>
                <th>Engagement rate</th>
              </tr>
              {listData?.influencers?.map((item, index) => (
                <tr key={item} className="text-sm">
                  <td className="">{index}</td>
                  <td className="py-2">
                    <div
                      style={{
                        backgroundImage: "url(https://picsum.photos/200)",
                      }}
                      className="bg-cover bg-center bg-no-repeat w-8 h-8 rounded-full mx-auto"
                    />
                  </td>
                  <td className="">https://picsum.photos/200</td>
                  <td className="">45k</td>
                  <td className="">354</td>
                  <td className="">435</td>
                  <td className="">10</td>
                  <td className="">20%</td>
                  <td className="">
                    <button
                      onClick={() => delateProfile(item)}
                      className="text-gray-400"
                    >
                      Delate
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
        {listData?.name && (
          <button
            onClick={() => setShowAddProfile(true)}
            className="bg-white text-black my-5 px-8 py-3 text-lg font-semibold rounded-md"
          >
            Add Profile
          </button>
        )}
      </div>
    </>
  );
};

export default InfluencersList;
