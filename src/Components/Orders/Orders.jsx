import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../Assets/logo.png";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/get-orders`,
        {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        }
      );

      console.log(response.data);
      setOrders(response.data.orders || []);
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Your Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg sm:text-xl mb-4">
              No orders found.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[#ff4141] text-white font-medium rounded-lg hover:bg-[#e63a3a] transition duration-300 text-sm sm:text-base"
            >
              Shop Now
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <span
                    className={`text-xs sm:text-sm px-3 py-1 rounded-full font-semibold ${
                      order.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "delivered"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-3">
                  Placed on{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                </p>

                <div className="space-y-6">
                  {order.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <img
                        src={
                          item.productId.image
                            ? `${
                                import.meta.env.VITE_APP_BACKEND_URL
                              }/images/${item.productId.image.split("/").pop()}`
                            : "https://via.placeholder.com/60"
                        }
                        alt={item.productId.name}
                        className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-base font-semibold text-gray-800">
                          {item.productId.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            Shipping:
                          </span>{" "}
                          {order.shippingAddress.address},{" "}
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.postalCode},{" "}
                          {order.shippingAddress.country}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">
                          Total:{" "}
                          <span className="text-[#ff4141]">
                            ₹{order.totalAmount.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
