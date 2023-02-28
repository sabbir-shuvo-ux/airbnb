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
        <CardPlace givenData={bookings} />
      </div>
    </>
  );
};

export default BookingLIst;
