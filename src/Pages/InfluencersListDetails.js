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
import axios from "axios";
import millify from "millify";

const InfluencersListDetails = () => {
  const [title, setTitle] = useState("");
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const { id } = useParams();
  const db = getFirestore();
  const docRef = doc(db, "influencersList", id);

  const delateProfile = async (url) => {
    try {
      const filtered = listData?.filter(
        (item) => item?.url?.toLowerCase() !== url.toLowerCase()
      );
      setListData(filtered);
      await updateDoc(docRef, { influencers: arrayRemove(url) });
    } catch (err) {}
  };

  const addProfile = async (e) => {
    e.preventDefault();
    if (!e.target[0].value.includes("instagram.com/")) return;
    setLoading(true);
    try {
      getInfluencer(e.target[0].value);
      await updateDoc(docRef, { influencers: arrayUnion(e.target[0].value) });
    } catch (err) {
      setLoading(false);
    }
  };

  const getInfluencer = async (url) => {
    try {
      const username = url.split("instagram.com/")[1].split("/")[0];
      const { data } = await axios.post(
        "https://flytant.herokuapp.com/influencersinstagram",
        { username }
      );
      setListData((prev) => [{ ...data, url }, ...prev]);
      setLoading(false);
      setShowAddProfile(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const getList = async () => {
    try {
      const response = await getDoc(docRef);
      const finalData = response.data();
      setTitle(finalData?.name);
      if (finalData?.influencers?.length > 0) {
        finalData?.influencers?.forEach((url) => getInfluencer(url));
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listData?.length < 1) {
      getList();
    }
  }, []);

  return (
    <>
      {showAddProfile && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[#8a898954] z-[99999] flex items-center justify-center">
          <div className="w-[95%] max-w-[450px] p-7 bg-white rounded-lg">
            <p className="text-lg font-medium">Add Profile</p>
            <form onSubmit={addProfile} className="my-5">
              <input
                type="url"
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
        <div className="w-full">
          <NavBar bg={true} />
        </div>
        <p className="font-semibold text-lg md:text-xl r-box text-white my-10">
          {title}
        </p>
        {title && (
          <div className="r-box text-white h-full overflow-scroll scrollbar w-full text-center">
            <table className="w-full min-w-[1300px]">
              <thead>
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
              </thead>
              <tbody>
                {listData?.map((item, index) => (
                  <tr key={item?.url} className="text-sm">
                    <td className="">{index}</td>
                    <td className="py-2">
                      <div
                        style={{
                          backgroundImage: `url(data:image/png;base64,${item?.image})`,
                        }}
                        className="bg-cover bg-center bg-no-repeat w-8 h-8 rounded-full mx-auto border"
                      />
                    </td>
                    <td className="">{item?.url}</td>
                    <td className="">{millify(item?.followers || 0)}</td>
                    <td className="">{millify(item?.likesPerPost || 0)}</td>
                    <td className="">{millify(item?.commentsPerPost || 0)}</td>
                    <td className="">10</td>
                    <td className="">20%</td>
                    <td className="">
                      <button
                        onClick={() => delateProfile(item?.url)}
                        className="text-gray-400"
                      >
                        Delate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {title && (
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

export default InfluencersListDetails;
