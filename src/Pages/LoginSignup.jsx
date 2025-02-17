import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [state, setState] = useState("Log In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    console.log("Login", { email, password });

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user-login`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("auth-token", response.data.token);
        navigate("/");
        setEmail("");
        setPassword("");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const signup = async () => {
    console.log("Signup", { email, password, name });

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user-signup`, {
        email,
        name,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("auth-token", response.data.token);
        navigate("/");
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[#fbe3fc]">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 md:p-8 rounded-sm shadow-lg">
        <h1 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 ">
          {state}
        </h1>

        <div className="flex flex-col gap-3 md:gap-4">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-3 md:px-4 py-3 border border-gray-400 rounded-sm focus:outline-none"
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-3 md:px-4 py-3 border border-gray-400 rounded-sm focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 md:px-4 py-3 border border-gray-400 rounded-sm focus:outline-none"
          />
        </div>

        <button
          onClick={() => {
            state === "Log In" ? login() : signup();
          }}
          className="w-full mt-4 py-3 bg-[#ff4141] text-white font-semibold rounded-md transition hover:bg-red-500"
        >
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="text-xs md:text-sm text-gray-600 mt-3 text-center">
            Already have an account?{" "}
            <span
              className="text-[#ff4141] cursor-pointer hover:underline"
              onClick={() => setState("Log In")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-xs md:text-sm text-gray-600 mt-3 text-center">
            Create an account{" "}
            <span
              className="text-[#ff4141] cursor-pointer hover:underline"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}

        <div className="flex items-start gap-2 mt-4">
          <input type="checkbox" className="mt-1" />
          <p className="text-xs md:text-sm text-gray-600">
            By continuing, I agree to the{" "}
            <span className="text-[#ff4141] cursor-pointer hover:underline">
              terms of use
            </span>{" "}
            &{" "}
            <span className="text-[#ff4141] cursor-pointer hover:underline">
              privacy policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
