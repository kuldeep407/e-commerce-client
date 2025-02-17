import React from "react";
import arrow_icon from "../Assets/breadcrum_arrow.png";

export default function Breadcrumbs({ product }) {
  return (
    <>
      <div className="py-[50px] mx-auto w-full text-gray-600 text-sm font-medium px-6 bg-red-50 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <a href="/" className="text-base hover:text-[#ff4141] transition duration-200">
            Home
          </a>
          <img src={arrow_icon} alt=">" className="h-4 w-4 opacity-75" />

          <a href="/shop" className="text-base hover:text-[#ff4141] transition duration-200">
            Shop
          </a>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <a href={`/category/${product.category}`} className="text-base hover:text-[#ff4141] transition duration-200">
            {product.category}
          </a>
          <img src={arrow_icon} alt=">" className="h-4 w-4 opacity-75" />

          <span className="text-base text-[#ff4141] font-semibold ">
            {product.name}
          </span>
        </div>
      </div>
    </>
  );
}
