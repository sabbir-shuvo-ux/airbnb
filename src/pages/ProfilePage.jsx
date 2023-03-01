import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { GlobalUserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [loader, setLoader] = useState(false);
  const { user, setUser } = GlobalUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoader(true);
      await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`);

      setUser(null);
      window.localStorage.removeItem("regUser");
      navigate("/");
      toast.success("Login Sucessfull", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
      toast.success("something wrong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <AccountNav />

      <div className="max-w-lg mx-auto text-center mt-5">
        Logged in as {user?.name} ({user?.email})
        <button
          disabled={loader}
          onClick={handleLogout}
          className="w-full mt-4 bg-primary py-2 rounded-full text-white"
        >
          {loader ? <Loader /> : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
