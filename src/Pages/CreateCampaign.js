import React, { useEffect, useState } from "react";
import correct from "../Assets/onboard/correct.png";
import upArrow from "../Assets/onboard/up.png";
import downArrow from "../Assets/onboard/down.png";
import plus from "../Assets/plus.png";
import arrowDownBlack from "../Assets/arrowDownBlack.png";
import { BsSearch } from "react-icons/bs";
import selected from "../Assets/selected.png";
import allCategories from "../Assets/categories";
import Preview from "../Components/Preview/Preview";
import useStore from "../Store/useStore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Spinner from "../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const { app, setNotify } = useStore();
  const storage = getStorage(app);
  const db = getFirestore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [disable, setDisable] = useState(true);
  const [showType, setShowType] = useState(false);
  const [showGenders, setShowGenders] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [filterKey, setFilterKey] = useState("");
  const [preview, setPreview] = useState(false);

  const allPlatforms = [
    { key: "A", item: "Instagram" },
    { key: "B", item: "Youtube" },
    { key: "C", item: "Twitter" },
    { key: "D", item: "Tiktok" },
  ];
  const allGenders = ["Male", "Female", "Any"];
  const [filtered, setFiltered] = useState([]);

  /* Data states */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [type, setType] = useState({});
  const [platforms, setPlatforms] = useState([]);
  const [followers, setFollowers] = useState("");
  const [gender, setGender] = useState(false);
  const [categories, setCategories] = useState([]);

  const filterImage = (e) => {
    const temp = [...e.target.files];
    if (temp.length < 1) return;
    if (images.length < 1) {
      return setImages(temp.slice(0, 5));
    }
    const imgs = [];
    temp.forEach((item) => {
      images.forEach((i) => {
        if (i.name !== item.name) {
          imgs.push(i);
        }
      });
    });
    setImages([...temp, ...imgs].slice(0, 5));
  };

  /* Update data to db */
  const updateData = (blob) => {
    const data = {
      name,
      description,
      ...type,
      blob,
      platforms,
      minFollowers: followers,
      gender,
      categories,
      creationDate: Date.now(),
    };
    const colRef = collection(db, "sponsorship");
    addDoc(colRef, data)
      .then((res) => {
        if (res.id) {
          setLoading(false);
          navigate("/");
          setNotify({ status: true, message: "Creation successfull" });
        } else {
          setLoading(false);
          setNotify({ status: false, message: "Something went wrong" });
        }
      })
      .catch((err) => {
        setLoading(false);
        setNotify({ status: false, message: "Something went wrong" });
      });
  };

  /* Upload images */
  const uploadImage = () => {
    const promises = [];
    const blob = [];
    images.forEach((image) => {
      const storageRef = ref(storage, `/files/${Date.now() + image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        () => {},
        (err) => {
          setLoading(false);
          setNotify({ status: false, message: "Something went wrong" });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) =>
              blob.push({ path: url, type: "image", videoThumbnail: "" })
            )
            .catch((err) => {
              setLoading(false);
              setNotify({ status: false, message: "Something went wrong" });
            });
        }
      );
    });
    Promise.all(promises)
      .then(() => updateData(blob))
      .catch((err) => {
        setLoading(false);
        setNotify({ status: false, message: "Something went wrong" });
      });
  };
  /* Next or submit */
  const next = (e) => {
    e.preventDefault();
    if (disable) return;
    if (page < 8) {
      return setPage((prev) => prev + 1);
    }
    setLoading(true);
    uploadImage();
  };

  /* Check state */
  useEffect(() => {
    if (page === 1 && name?.length > 0) return setDisable(false);
    if (page === 2 && description?.length > 0) return setDisable(false);
    if (page === 3 && images?.length > 0) return setDisable(false);
    if (page === 4 && type?.barterDescription?.length > 0)
      return setDisable(false);
    if (page === 4 && type?.price?.length > 0) return setDisable(false);
    if (page === 5 && platforms?.length > 0) return setDisable(false);
    if (page === 6 && followers?.length > 0) return setDisable(false);
    if (page === 7 && gender) return setDisable(false);
    if (page === 8 && categories.length > 0) return setDisable(false);
    setDisable(true);
  }, [
    page,
    name,
    description,
    images,
    showType,
    type,
    platforms,
    followers,
    gender,
    categories,
  ]);

  useEffect(() => {
    if (filterKey.length < 1) return setFiltered(allCategories);
    setFiltered(
      allCategories.filter((c) =>
        c.toLowerCase().includes(filterKey.toLowerCase())
      )
    );
  }, [filterKey]);

  return (
    <div className="r-box py-24 flex items-center justify-center">
      {loading && (
        <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center z-20 bg-[#8685856e]">
          <Spinner />
        </div>
      )}
      {!preview ? (
        <form className="w-full max-w-[600px]" onSubmit={next}>
          {/* Name */}
          {page === 1 && (
            <div>
              <p className="text-xl font-medium">What's your campaign name?</p>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border w-full mt-3 border-black rounded-md p-2 outline-none"
                type="text"
              />
            </div>
          )}

          {/* Description */}
          {page === 2 && (
            <div>
              <p className="text-xl font-medium">
                What's your campaign description?
              </p>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border w-full mt-3 border-black rounded-md p-2 outline-none"
                rows="4"
              />
            </div>
          )}

          {/* Images */}
          {page === 3 && (
            <div>
              <p className="text-xl font-medium">
                Please select images <small>(max 5)</small>{" "}
              </p>
              <div className="my-6 flex flex-wrap gap-4 w-fit">
                <div className="bg-gray-300 w-24 h-24 rounded-md  relative">
                  <label htmlFor="file-input">
                    <img
                      className="absolute inset-0 cursor-pointer"
                      src={plus}
                      alt=""
                    />
                  </label>
                  <input
                    className="hidden"
                    id="file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={filterImage}
                  />
                </div>
                {images.map((image) => (
                  <div
                    key={image.name}
                    className="w-24 h-24 rounded-md bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(image)})`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Catagory */}
          {page === 4 && (
            /* Giveaway */
            <div>
              <p className="text-xl font-medium">Do you want to:</p>
              <div
                style={{
                  backgroundColor: showType === "Barter" ? "black" : "white",
                  color: showType === "Barter" ? "white" : "black",
                }}
                onClick={() => {
                  showType !== "Barter" && setShowType("Barter");
                  showType !== "Barter" &&
                    setType({ barter: true, barterDescription: "" });
                }}
                className="border-2 border-black rounded-md flex items-center gap-8 px-5 w-64 h-12 font-medium mt-5 mb-2 cursor-pointer"
              >
                <p
                  style={{
                    borderColor: showType === "Barter" ? "white" : "black",
                  }}
                  className="border-2 px-2 rounded-md"
                >
                  A
                </p>
                <p>Giveaway Product</p>
              </div>
              {/* Description */}
              {showType === "Barter" && (
                <div className="mb-2">
                  <p className="text-md font-medium">Describe your giveaway</p>
                  <textarea
                    required
                    onChange={(e) =>
                      setType({ ...type, barterDescription: e.target.value })
                    }
                    value={type?.barterDescription}
                    className="border w-full mt-1 border-black rounded-md p-2 outline-none"
                    rows="3"
                  />
                </div>
              )}

              {/* Paid */}
              <div
                style={{
                  backgroundColor: showType === "Paid" ? "black" : "white",
                  color: showType === "Paid" ? "white" : "black",
                }}
                onClick={() => {
                  showType !== "Paid" && setShowType("Paid");
                  showType !== "Paid" && setType({ barter: false, price: "" });
                }}
                className="border-2 border-black rounded-md flex items-center gap-8 px-5 w-64 h-12 font-medium cursor-pointer"
              >
                <p
                  style={{
                    borderColor: showType === "Paid" ? "white" : "black",
                  }}
                  className="border-2 border-black px-2 rounded-md"
                >
                  B
                </p>
                <p>Pay Influencers</p>
              </div>
              {/* Price */}
              {showType === "Paid" && (
                <div className="mt-2">
                  <p className="text-md font-medium">Enter the pricing</p>
                  <div className="relative border mt-1">
                    <input
                      required
                      onChange={(e) =>
                        setType({
                          ...type,
                          price: e.target.value,
                        })
                      }
                      value={type?.price}
                      className="border w-full border-black rounded-md p-2 outline-none pl-5"
                      type="number"
                      min={0}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^\d]/, ""))
                      }
                    />
                    <p className="absolute top-1/2 -translate-y-1/2 left-2">
                      $
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Platforms */}
          {page === 5 && (
            <div>
              <p className="text-xl font-medium">Select the Platform</p>
              {allPlatforms.map(({ key, item }) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: platforms.includes(item)
                      ? "black"
                      : "white",
                    color: platforms.includes(item) ? "white" : "black",
                  }}
                  onClick={() => {
                    setPlatforms(
                      platforms.includes(item)
                        ? platforms.filter((platform) => platform !== item)
                        : [...platforms, item]
                    );
                  }}
                  className="border-2 border-black rounded-md flex items-center gap-8 px-5 w-64 h-12 font-medium mt-4 cursor-pointer"
                >
                  <p
                    style={{
                      borderColor: platforms.includes(item) ? "white" : "black",
                    }}
                    className="border-2 px-2 rounded-md"
                  >
                    {key}
                  </p>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          )}

          {/* Followers */}
          {page === 6 && (
            <div>
              <p className="text-xl font-medium">Minimum followers</p>
              <input
                required
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                className="border w-full mt-3 border-black rounded-md p-2 outline-none"
                type="number"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^\d]/, ""))
                }
              />
            </div>
          )}

          {/* Gender */}
          {page === 7 && (
            <div>
              <p className="text-xl font-medium">
                Gender for your Target Audience
              </p>
              <div className="w-fit relative">
                <div
                  style={{ color: gender ? "black" : "#7c7b7b" }}
                  onClick={() => setShowGenders(!showGenders)}
                  className=" border-2 border-black w-64 h-12 flex items-center justify-between px-5 mt-3 rounded-md font-medium cursor-pointer"
                >
                  <p>{gender || "Select Gender"}</p>
                  <img className="w-5" src={arrowDownBlack} alt="" />
                </div>
                {showGenders && (
                  <div className="absolute w-full left-0 top-11 bg-white border-2 border-black border-t-0 rounded-bl-md rounded-br-md">
                    {allGenders.map((g) => (
                      <p
                        onClick={() => {
                          setGender(g);
                          setShowGenders(false);
                        }}
                        key={g}
                        className="px-5 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {g}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Catagories */}
          {page === 8 && (
            <div>
              <p className="text-xl font-medium">
                Choose categories for your product <small>(max 5)</small>
              </p>
              <div
                style={{ color: categories.length > 0 ? "black" : "#7c7b7b" }}
                onClick={() => setShowCategories(true)}
                className=" border-2 border-black w-fit min-w-[300px] max-w-[100%] h-12 flex items-center justify-between gap-5 px-2 mt-3 rounded-md font-medium cursor-pointer"
              >
                <p>
                  {categories?.toString()?.replace(/,/g, ", ") ||
                    "Select Categories"}
                </p>
                <img className="w-5" src={arrowDownBlack} alt="" />
              </div>
              {showCategories && (
                <div className="">
                  <div
                    onClick={() => setShowCategories(false)}
                    className="fixed w-full h-screen top-0 left-0 bg-[#807f7f60]"
                  />
                  <div className="bg-white py-5 px-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[400px] rounded-md">
                    <p className="text-lg font-medium">Select Categories</p>
                    <div className="flex items-center border border-black rounded-md pl-2 overflow-hidden my-6">
                      <BsSearch />
                      <input
                        value={filterKey}
                        onChange={(e) => setFilterKey(e.target.value)}
                        className="w-full p-1 outline-none"
                        type="text"
                      />
                    </div>
                    <div className="max-h-[350px] overflow-y-scroll">
                      {filtered.map((category) => (
                        <div
                          onClick={() =>
                            setCategories(
                              categories.includes(category)
                                ? categories
                                    .filter((c) => c !== category)
                                    .slice(0, 5)
                                : [...categories, category].slice(0, 5)
                            )
                          }
                          key={category}
                          className="flex items-center justify-between pr-5 mb-4 cursor-pointer"
                        >
                          <p>{category}</p>
                          {categories.includes(category) && (
                            <img className="w-6" src={selected} alt="" />
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCategories(false)}
                      className="bg-black text-white w-3/4 block mx-auto mt-5 p-2 rounded-md"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit part */}
          <div className="mt-5 flex gap-10">
            <button
              disabled={disable}
              type="submit"
              style={{
                backgroundColor: disable ? "#686767" : "black",
                cursor: disable ? "auto" : "pointer",
              }}
              className="text-white flex items-center justify-center gap-2 w-36 h-10 rounded-md"
            >
              <p>{page === 8 ? "Submit" : "Done"}</p>
              <img className="w-4" src={correct} alt="" />
            </button>
            {page === 8 && categories.length > 0 && (
              <button
                onClick={() => setPreview(true)}
                type="button"
                className="text-black bg-white border-2 border-black font-medium flex items-center justify-center w-36 h-10 rounded-md"
              >
                Preview
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 justify-end mt-14">
            <button
              disabled={page === 1}
              onClick={() => page > 1 && setPage((prev) => prev - 1)}
              type="button"
              style={{ backgroundColor: page === 1 ? "#686767" : "black" }}
              className=" w-9 h-9 p-2 flex items-center justify-center rounded-md"
            >
              <img src={upArrow} alt="" />
            </button>
            <button
              disabled={disable || page === 8}
              type="submit"
              style={{
                backgroundColor: disable || page === 8 ? "#686767" : "black",
              }}
              className=" w-9 h-9 p-2 flex items-center justify-center rounded-md"
            >
              <img src={downArrow} alt="" />
            </button>
          </div>
        </form>
      ) : (
        <Preview
          name={name}
          description={description}
          images={images}
          type={type}
          platforms={platforms}
          followers={followers}
          categories={categories}
          setPreview={setPreview}
        />
      )}
    </div>
  );
};

export default CreateCampaign;
