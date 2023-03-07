import React, { useState } from "react";
import axios from "axios";

const PhotoUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();

    try {
      const { data: filename } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload-by-link`,
        {
          link: photoLink,
        }
      );

      setAddedPhotos((prev) => {
        return [...prev, filename];
      });

      setPhotoLink("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data: filename } = res;
        setAddedPhotos((prev) => {
          return [...prev, ...filename];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removePhoto = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((s) => s !== filename)]);
  };

  const selectCoverPhoto = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((item) => item !== filename),
    ]);
  };
  return (
    <>
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          className="flex-1"
          type="text"
          placeholder="Add photo using link"
        />

        <button
          onClick={addPhotoByLink}
          className="rounded-xl bg-primary px-3 text-white inline-flex items-center"
        >
          Add Photo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 mt-3 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((item) => (
            <div className="h-32 relative" key={item}>
              <img
                className="rounded-2xl w-full h-full object-cover"
                src={item}
              />
              <button
                onClick={(e) => removePhoto(e, item)}
                className="absolute cursor-pointer right-1 bottom-1 p-2 text-white bg-black bg-opacity-50 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => selectCoverPhoto(e, item)}
                className="absolute cursor-pointer left-1 bottom-1 p-2 text-white bg-black bg-opacity-50 rounded-xl"
              >
                {addedPhotos[0] === item && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {addedPhotos[0] !== item && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="text-gray-400 transition h-32 items-center hover:text-gray-600 border bg-transparent p-8 rounded-2xl flex justify-center">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          Upload &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </label>
      </div>
    </>
  );
};

export default PhotoUploader;
