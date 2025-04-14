import React, { useState, useContext } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductDisplay(props) {
  const navigate = useNavigate();
  const { product } = props;
  const { addToCart, buyNow } = useContext(ShopContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = async () => {
    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      toast.error("Please log in to proceed with payment!");
      navigate("/user-auth");
      return;
    }
    setIsModalOpen(true);
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    const { address, city, postalCode, country } = shippingAddress;
    if (!address || !city || !postalCode || !country) {
      toast.error("Please fill in all shipping details!");
      return;
    }

    setIsModalOpen(false);
    const success = await buyNow(product._id, 1, shippingAddress);
    if (success) {
      navigate("/orders");
    }
  };

  return (
    <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 p-6 md:p-12 bg-white rounded-2xl">
      <div className="flex flex-col sm:flex-row ">
        <div className="flex sm:flex-col gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/images/${product.image
              .split("/")
              .pop()}`}
            alt="Thumbnail"
            className="w-20 h-24 sm:w-24 sm:h-28 object-cover cursor-pointer hover:scale-105 transition duration-300 "
          />
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/images/${product.image
              .split("/")
              .pop()}`}
            alt="Thumbnail"
            className="w-20 h-24 sm:w-24 sm:h-28 object-cover cursor-pointer hover:scale-105 transition duration-300 "
          />
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/images/${product.image
              .split("/")
              .pop()}`}
            alt="Thumbnail"
            className="w-20 h-24 sm:w-24 sm:h-28 object-cover cursor-pointer hover:scale-105 transition duration-300 "
          />
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/images/${product.image
              .split("/")
              .pop()}`}
            alt="Thumbnail"
            className="w-20 h-24 sm:w-24 sm:h-28 object-cover cursor-pointer hover:scale-105 transition duration-300 "
          />
        </div>

        <div className="flex justify-center sm:w-full mt-4 sm:mt-0">
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/images/${product.image
              .split("/")
              .pop()}`}
            alt="Main Product"
            className="w-full sm:w-[400px] h-[320px] sm:h-[490px] max-w-full transition hover:scale-105 duration-300 rounded-lg"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-5 md:space-y-7 pl-2 sm:pl-4 md:pl-8">
        {/* Product Name */}
        <h1 className="text-2xl sm:text-4xl font-medium text-gray-900">
          {product.name}
        </h1>

        {/* Rating Section */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((_, index) => (
            <img
              key={index}
              src={star_icon}
              alt="Star"
              className="w-5 sm:w-6"
            />
          ))}
          <img src={star_dull_icon} alt="Dull Star" className="w-5 sm:w-6" />
          <p className="text-gray-500 text-sm sm:text-base ml-2">
            (122 Reviews)
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          <p className="text-gray-400 line-through text-lg sm:text-2xl">
          ₹{product.old_price}
          </p>
          <p className="text-xl sm:text-3xl font-bold text-red-500">
          ₹{product.new_price}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
          A lightweight, knitted pullover shirt with a round neckline and short
          sleeves, perfect for layering or wearing alone in any season.
        </p>

        {/* Size Selection */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Select Size
          </h2>
          <div className="flex flex-wrap gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className="px-5 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-200 transition text-base sm:text-lg font-medium shadow-sm"
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart and Buy Button */}

        <div className="space-x-4">
          <button
            onClick={async () => {
              const authToken = localStorage.getItem("auth-token");

              if (!authToken) {
                toast.error("Please log in to add items to the cart!");
                return;
              }

              const isAdded = await addToCart(product.id);
              if (isAdded) {
                navigate("/cart");
              }
            }}
            className="px-6 py-3 bg-[#ff4141] text-white font-medium text-lg hover:bg-[#e63a3a] transition duration-300 transform hover:scale-105 w-full sm:w-auto rounded-lg"
          >
            ADD TO CART
          </button>

          <button
            onClick={handleBuyNow}
            className="px-6 py-3 bg-[#ff4141] text-white font-medium text-lg hover:bg-[#e63a3a] transition duration-300 transform hover:scale-105 w-full sm:w-auto rounded-lg"
          >
            BUY NOW
          </button>
        </div>

        {/* Category and Tags */}
        <div className="text-base sm:text-lg text-gray-600 space-y-1">
          <p>
            <span className="font-semibold">Category:</span> Women, T-Shirt,
            Crop Top
          </p>
          <p>
            <span className="font-semibold">Tags:</span> Modern, Latest
          </p>
        </div>
      </div>

      {/* Shipping Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Enter Shipping Details
            </h2>
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff4141] text-white rounded-md hover:bg-[#e63a3a]"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
