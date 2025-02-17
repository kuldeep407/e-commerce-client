import React from "react";
import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <div className="w-full sm:max-w-[320px] p-3 transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={props.image.replace("http://localhost:4000", import.meta.env.VITE_APP_BACKEND_URL)}
          alt={props.name}
          className="w-full h-auto object-cover rounded-lg"
        />
      </Link>

      <p className="mt-2 font-medium text-gray-800 text-sm sm:text-base md:text-lg">
        {props.name}
      </p>

      <div className="flex gap-3 mt-1 items-center">
        <div className="text-[#374151] font-bold text-sm sm:text-base md:text-lg">
          ${props.new_price}
        </div>
        <div className="text-[#8c8c8c] font-semibold text-xs sm:text-sm md:text-base line-through">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
}
