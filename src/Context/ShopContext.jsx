import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};

  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchProducts = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/all-products`;
      const response = await axios.get(url, { withCredentials: true });
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setAll_Product(response.data);
      } else if (response.data && Array.isArray(response.data.products)) {
        setAll_Product(response.data.products);
      } else {
        console.log(response.data);
        setAll_Product([]);
      }
    } catch (err) {
      console.log(err);
      setAll_Product([]);
    }
  };

  const addToCart = async (itemId) => {
    const authToken = localStorage.getItem("auth-token");

    if (!authToken) {
      toast.error("Please log in to add items to the cart!");
      return false;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/add-to-cart`,
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      if (response.data.success) {
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1,
        }));
        toast.success("Product added to cart!");
        return true;
      } else {
        toast.error(response.data.message || "Failed to add item to cart.");
        return false;
      }
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to add item to cart."
      );
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    const authToken = localStorage.getItem("auth-token");

    if (!authToken) {
      toast.error("Please log in to remove items from the cart!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/remove-product-from-cart`,
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      if (response.data.success) {
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
          } else {
            delete updatedCart[itemId];
          }
          return updatedCart;
        });

        toast.success("Product removed from cart!");
      } else {
        toast.error(
          response.data.message || "Failed to remove item from cart."
        );
      }
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to remove item from cart."
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  const fetchCartItems = async () => {
    const authToken = localStorage.getItem("auth-token");

    if (!authToken) {
      setCartItems({});
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/get-all-cart-items`,
        {
          headers: { "auth-token": authToken },
        }
      );

      if (response.data.success && response.data.cartData) {
        setCartItems(response.data.cartData);
      } else {
        setCartItems({});
      }
    } catch (error) {
      console.error(
        "Error fetching cart items:",
        error.response?.data || error.message
      );
      setCartItems({});
    }
  };

  // payment logic start
  const initiatePayment = async (
    orderId,
    razorpayOrderId,
    razorpayKeyId,
    totalAmount
  ) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: razorpayKeyId,
          amount: Math.round(totalAmount * 100),
          currency: "INR",
          order_id: razorpayOrderId,
          handler: async function (response) {
            try {
              const paymentData = {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId,
              };

              const verifyResponse = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/verify-payment`,
                paymentData,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                  },
                }
              );

              if (verifyResponse.data.success) {
                toast.success("Payment Done!");
                resolve(verifyResponse.data);
              } else {
                toast.error(
                  verifyResponse.data.message || "Payment verification failed."
                );
                console.log(verifyResponse.data.message);
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: "Kuldeep Chahar",
            email: "kuldeepchahar426@gmail.com",
            contact: "9694491634",
          },
          theme: {
            color: "#ff4141",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          toast.error("Payment failed. Please try again.");
          console.log(response.error.description);
        });
        rzp.open();
      };
      script.onerror = () =>
        reject(new Error("Failed to load Razorpay script"));
      document.body.appendChild(script);
    });
  };

  const buyNow = async (productId, quantity = 1, shippingAddress) => {
    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      toast.error("Please log in to proceed with payment!");
      navigate("/user-auth");
      return false;
    }

    try {
      const products = [{ productId, quantity }];
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/create-order`,
        { products, shippingAddress },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      if (response.data.success) {
        const { order, razorpayOrderId, razorpayKeyId } = response.data;
        await initiatePayment(
          order._id,
          razorpayOrderId,
          razorpayKeyId,
          order.totalAmount
        );
        return true;
      } else {
        if (response.data.logout) {
          localStorage.removeItem("auth-token");
          toast.error("Session expired. Please log in again.");
          navigate("/user-auth");
        } else {
          toast.error(response.data.message || "Failed to create order.");
        }
        return false;
      }
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
      if (error.response?.data?.logout) {
        localStorage.removeItem("auth-token");
        toast.error("Session expired. Please log in again.");
        navigate("/user-auth");
      } else {
        toast.error(error.response?.data?.message || "Failed to create order.");
      }
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, []);

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    buyNow,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
