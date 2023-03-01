import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import CardPlace from "../components/CardPlace";

const PlaceBtn = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const getPlaces = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/places`
      );
      setAllPlaces(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <>
      <AccountNav />
      <div className="text-center mt-5">
        <Link
          className="px-4 py-2 inline-flex gap-2 bg-primary rounded-full text-white"
          to={"/account/places/new"}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      {allPlaces.length === 0 ? (
        <div className="mt-7 gap-2 text-gray-500 text-2xl flex items-center justify-center">
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
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          Add some place to check your placelist
        </div>
      ) : (
        <CardPlace givenData={allPlaces} path="/account/places/" />
      )}
    </>
  );
};

export default PlaceBtn;
