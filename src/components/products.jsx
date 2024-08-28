import React from "react";
import { Card } from "antd";
import { FaHeart } from "react-icons/fa";
import { useStateValue } from "@/context/index";
import Skeletons from "@/components/skelotons/skeletons";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
const Products = ({ data, loading }) => {
  if (loading) {
    return <Skeletons limit={10} />;
  }
  const [{ wishlist }, dispatch] = useStateValue();
  let items = data?.map((product) => {
    return (
      <Card key={product.id} className="relative">
        <div>
          <img
            className="w-60 h-[200px] object-contain duration-300 hover:scale-105"
            src={product.images[0]}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-[700] text-[#253D4E] text-start">
            {product.title.slice(0, 20)}...
          </p>
          <p className="text-start text-[12px] text-[#ADADAD]">
            {product.category}
          </p>
          <p className="text-[18px] text-[#3BB77E] font-[700]">
            ${product.price}
          </p>
        </div>
        <div className="absolute top-2 right-2">
          <button
            onClick={() =>
              dispatch({ type: "TOGGLE_WISHLIST", payload: product })
            }
            className="rounded-[10px] p-[5px] text-[16px] text-red-500 hover:bg-red-100 duration-300"
          >
            {wishlist.some((item) => product.id === item.id) ? (
              <IoIosHeart size={25} />
            ) : (
              <IoIosHeartEmpty size={25} />
            )}
          </button>
        </div>
      </Card>
    );
  });
  return (
    <div className="container mx-auto mt-7 mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {items}
      </div>
    </div>
  );
};

export default Products;
