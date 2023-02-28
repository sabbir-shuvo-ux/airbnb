import React from "react";
import { GlobalUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtecedRoute = ({ children }) => {
  const { ready } = GlobalUserContext();
  const getUser = window.localStorage.getItem("regUser");

  if (ready || getUser) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtecedRoute;
