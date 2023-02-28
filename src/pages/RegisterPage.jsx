import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });

      if (data) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-75px)] flex justify-center items-center mx-4">
      <div className="flex w-full flex-col justify-center items-center">
        <h1 className="text-4xl pb-4">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full flex flex-col form_costume gap-4"
        >
          <input
            className="focus:outline-none focus:border-primary"
            type="text"
            placeholder="Test Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary text-white p-2 rounded-xl cursor-pointer">
            Register
          </button>
          <div className="text-gray-400">
            Already have an account yet?{" "}
            <Link className="text-gray-500" to={"/login"}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
