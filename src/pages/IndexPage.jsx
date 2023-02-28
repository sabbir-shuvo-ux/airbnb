import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  const handleAllPlace = async () => {
    try {
      const { data } = await axios.get("/all-place");
      setAllPlaces(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleAllPlace();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8 my-4 mx-4">
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
    </div>
  );
};

export default IndexPage;
