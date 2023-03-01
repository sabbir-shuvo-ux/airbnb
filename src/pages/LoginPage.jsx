import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { GlobalUserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(false);

  const { setUser, setReady } = GlobalUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      return;
    }
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      if (data) {
        setUser(data);
        setReady(true);
        window.localStorage.setItem("regUser", email);
      }
      setRedirect(true);
      toast.success("Login Sucessfull", {
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
    } catch (err) {
      setLoader(false);
      console.log(err);
      toast.error("Login Faild", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-[calc(100vh-75px)] flex justify-center items-center mx-4">
      <div className="flex w-full flex-col justify-center items-center">
        <h1 className="text-4xl pb-4">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full flex flex-col form_costume gap-4"
        >
          <input
            className="focus:outline-none focus:border-primary"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="focus:outline-none focus:border-primary"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            disabled={loader}
            className="bg-primary text-white p-2 rounded-xl cursor-pointer"
          >
            {loader ? <Loader /> : "Login"}
          </button>
          <div className="text-gray-400">
            Don't have an account yet?{" "}
            <Link className="text-gray-500" to={"/register"}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
