import React from "react";
import { useNavigate } from "react-router-dom";

const Empty = ({ title, url }) => {
  const naviget = useNavigate();
  return (
    <div className="text-center min-[60vh] py-16">
      <img className=" w-[200px] flex m-auto" src={url} alt="" />
      <p className="text-[24px] font-quicksand text-[#0009] font-[700]">
        {title}
      </p>
      <button
        onClick={() => naviget("/")}
        className="w-[150px] border rounded-[5px] text-[#fff] bg-slate-500 py-2 mt-3"
      >
        Home
      </button>
    </div>
  );
};

export default Empty;
