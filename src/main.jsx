import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import ShopContextProvider from "./Context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <BrowserRouter>
      {" "}
      <App />  
      <Toaster />
    </BrowserRouter>
  </ShopContextProvider>
);
