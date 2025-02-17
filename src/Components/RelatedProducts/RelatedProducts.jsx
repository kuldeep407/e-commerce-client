import React from "react";
import data_product from "../Assets/data";
import Item from "../Item/Item"

export default function RelatedProducts() {
  return (
    <div className="flex flex-col w-[88%] mx-auto items-center h-auto mt-[60px] mb-[60px] ">
    <h1 className="text-[#171717] text-4xl font-semibold">Related Products</h1>
    <hr className="w-[200px] h-[6px] border-none rounded-md bg-[#252525] mt-2" />

    <div className="flex flex-wrap justify-center mt-8">
      {data_product.map((item, index) => (
        <Item
          key={index}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}
        />
      ))}
    </div>
  </div>
  );
}
