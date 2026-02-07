import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    // user not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // user logged in → render the page
};

export default ProtectedRoute;