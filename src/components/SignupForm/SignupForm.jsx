import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as ViewIcon } from "./../../assets/svgs/view-icon.svg";
import { ReactComponent as HideIcon } from "./../../assets/svgs/hide-icon.svg";
import { signupUser } from "../../redux/users/actionCreator";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const SignupForm = () => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error } = useSelector((state) => state.Users);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (success) {
      toast.success("User Logged In Successfully!");
      navigate("/home");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, navigate, error]);

  const validateAndSignup = (event) => {
    event.preventDefault();
    if (
      password &&
      !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
    ) {
      toast.error(
        "Password must be at least 8 characters long, include a number, an uppercase, a lowercase letter and a special letter."
      );
      return;
    }
    if (confirmPassword !== password) {
      toast.error("Passwords do not match.");
      return;
    }
    dispatch(
      signupUser({
        username,
        email,
        password,
      })
    );
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex w-full h-screen font-[Poppins]">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">SignUp</h1>
          <h2 className="text-2xl font-semibold mb-6">Get Started Now</h2>
          <p className="text-gray-600 mb-6">
            Enter your credentials to create your account
          </p>

          <div>
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400"
              />
            </div>

            <div className="mb-4">
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
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <HideIcon className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer" />
                  ) : (
                    <ViewIcon className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <HideIcon className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer" />
                  ) : (
                    <ViewIcon className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer " />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={validateAndSignup}
              className="w-full py-2 px-4 rounded-md text-white bg-blue-400 hover:bg-blue-500 font-semibold"
            >
              Create Account
            </button>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Have a account? </span>
            <a href="/login" className="text-sm text-blue-500 font-semibold">
              Log in
            </a>
          </div>
        </div>
      </div>

      {/* Right Section with curved design */}
      <div className="w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-200 rounded-bl-3xl rounded-tl-3xl"></div>
        <div className="relative z-10 p-12 flex flex-col justify-center h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-10">
              Thank you for choosing to sign up with us!
            </h2>

            <div className="w-full mb-12 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full bg-black rounded-2xl overflow-hidden">
                {/* Video placeholder */}
                <img
                  src="/api/placeholder/800/450"
                  alt="Instructional video"
                  className="w-full rounded-t-2xl"
                />

                {/* Video controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <div className="flex items-center justify-between text-white mb-2">
                    <div className="flex items-center space-x-2">
                      <button className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <span className="text-sm">0:00 / 2:41</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.44"
                          />
                        </svg>
                      </button>
                      <button className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                          />
                        </svg>
                      </button>
                      <button className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-400 rounded-full h-1">
                    <div className="bg-white h-1 rounded-full w-1/12"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-bold mb-4">How it Works:</h3>
              <p className="text-gray-800">
                Once signed up, head to "My account". You should be able to
                access your dashboard and view all events your registered for
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
