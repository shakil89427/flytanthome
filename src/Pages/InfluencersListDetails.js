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
import useStore from "../Store/useStore";
import useAnalytics from "../Hooks/useAnalytics";

const InfluencersListDetails = () => {
  const { userLoading, authLoading, user, setShowLogin } = useStore();
  const [title, setTitle] = useState("");
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { id } = useParams();
  const db = getFirestore();
  const docRef = doc(db, "influencersList", id);
  const { addLog } = useAnalytics();

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
      addLog("save_profile");
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
        "http://localhost:5000/influencersinstagram",
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
      setListData([]);
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
    if (userLoading || authLoading) return;
    if (!user?.userId) {
      setShowLogin(true);
    }
  }, [user, userLoading, authLoading]);

  useEffect(() => {
    if (user?.userId) {
      getList();
    }
  }, [user]);

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
              onClick={() => {
                addLog("hide_add_profile_popup");
                setShowAddProfile(false);
              }}
              className="w-fit mx-auto font-medium cursor-pointer"
            >
              Cancel
            </p>
          </div>
        </div>
      )}
      {showDelete && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[#8a898954] z-[99999] flex items-center justify-center">
          <div className="w-[95%] max-w-[450px] p-7 bg-white rounded-lg">
            <p className="text-lg font-medium text-center">Are you Sure?</p>
            <div className="grid grid-cols-2 gap-5 text-center mt-5">
              <p
                onClick={() => {
                  addLog("delete");
                  delateProfile(showDelete);
                  setShowDelete(false);
                }}
                className="border py-2 border-black rounded-md font-medium cursor-pointer"
              >
                Delete
              </p>
              <p
                onClick={() => {
                  addLog("cancel");
                  setShowDelete(false);
                }}
                className="bg-black text-white py-2 rounded-md font-medium cursor-pointer"
              >
                Cancel
              </p>
            </div>
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
        {user?.userId && (
          <p className="font-semibold text-lg md:text-xl r-box text-white my-10">
            {title}
          </p>
        )}
        {title && user?.userId && (
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
                    <td className="">{index + 1}</td>
                    <td className="py-2">
                      <div
                        style={{
                          backgroundImage: `url(data:image/png;base64,${item?.image})`,
                        }}
                        className="bg-cover bg-center bg-no-repeat w-8 h-8 rounded-full mx-auto border"
                      />
                    </td>
                    <td
                      onClick={() => {
                        addLog("open_instagram_profile");
                        window.open(item?.url);
                      }}
                      className="cursor-pointer"
                    >
                      {item?.url?.split("instagram.com/")[1]?.split("/")[0]}
                    </td>
                    <td>{millify(item?.followers || 0)}</td>
                    <td>
                      {millify(
                        parseInt(item?.totalLikes / item?.totalPost) || 0
                      )}
                    </td>
                    <td>
                      {millify(
                        parseInt(item?.totalComments / item?.totalPost) || 0
                      )}
                    </td>
                    <td>{item?.postPerWeek > 0 ? item?.postPerWeek : "0"}</td>
                    <td>
                      {parseFloat(
                        (item?.totalLikes / item?.totalPost / item?.followers) *
                          100 || 0
                      ).toFixed(2)}
                      %
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          addLog("delete");
                          setShowDelete(item?.url);
                        }}
                        className="text-gray-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {title && user?.userId && (
          <button
            onClick={() => {
              addLog("add_profile");
              setShowAddProfile(true);
            }}
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
