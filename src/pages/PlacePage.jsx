import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWedget from "../components/BookingWedget";
import Popup from "../components/Popup";

const PlacePage = () => {
  const [singlePlace, setSinglePlace] = useState([]);
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  const [seeMorePop, setSeeMorePop] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/places/${id}`)
      .then((res) => {
        setSinglePlace(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openAllPhotos = () => {
    setShowAllPhoto(true);
    window.scrollTo(0, 0);
  };

  const openSeeMore = () => {
    setSeeMorePop(true);
    window.scrollTo(0, 0);
  };

  const limitedText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    } else {
      return text;
    }
  };

  if (showAllPhoto) {
    return (
      <Popup
        showAllPhoto={showAllPhoto}
        singlePlace={singlePlace}
        setShowAllPhoto={setShowAllPhoto}
      />
    );
  }

  if (seeMorePop) {
    return (
      <Popup
        singlePlace={singlePlace}
        seeMorePop={seeMorePop}
        setSeeMorePop={setSeeMorePop}
      />
    );
  }

  return (
    <div className="mt-4 bg-gray-100 p-4 pb-0">
      <h1 className="text-2xl font-semibold"> {singlePlace.title} </h1>
      <a
        title="open location in google map"
        className="font-semibold underline my-2 inline-flex"
        target={"_blank"}
        href={`https://maps.google.com/?q=${singlePlace.address}`}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {singlePlace.address}
      </a>
      <div className="relative my-3 rounded-3xl overflow-hidden">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {singlePlace.photos?.[0] && (
              <div className="h-auto md:h-[500px] max-h-[500px]">
                <img
                  onClick={openAllPhotos}
                  className="aspect-square object-cover h-full w-full cursor-pointer"
                  src={singlePlace.photos?.[0]}
                />
              </div>
            )}
          </div>
          <div className="grid h-auto md:h-[500px] max-h-[500px">
            {singlePlace.photos?.[1] && (
              <img
                onClick={openAllPhotos}
                className="object-cover aspect-square h-full cursor-pointer w-full"
                src={singlePlace.photos?.[1]}
              />
            )}
            <div className="overflow-hidden">
              {singlePlace.photos?.[2] && (
                <img
                  onClick={openAllPhotos}
                  className="relative top-2 object-cover aspect-square cursor-pointer h-full w-full"
                  src={singlePlace.photos?.[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={openAllPhotos}
          className="absolute shadow-md shadow-black py-2 px-3 rounded-2xl hover:shadow-none transition bottom-2 right-2 flex gap-2 bg-white"
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] my-8 gap-8">
        <div>
          <h2 className="font-semibold text-2xl mb-3">Description</h2>
          <p className="">
            {limitedText(singlePlace.description, 400)}{" "}
            {singlePlace.description?.length > 400 && (
              <button
                onClick={openSeeMore}
                className="underline hover:text-primary font-semibold"
              >
                see more
              </button>
            )}
          </p>

          <ul className="mt-3 flex flex-col gap-4">
            <li className="font-semibold inline-flex gap-2">
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Check in: {singlePlace.checkIn}
            </li>
            <li className="font-semibold inline-flex gap-2">
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Check out: {singlePlace.checkOut}
            </li>
            <li className="font-semibold inline-flex gap-2">
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              Max guest: {singlePlace.maxGuest}
            </li>
          </ul>
        </div>

        <div>
          <BookingWedget singlePlace={singlePlace} />
        </div>
      </div>
      <div className="bg-white -mx-4 p-4 border pb-6">
        <h2 className="text-2xl mb-3">Extra info</h2>
        <p> {singlePlace.extraInfo} </p>
      </div>
    </div>
  );
};

export default PlacePage;
