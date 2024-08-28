import { useStateValue } from "@/context";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  let [{ user }] = useStateValue();
  return user?.accessToken ? <Outlet /> : <Navigate replace to={"/login"} />;
};

export default Auth;
