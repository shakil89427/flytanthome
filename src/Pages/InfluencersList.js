import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import useStore from "../Store/useStore";
import Spinner from "../Components/Spinner/Spinner";
import moment from "moment";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const InfluencersList = () => {
  const { setNotify, userLoading, authLoading, user, setShowLogin } =
    useStore();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const password = window.prompt("Enter Password");
    if (password !== "flytant@#$") return navigate("/");
  }, []);

  useEffect(() => {
    if (user?.userId) {
      setLoading(true);
      setAllData([]);
      const colRef = collection(db, "influencersList");
      getDocs(colRef)
        .then(({ docs }) => {
          const finalData = docs.map((doc) => ({ ...doc.data() }));
          setAllData(finalData);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setNotify({ status: false, message: "Something went wrong" });
        });
    }
  }, [user]);

  useEffect(() => {
    if (userLoading || authLoading) return;
    if (!user?.userId) {
      setShowLogin(true);
    }
  }, [user, userLoading, authLoading]);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-10">
          <Spinner />
        </div>
      )}
      <div className="w-screen h-screen bg-black flex flex-col items-center">
        <div className="w-full">
          <NavBar bg={true} />
        </div>
        {allData?.length > 0 && user?.userId && (
          <div className="h-full r-box mt-14 overflow-scroll scrollbar text-center">
            <table className="w-[800px] mx-auto">
              <thead className="text-gray-400">
                <tr>
                  <th>Sr</th>
                  <th>List Name</th>
                  <th>Creation Date</th>
                </tr>
              </thead>
              <tbody className="text-white text-sm">
                {allData?.map((item, index) => (
                  <tr
                    key={item?.listId}
                    className="cursor-pointer"
                    onClick={() => navigate(`/influencerslist/${item?.listId}`)}
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{item?.name}</td>
                    <td className="py-2">
                      {moment.unix(item?.creationDate).format("DD MMM YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default InfluencersList;
