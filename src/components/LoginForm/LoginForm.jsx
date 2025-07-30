import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as ViewIcon } from "./../../assets/svgs/view-icon.svg";
import { ReactComponent as HideIcon } from "./../../assets/svgs/hide-icon.svg";
import { loginUser } from "../../redux/users/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const LoginForm = () => {
  // Add Poppins font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  const { error, loggedInUser, loading, success } = useSelector(
    (state) => state.Users
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (success) {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.role === "admin") {
            window.location.href = `http://localhost:3001/events?token=${token}`; // external redirect
            toast.success("Admin Logged In Successfully!");
          } else {
            toast.success("User Logged In Successfully!");
            navigate("/home"); // internal navigation
          }
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
    }
  }, [success, navigate]);

  const handleSignIn = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: username, password }));
  };

  useEffect(() => {
    if (!loading && loggedInUser && Object.keys(loggedInUser).length > 0) {
      toast.success("User Logged In Successfully!");
      navigate("/home");
    }
    if (error) toast.error(error);
  }, [loggedInUser, error, loading, navigate]);

  return (
    <div className="flex w-full h-screen font-[Poppins]">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Log In</h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter your credentials to access your account
          </p>
          <div>
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                  >
                    {showPassword ? (
                      <HideIcon
                        className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer mt-1"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <ViewIcon
                        className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer mt-1"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSignIn}
                type="submit"
                className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 font-semibold"
              >
                Login
              </button>
            </form>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Create new account? </span>
            <a href="/signup" className="text-sm text-blue-500 font-semibold">
              Sign Up
            </a>
          </div>
        </div>
      </div>

      {/* Right Section with curved gradient design */}
      <div className="w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-200 rounded-bl-3xl rounded-tl-3xl"></div>
        <div className="relative z-10 p-12 flex flex-col justify-center h-full">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-16">Welcome back!</h1>

            <div className="bg-white rounded-3xl shadow-lg p-8 w-full mb-16">
              <h2 className="text-2xl font-bold mb-6">Member Benefits</h2>

              <div className="space-y-4 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-blue-500 mt-1">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-lg text-left">
                    Access to exclusive events and content
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 text-blue-500 mt-1">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-lg text-left">
                    Redeem your points for event discounts
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg max-w-md text-left">
              Your journey continues here. Sign in to access your personalised
              dashboard and discover new opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
