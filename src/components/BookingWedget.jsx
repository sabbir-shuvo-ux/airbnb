import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { GlobalUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const BookingWedget = ({ singlePlace }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestNumber, setGuestNumber] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const { user } = GlobalUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNight = 0;
  if (checkIn && checkOut) {
    numberOfNight = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    try {
      const price = numberOfNight * singlePlace.price;

      if (!user) return;

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/bookings`,
        {
          checkIn,
          checkOut,
          guestNumber,
          name,
          mobile,
          place: singlePlace._id,
          price,
        }
      );

      if (data) {
        navigate("/account/bookings");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rounded-2xl shadow bg-white text-center py-4">
      <div className="text-2xl">${singlePlace.price} /per night</div>
      <div className="border rounded-2xl mx-2 my-4">
        <div className="flex">
          <div className="py-2 px-3">
            <label htmlFor="checkIn">Check In</label>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              id="checkIn"
              type="date"
            />
          </div>
          <div className="py-2 px-3">
            <label htmlFor="checkOut">Check Out</label>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              id="checkOut"
              type="date"
            />
          </div>
        </div>
        <div className="border-t flex flex-col py-2">
          <label>Number of guests</label>
          <input
            className="border mx-2 rounded-2xl px-3 py-2 my-2"
            type="number"
            value={guestNumber}
            onChange={(e) => setGuestNumber(e.target.value)}
          />
        </div>
        {numberOfNight > 0 && (
          <div className="flex flex-col py-2">
            <label>Your full name</label>
            <input
              className="border mx-2 rounded-2xl px-3 py-2 my-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {name && (
          <div className="flex flex-col py-2">
            <label>Phone number</label>
            <input
              className="border mx-2 rounded-2xl px-3 py-2 my-2"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        )}
      </div>
      {numberOfNight > 0 && (
        <>
          <div className="my-3 font-bold">
            ${numberOfNight * singlePlace.price}
          </div>
        </>
      )}
      <button
        onClick={bookThisPlace}
        className="bg-primary rounded-2xl w-[80%] mx-auto py-2 text-white"
      >
        Book now
      </button>
    </div>
  );
};

export default BookingWedget;
