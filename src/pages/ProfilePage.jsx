import axios from "axios";
import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { GlobalUserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user, setUser } = GlobalUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`);
      setUser(null);
      window.localStorage.removeItem("regUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AccountNav />

      <div className="max-w-lg mx-auto text-center mt-5">
        Logged in as {user?.name} ({user?.email})
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-primary py-2 rounded-full text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
