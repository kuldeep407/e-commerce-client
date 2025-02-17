import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { ShopContext } from "../../Context/ShopContext";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

export default function Navbar() {
  const [menu, setMenu] = useState("shop");
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth-token")
  );

  const checkAuth = () => {
    setIsAuthenticated(!!localStorage.getItem("auth-token"));
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    checkAuth();
    navigate("/user-auth");
  };

  return (
    <>
      <div className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <p className="text-2xl font-semibold text-gray-800">SHOPPER</p>
        </div>

        <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
          {["shop", "mens", "womens", "kids"].map((category) => (
            <div key={category} className="group relative">
              <li
                className="cursor-pointer transition-all duration-200"
                onClick={() => setMenu(category)}
              >
                <NavLink to={`/${category === "shop" ? "" : category}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
              <div className="absolute left-0 top-full h-[2px] w-full bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
            </div>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden md:block border border-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-all"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/user-auth">
              <button className="hidden md:block border border-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-all">
                Login
              </button>
            </NavLink>
          )}

          <NavLink to="/cart" className="relative">
            <img
              src={cart_icon}
              alt="Cart"
              className="w-6 h-6 cursor-pointer"
            />
            <div className="absolute -top-2 -right-3 w-[20px] h-[20px] flex justify-center items-center rounded-full text-sm bg-red-600 text-white">
              {getTotalCartItems()}
            </div>
          </NavLink>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-2/3 bg-white shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden z-40`}
      >
        <div className="flex flex-col h-full py-6 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-10 h-10" />
              <p className="text-xl font-semibold text-gray-800">SHOPPER</p>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <ul className="mt-6 space-y-4 text-lg font-medium text-gray-700">
            {["shop", "mens", "womens", "kids"].map((category) => (
              <li key={category}>
                <NavLink
                  to={`/${category === "shop" ? "" : category}`}
                  className="block w-full py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full border border-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-all"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/user-auth">
                <button className="w-full border border-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-all">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <div className="h-16"></div>
    </>
  );
}
