import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import CardPlace from "../components/CardPlace";

const BookingLIst = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bookings`)
      .then(({ data }) => {
        setBookings(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <AccountNav />
      <div className="">
        {bookings.length === 0 ? (
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
            Book some place to check booklist
          </div>
        ) : (
          <CardPlace givenData={bookings} />
        )}
      </div>
    </>
  );
};

export default BookingLIst;
