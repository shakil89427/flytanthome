import React, { useEffect, useState } from "react";
import correct from "../Assets/onboard/correct.png";
import upArrow from "../Assets/onboard/up.png";
import downArrow from "../Assets/onboard/down.png";
import plus from "../Assets/plus.png";

const CreateCampaign = () => {
  const [page, setPage] = useState(1);
  const [disable, setDisable] = useState(true);

  /* Data states */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  /* Next or submit */
  const next = (e) => {
    e.preventDefault();
    if (disable) return;
    setPage((prev) => prev + 1);
  };

  /* Check state */
  useEffect(() => {
    if (page === 1 && title.length > 0) return setDisable(false);
    if (page === 2 && description.length > 0) return setDisable(false);
    if (page === 3 && images.length > 0) return setDisable(false);
    setDisable(true);
  }, [page, title, description, images]);

  return (
    <div className="r-box py-24 flex items-center justify-center">
      <form className="w-full max-w-[600px]" onSubmit={next}>
        {/* Name */}
        {page === 1 && (
          <div>
            <p className="text-xl font-medium">What's your campaign name?</p>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <p className="text-xl font-medium">Please select images</p>
            <div className="my-6 flex items-center gap-3">
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
                  required
                  onChange={(e) => {
                    setImages([...e.target.files].slice(0, 4));
                    e.target.value = null;
                  }}
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

        {/* Submit part */}
        <div className="flex items-center gap-2 mt-5">
          <button
            disabled={disable}
            type="submit"
            style={{
              backgroundColor: disable ? "#686767" : "black",
              cursor: disable ? "auto" : "pointer",
            }}
            className="text-white flex items-center gap-2 px-7 py-2 rounded-md"
          >
            <p>Done</p>
            <img className="w-4" src={correct} alt="" />
          </button>

          {!disable && <p className="text-xs">Press 'Enter'</p>}
        </div>
        <div className="flex items-center gap-3 justify-end mt-14">
          <button
            disabled={page === 1}
            onClick={() => page > 1 && setPage((prev) => prev - 1)}
            type="button"
            style={{ backgroundColor: page === 1 ? "#686767" : "black" }}
            className=" w-9 h-9 p-2 flex items-center justify-center rounded"
          >
            <img src={upArrow} alt="" />
          </button>
          <button
            disabled={disable}
            type="submit"
            style={{
              backgroundColor: disable ? "#686767" : "black",
            }}
            className=" w-9 h-9 p-2 flex items-center justify-center rounded"
          >
            <img src={downArrow} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
