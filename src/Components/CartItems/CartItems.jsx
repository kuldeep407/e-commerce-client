import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

export default function CartItems() {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">Shopping Cart</h2>

      <div className="hidden md:grid grid-cols-6 font-semibold border-b pb-2">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      {all_product.map(
        (product) =>
          cartItems[product.id] > 0 && (
            <div
              key={product.id}
              className="grid grid-cols-1 md:grid-cols-6 items-center border-b py-4 gap-4 md:gap-0 text-center md:text-left"
            >
              <img src={product.image} alt="" className="w-16 h-16 object-cover mx-auto md:mx-0" />
              <p className="text-sm">{product.name}</p>
              <p className="font-semibold">${product.new_price}</p>
              <p>{cartItems[product.id]}</p>
              <p className="font-semibold">${product.new_price * cartItems[product.id]}</p>
              <img
                src={remove_icon}
                alt="Remove"
                className="w-4 h-4 cursor-pointer mx-auto md:mx-0"
                onClick={() => removeFromCart(product.id)}
              />
            </div>
          )
      )}

      <div className="flex flex-col md:flex-row w-full mx-auto justify-between mt-10 gap-8">

        <div className="flex flex-col w-full md:w-[40%] p-6 bg-white rounded-lg">
          <h1 className="font-semibold text-xl border-b pb-2">Cart Totals</h1>

          <div className="mt-4">
            <div className="flex justify-between p-3">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-semibold text-lg">${getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="flex justify-between p-3">
              <p className="text-gray-600">Shipping Fee</p>
              <p className="font-semibold">Free</p>
            </div>
            <hr />

            <div className="flex justify-between p-3">
              <h3 className="text-lg font-semibold">Total</h3>
              <h3 className="text-xl font-bold">${getTotalCartAmount()}</h3>
            </div>
          </div>

          <button className="mt-6 border bg-[#ff5a5a] text-white px-6 py-3 font-medium text-lg rounded-md hover:bg-[#e63a3a] transition duration-300 shadow-md">
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="w-full md:w-[50%] bg-white p-6 rounded-lg">
          <p className="text-gray-600 font-medium text-base">If you have a promo code, enter it here:</p>

          <div className="flex flex-col md:flex-row mt-4 gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="text-[16px] w-full md:w-auto max-w-md h-[50px] bg-gray-200 pl-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="border px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
