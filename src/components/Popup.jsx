import React from "react";

const Popup = ({
  setShowAllPhoto,
  singlePlace,
  showAllPhoto,
  setSeeMorePop,
  seeMorePop,
}) => {
  if (seeMorePop) {
    return (
      <div className="absolute min-w-full min-h-screen bg-black top-0 left-0">
        <button
          onClick={() => setSeeMorePop(false)}
          className="flex py-2 px-3 rounded-2xl fixed top-10 shadow-md shadow-black hover:shadow-none right-10 bg-gray-200 text-black"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Close photos
        </button>
        <div className="w-[75%] mx-auto mt-8">
          <h1 className="text-2xl text-white mb-3 font-semibold">
            Description of {singlePlace.title}
          </h1>
          <p className="text-white"> {singlePlace.description} </p>
        </div>
      </div>
    );
  }
  if (showAllPhoto) {
    return (
      <div className="absolute min-w-full min-h-screen bg-black top-0 left-0">
        <button
          onClick={() => setShowAllPhoto(false)}
          className="flex py-2 px-3 rounded-2xl fixed top-10 shadow-md shadow-black hover:shadow-none right-10 bg-gray-200 text-black"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Close photos
        </button>
        <div className="grid gap-5 p-8 w-full md:w-[75%] mx-auto">
          <h1 className="text-white text-2xl">Photos of {singlePlace.title}</h1>
          {singlePlace.photos?.map((photo) => (
            <div className="w-full">
              <img className="w-full" src={photo} alt={singlePlace._id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Popup;
