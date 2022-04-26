import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  collection,
  where,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import {
  AiOutlineInstagram,
  AiFillInstagram,
  AiOutlineFacebook,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillTwitterSquare,
  AiOutlineLinkedin,
  AiFillLinkedin,
  AiOutlineYoutube,
  AiFillYoutube,
} from "react-icons/ai";
import Spinner from "../Components/Spinner/Spinner";

const SponsorshipDetails = () => {
  const [details, setDetails] = useState({});
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [updateId, setUpdateId] = useState(id);
  const db = getFirestore();

  const getSimilar = async (status) => {
    const colRef = collection(db, "sponsorship");
    const q = query(
      colRef,
      where("isApproved", "==", true),
      where("barter", "==", status),
      orderBy("creationDate", "desc"),
      limit(6)
    );
    try {
      const response = await getDocs(q);
      const data = response?.docs?.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (data?.length) {
        const validData = data.filter((item) => updateId !== item.id);
        setSimilar(validData.slice(0, 5));
        setLoading(false);
        window.scrollTo(0, 0);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getDetails = async (docRef) => {
    setLoading(true);
    try {
      const response = await getDoc(docRef);
      const data = await response.data();
      if (data?.name) {
        setDetails(data);
        getSimilar(data.barter);
      } else {
        setLoading(false);
        //Show error
      }
    } catch (err) {
      setLoading(false);
      //Show error
    }
  };

  useEffect(() => {
    const docRef = doc(db, "sponsorship", updateId);
    getDetails(docRef);
  }, [updateId]);

  return (
    <div className="">
      {loading && <Spinner />}
      {details?.name && similar?.length && (
        <div className="max-w-[1000px] mx-auto py-20 grid grid-cols-12 gap-20">
          {/* Left Side */}
          <div className="col-span-8">
            <img
              className="w-full h-96 mb-5"
              src={details?.blob[0]?.path}
              alt=""
            />
            <div className="pr-5">
              <div className="flex flex-col gap-5 mt-5">
                <h3 className="text-2xl font-semibold">{details?.name}</h3>
                <p className="text-sm">
                  Posted: {new Date(details?.creationDate).toDateString()}
                </p>
                <p className="text-sm py-2 px-4 bg-[#3FD5F5] w-fit rounded-3xl font-semibold">
                  {details?.barter ? "Barter" : "Paid"} Campaign
                </p>
              </div>

              <div className="flex items-center justify-between my-14">
                <p className="py-3 px-5 border-2 border-black rounded-3xl w-[45%] text-center font-medium">
                  Message
                </p>
                <p className="py-3 px-5 bg-black text-white border-2 border-black w-[45%] rounded-3xl text-center font-medium">
                  Apply
                </p>
              </div>

              <p className="mb-14">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptates, nihil. Consequatur nam harum ducimus, at laborum a
                rem accusantium molestias asperiores, sunt eveniet reiciendis
                sit quisquam dolore, necessitatibus consectetur magni modi.
                Tempore similique at magnam veritatis. Vitae praesentium
                deserunt dolore.
              </p>
              <h5 className="text-xl font-semibold mb-5">Description</h5>
              <p className="mb-14">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                alias dignissimos quia dicta? Deleniti, earum placeat? Quisquam
                numquam pariatur ipsa temporibus recusandae minima repellendus
                aut. Soluta rem aperiam commodi, repudiandae harum quia voluptas
                dicta, mollitia cumque quae, ex nesciunt odio facere! Velit fuga
                quo illo, illum labore eaque quod tempora eveniet quidem non
                iste harum dignissimos nulla expedita temporibus inventore hic
                quos possimus laborum ex, natus, provident ipsam? Vitae
                consequatur incidunt quisquam quasi perferendis laboriosam quo
                laudantium tenetur molestiae hic atque, repellat dignissimos eum
                unde aliquid. Dolorum porro similique voluptatem temporibus non,
                dolore tenetur soluta molestias corporis iste dolores veritatis?
              </p>
              <h5 className="text-xl font-semibold mb-5">Catagories</h5>
              <div className="flex items-center gap-3 mb-10">
                {details?.categories?.map((item) => (
                  <p
                    className="py-1 px-6 bg-gray-200 w-fit rounded-3xl text-sm font-medium"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
              <h5 className="text-xl font-semibold mb-5">Minimum followers</h5>
              <p className="mb-10">{details?.minFollowers}</p>
              <p className="text-xl font-semibold mb-5">Platform required</p>
              <div className="flex items-center gap-3 text-xs">
                {details?.platforms?.includes("Instagram") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineInstagram className="text-3xl" />
                    <p>Instagram</p>
                  </span>
                )}
                {details?.platforms?.includes("Facebook") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineFacebook className="text-3xl" />
                    <p>Facebook</p>
                  </span>
                )}
                {details?.platforms?.includes("Twitter") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineTwitter className="text-3xl" />
                    <p>Twitter</p>
                  </span>
                )}
                {details?.platforms?.includes("Linkedin") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineLinkedin className="text-3xl" />
                    <p>Linkedin</p>
                  </span>
                )}
                {details?.platforms?.includes("Youtube") && (
                  <span className="flex flex-col gap-1 items-center">
                    <AiOutlineYoutube className="text-3xl" />
                    <p>Youtube</p>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-span-4">
            <p className="text-xl font-semibold text-center mb-5">
              More related campaigns
            </p>
            <div className="flex flex-col gap-10">
              {similar?.map((item) => (
                <div
                  onClick={() => setUpdateId(item.id)}
                  key={item.id}
                  className="relative"
                >
                  <div className="bg-[#F5B63A] text-white text-sm absolute top-5 right-0 px-3 py-1 rounded-tl-md rounded-bl-md">
                    {item?.applied} applied
                  </div>
                  <div
                    style={{ backgroundImage: `url(${item.blob[0]?.path})` }}
                    className="w-full h-48 bg-cover bg-center bg-no-repeat rounded-md"
                  />
                  <div className="mt-3 pr-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="bg-[#FFDE2F] text-xs py-1 px-3 rounded-3xl font-medium">
                        {item.barter ? "Barter" : "Paid"} campaign
                      </p>
                      <p className="text-xs">
                        {Math.floor(
                          (Date.now() - item?.creationDate) / 86400000
                        )}{" "}
                        days ago
                      </p>
                    </div>
                    <p className="text-md font-semibold">{item.name}</p>
                    <p className="text-xs my-1">
                      Min {item.minFollowers} followers required
                    </p>
                    <div className="flex items-center gap-2 text-lg text-gray-400 mt-2">
                      {item?.platforms?.includes("Instagram") && (
                        <AiFillInstagram />
                      )}
                      {item?.platforms?.includes("Facebook") && (
                        <AiFillFacebook />
                      )}
                      {item?.platforms?.includes("Twitter") && (
                        <AiFillTwitterSquare />
                      )}
                      {item?.platforms?.includes("Linkedin") && (
                        <AiFillLinkedin />
                      )}
                      {item?.platforms?.includes("Youtube") && (
                        <AiFillYoutube />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsorshipDetails;
