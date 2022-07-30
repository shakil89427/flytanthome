import React from "react";
import { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import useStore from "../Store/useStore";
import Spinner2 from "../Components/Spinner/Spinner2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import useAnalytics from "../Hooks/useAnalytics";

const CreateInfluencersList = () => {
  const { user, setNotify, setShowLogin, authLoading } = useStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();
  const { addLog } = useAnalytics();

  const createList = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    addLog("create_list");
    try {
      const newDocRef = doc(collection(db, "influencersList"));
      await setDoc(newDocRef, {
        name: e.target[0].value,
        creationDate: moment().unix(),
        listId: newDocRef.id,
      });
      navigate(`/influencerslist/${newDocRef.id}`);
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user?.userId) {
      setShowLogin(true);
    }
  }, [user, authLoading]);

  return (
    <div className="w-screen h-screen bg-black">
      <NavBar bg={true} />
      {user?.userId && (
        <form
          onSubmit={createList}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[400px] mx-auto"
        >
          <input
            type="text"
            className="w-full border-2 mb-8 bg-black px-3 h-12 border-gray-600 rounded-md outline-none text-white"
            placeholder="Enter List Name"
            required
          />
          <button
            type="submit"
            className="bg-white text-black w-full h-12 text-lg rounded-md font-medium flex items-center justify-center"
          >
            {loading ? <Spinner2 /> : <span>Create List</span>}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateInfluencersList;
