import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotoUploader from "./PhotoUploader";
import axios from "axios";
import AccountNav from "./AccountNav";

const PLaceFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setaddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/places/${id}`)
      .then((res) => {
        const { data } = res;
        setTitle(data.title);
        setAddedPhotos(data.photos);
        setaddress(data.address);
        setDescription(data.description);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setMaxGuest(data.maxGuest);
        setPrice(data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDec = (text) => {
    return <p className="text-gray-500 text-sm mb-2">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDec(description)}
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !address ||
      !addedPhotos ||
      !description ||
      !perks ||
      !extraInfo ||
      !checkIn ||
      !checkOut ||
      !maxGuest ||
      !price
    ) {
      alert("Please fill every input");
      return;
    }

    const placeDatas = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    };

    if (id) {
      // update place
      try {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/places`, {
          id,
          ...placeDatas,
        });
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    } else {
      // create place
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/places`, placeDatas);
        navigate("/account/places");
        setAddedPhotos([]);
        setTitle("");
        setaddress("");
        setCheckIn("");
        setCheckOut("");
        setDescription("");
        setPerks([]);
        setExtraInfo("");
        setMaxGuest(1);
        setPrice(100);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <AccountNav />
      <div className="max-w-[600px] m-auto">
        <form onSubmit={handleSubmit} className="form_costume p-4">
          {preInput(
            "Title",
            "Title for your place should be short and catchy as in adverteisment"
          )}
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full"
            type="text"
            placeholder="Title, for example: my lovely apt."
          />

          {preInput("Address", "Address to this place")}
          <input
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className="w-full"
            type="text"
            placeholder="Address"
          />

          {preInput("Photos", "more = better")}
          <PhotoUploader
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
          />
          {preInput("Description", "Description of the place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
          ></textarea>

          {preInput("Perks", "Select all avaiable perks of your place")}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <Perks perks={perks} setPerks={setPerks} />
          </div>

          {preInput("Extra info", "House, Rules, Etc...")}
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            className="w-full"
          ></textarea>

          {preInput(
            "Check In & Out times",
            " Remember of keep some time to cleaning window between guests"
          )}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <h3>Check in time</h3>
              <input
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                type="text"
                placeholder="14:00"
                className="w-full mt-2"
              />
            </div>
            <div>
              <h3>Check out time</h3>
              <input
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                type="text"
                placeholder="20:00"
                className="w-full mt-2"
              />
            </div>
            <div>
              <h3>Max guest number</h3>
              <input
                value={maxGuest}
                onChange={(e) => setMaxGuest(e.target.value)}
                type="number"
                placeholder="5"
                className="w-full mt-2"
              />
            </div>
            <div>
              <h3>Price</h3>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="5"
                className="w-full mt-2"
              />
            </div>
          </div>
          <button className="bg-primary w-full rounded-xl my-4 py-2 text-white inline-flex justify-center items-center gap-2">
            Save
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 relative top-[1px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default PLaceFormPage;
