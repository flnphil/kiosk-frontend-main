import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check, Download, Save } from "lucide-react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "../PaymentForm/PaymentForm";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formatDateWithSuffix = (dateStr) => {
  if (!dateStr) return "Event Date";

  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  const getDaySuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${getDaySuffix(day)}, ${year}`;
};

const stripePromise = loadStripe(
  "pk_test_51RQ4aQERz2yhaliJhYzCXvJjBwzqZO3YOliWLD9rtUMuZ55Z7s9GIUkxP6E7AxfjlytZFzHG5EQA4LqyFYJW99ot00lMZOXHR3"
);

const GuestRegistration = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [pdfBlob, setPdfBlob] = useState(null);
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    event_id: "",
    event_name: "",
    date: "",
    seat_left: "",
    location: "",
    price: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const event_id = query.get("event_id");
    const event_name = query.get("event_name");
    const date = query.get("date");
    const seat_left = query.get("seat_left");
    const locationParam = query.get("location");
    const price = query.get("price");
    const user_id = query.get("user_id");

    setEventDetails({
      event_id,
      event_name,
      date,
      seat_left,
      location: locationParam,
      price,
      user_id,
    });

    // Load Poppins font
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, [location.search]);

  // Add Poppins font to the page
  React.useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [userStatus, setUserStatus] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserStatus(true);
        setUserId(decoded.user_id);
        setUserEmail(decoded.email);

        // 👇 Check if user already booked
        const checkBooking = async () => {
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_BACKEND_API_URL}/bookings/user`,
              {
                user_id: decoded.user_id,
                event_id: parseInt(
                  new URLSearchParams(location.search).get("event_id")
                ),
              }
            );

            if (res.data.success) {
              toast.error("User Already Registered for the event!");
              navigate("/home");
            } else {
              const priceValue = parseFloat(
                new URLSearchParams(location.search).get("price")
              );
              if (priceValue === 0) {
                setCurrentStep(3);
                await fetchBookingPdf();
              } else {
                setCurrentStep(2);
              }
            }
          } catch (err) {
            console.error("Booking check error:", err);
          }
        };

        checkBooking();
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const downloadPdf = () => {
    if (!pdfBlob) return;
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventDetails.event_name}_booking.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const fetchBookingPdf = async () => {
    try {
      let response = null;
      if (userStatus && userId) {
        // Authenticated user: just call /api/bookings
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/bookings`,
          {
            user_id: userId,
            event_id: parseInt(eventDetails.event_id),
          },
          { responseType: "blob" }
        );
      } else {
        // Guest user flow
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/guest-booking`,
          {
            event_id: parseInt(eventDetails.event_id),
            name: formData.name,
            email: formData.email,
          },
          { responseType: "blob" }
        );
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      setPdfBlob(blob);
    } catch (error) {
      console.error("Booking API error:", error.message);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div style={{ fontFamily: "Poppins, sans-serif" }}>
        {currentStep === 1 && (
          <div className="min-h-screen bg-blue-50 p-6">
            <div className="max-w-sm mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                {/* Progress indicator */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center">
                      1
                    </div>
                    <div className="w-16 h-1 bg-gray-300"></div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full text-gray-600 flex items-center justify-center">
                      2
                    </div>
                    <div className="w-16 h-1 bg-gray-300"></div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full text-gray-600 flex items-center justify-center">
                      3
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {eventDetails.event_name || "Event Name"}
                </h1>
                <p className="text-gray-600 mb-6">
                  Fill in your details to reserve your spot
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={async () => {
                        const priceValue = parseFloat(eventDetails.price);
                        if (priceValue === 0) {
                          setCurrentStep(3);
                          await fetchBookingPdf();
                        } else {
                          setCurrentStep(2);
                        }
                      }}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-700 text-sm">
                  {eventDetails.seat_left || 20} spots left
                </p>
                <p className="text-gray-700 text-sm">
                  {formatDateWithSuffix(eventDetails.date) || "Event Date"} •{" "}
                  {eventDetails.location || "Location"}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="min-h-screen bg-blue-50 p-6">
            <div className="max-w-sm mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                <div className="flex justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full text-white flex items-center justify-center">
                      ✓
                    </div>
                    <div className="w-16 h-1 bg-green-600"></div>
                    <div className="w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center">
                      2
                    </div>
                    <div className="w-16 h-1 bg-gray-300"></div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full text-gray-600 flex items-center justify-center">
                      3
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Payment Details
                </h1>
                <p className="text-gray-600 mb-6">
                  Complete your booking for £{eventDetails.price}
                </p>

                <PaymentForm
                  amount={parseFloat(eventDetails.price)}
                  onSuccess={() => {
                    setCurrentStep(3);
                    fetchBookingPdf(); // only sets pdfBlob, doesn't auto-download
                  }}
                />

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">Powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="min-h-screen bg-blue-50 p-6">
            <div className="max-w-sm mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                {/* Progress indicator */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full text-white flex items-center justify-center">
                      ✓
                    </div>
                    <div className="w-16 h-1 bg-green-600"></div>
                    <div className="w-8 h-8 bg-green-600 rounded-full text-white flex items-center justify-center">
                      ✓
                    </div>
                    <div className="w-16 h-1 bg-green-600"></div>
                    <div className="w-8 h-8 bg-green-600 rounded-full text-white flex items-center justify-center">
                      ✓
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Booking Confirmed!
                  </h1>
                  <p className="text-gray-600">
                    {userStatus
                      ? "You are successfully booked!"
                      : "Your receipt is ready"}
                  </p>
                </div>

                {/* PDF Preview */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-gray-200">
                  <div className="bg-white rounded shadow-sm p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="font-bold text-gray-800">RECEIPT</h2>
                        <p className="text-sm text-gray-500">
                          Transaction ID: #TIS2024-1234
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-medium text-gray-800 mb-2">
                        {eventDetails.event_name || "Event Name"}{" "}
                      </p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{!userEmail ? formData.name || "John Doe" : ""}</p>
                        <p>
                          {!userEmail
                            ? formData.email || "john@example.com"
                            : userEmail}
                        </p>
                        <p>{formatDateWithSuffix(eventDetails.date)}</p>{" "}
                        <p>{eventDetails.location || "Location"}</p>{" "}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between font-medium">
                        <span>Total Paid</span>
                        <span>£{eventDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    onClick={downloadPdf}
                  >
                    <Download size={20} />
                    <span>Download PDF</span>
                  </button>

                  <button
                    className="w-full bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                    onClick={downloadPdf}
                  >
                    <Save size={20} />
                    <span>Save to Device</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Elements>
  );
};

export default GuestRegistration;
