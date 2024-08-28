import Navbar from "@/components/navbar/navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const mainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default mainLayout;
