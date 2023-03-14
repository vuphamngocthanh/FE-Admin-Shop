import React from "react";
import Login from "../components/main/Login";

function Auth({ children }) {
  const currentToken = localStorage.getItem("accessToken");

  return <>{currentToken ? children : <Login />}</>;
}

export default Auth;
