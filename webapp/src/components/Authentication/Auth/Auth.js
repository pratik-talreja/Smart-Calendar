import React from "react";
import { Navigate, Route } from "react-router-dom";

const Auth = ({ children }) => {
  const authenticated = localStorage.getItem("isAuthenticated");

  return authenticated ? children : <Navigate to="/signin" />;
};

export default Auth;
