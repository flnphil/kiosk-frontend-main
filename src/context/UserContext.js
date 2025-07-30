import React, { createContext, useContext, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const defaultContext = {
  name: "John Doe",
  setName: () => {},
  wallet: {
    points: 0,
    discounts: [],
  },
  addPoints: () => {},
  redeemDiscount: () => false,
  registeredEvents: [],
  registerForEvent: () => {},
  cancelRegistration: () => {},
};

const UserContext = createContext(defaultContext);

export function UserProvider({ children }) {
  const [name, setName] = useState("John Doe");
  const [wallet, setWallet] = useState({
    points: 100, // Starting with some points
    discounts: [
      { id: "disc1", name: "10% Off", percentOff: 10, pointCost: 50 },
      { id: "disc2", name: "25% Off", percentOff: 25, pointCost: 100 },
      { id: "disc3", name: "50% Off", percentOff: 50, pointCost: 200 },
    ],
  });
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const addPoints = (points) => {
    setWallet((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
  };

  const redeemDiscount = (discountId) => {
    const discount = wallet.discounts.find((d) => d.id === discountId);
    if (discount && wallet.points >= discount.pointCost) {
      setWallet((prev) => ({
        ...prev,
        points: prev.points - discount.pointCost,
      }));
      return true;
    }
    return false;
  };

  const registerForEvent = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents((prev) => [...prev, eventId]);
    }
  };

  const cancelRegistration = (eventId) => {
    setRegisteredEvents((prev) => prev.filter((id) => id !== eventId));
  };

  const fetchUserPoints = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const userId = decoded?.user_id;
      if (!userId) throw new Error("User ID not found in token");

      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}/points`
      );
      const data = response.data;

      if (data.success) {
        setWallet((prev) => ({
          ...prev,
          points: data.points || 0,
        }));
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching user points:", error.message);
    }
  }, []);

  const updateUserName = async (newName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // API call to update the name
      await axios.put(
        "http://localhost:5000/api/update-name",
        { name: newName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName(newName);
      return true;
    } catch (error) {
      console.error("Failed to update name:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        wallet,
        addPoints,
        redeemDiscount,
        registeredEvents,
        registerForEvent,
        cancelRegistration,
        fetchUserPoints,
        updateUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
