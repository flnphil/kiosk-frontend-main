import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const WelcomeScreen = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("adminSignOut");
    if (token) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        background: "linear-gradient(135deg, #cbeeff, #ffffff, #e9dcf9)",
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-gradient-to-r from-[#6941C6] to-[#0EA5E9] text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-md shadow-md">
          K
        </div>
        <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6941C6] to-[#0EA5E9]">
          Kiosk
        </h1>
      </div>
      <h2 className="text-3xl md:text-[60pxs] font-[700] text-black mb-4">
        Welcome to your Event Kiosk
      </h2>
      <p className="text-gray-600 mb-8 font-[400]">
        Discover & register for exciting events happening near you.
      </p>
      <Link to="/home">
        <button className="bg-gradient-to-r from-[#6941C6] to-[#0EA5E9] text-white font-semibold px-8 py-2 rounded-full shadow-md hover:opacity-90 transition h-[40px]">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default WelcomeScreen;
