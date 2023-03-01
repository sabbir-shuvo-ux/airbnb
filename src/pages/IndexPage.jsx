import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleAllPlace = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/all-place`
      );

      setAllPlaces(data);
      setLoader(false);
    } catch (err) {
      toast.error("Reload require", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleAllPlace();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8 my-4 mx-4">
      {loader ? (
        <Loader style="fixed left-[50%] translate-x-[-50%]" />
      ) : (
        <>
          {allPlaces.length > 0 &&
            allPlaces.map((item) => (
              <Link to={`/place/${item._id}`} key={item._id}>
                <div className="bg-gray-500 rounded-2xl flex">
                  {item.photos.length > 0 && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={`${import.meta.env.VITE_IMG_LINK}${item.photos[0]}`}
                    />
                  )}
                </div>
                <h2 className="font-bold text-base mt-1"> {item.address} </h2>
                <h3 className="text-sm text-gray-500"> {item.title} </h3>
                <div> {item.price} per night</div>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default IndexPage;
