import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

export default function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto">
      <img src={props.banner} alt="Category Banner" className="w-full h-auto max-w-full" />

      <div className="flex flex-col md:flex-row mt-8 md:mt-12 justify-between items-center text-center md:text-left">
        <p className="text-xs sm:text-sm md:text-base">
          <span className="font-semibold">Showing 1-12</span> out of 36 products
        </p>

        <div className="px-4 py-2 flex items-center gap-2 rounded-full border border-gray-400 cursor-pointer hover:bg-gray-200 transition-all mt-3 sm:mt-0">
          <span className="text-xs sm:text-sm md:text-base">Sort by</span>
          <img src={dropdown_icon} alt="Dropdown Icon" className="h-3 w-3 mt-0.5 " />
        </div>
      </div>

      <div className="mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-0">
        {all_product.map((item, index) => {
          if (props.category === item.category) {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null;
        })}
      </div>

      <div className="flex justify-center">
        <div className="py-2 px-6 w-[180px] rounded-full bg-[#ededed] text-[#787878] cursor-pointer transition-all duration-300 hover:bg-gray-300 text-center mb-[40px] ">
          Explore more
        </div>
      </div>
    </div>
  );
}
