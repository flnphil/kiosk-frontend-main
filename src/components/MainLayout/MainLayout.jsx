import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "./../../components/ui/toaster";
// import { Toaster as Sonner } from "./../../components/ui/sonner";
import { Toaster as Sonner } from "./../../components/ui/sonner";

import { TooltipProvider } from "./../../components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EventsProvider } from "./../../context/EventsContext";
import { UserProvider } from "./../../context/UserContext";

// Pages from File 1
import LoginPage from "./../../pages/LoginPage/LoginPage";
import SignupPage from "./../../pages/SignupPage/SignupPage";
import HomePage from "./../../pages/HomePage/HomePage";
import WelcomeScreen from "./../../pages/WelcomeScreen/WelcomeScreen";
import About from "./../../pages/About/About";
import EventsDetails from "./../../pages/EventsDetails/EventDetails";
import GuestRegistration from "./../../components/GuestRegistration/GuestRegistration";

// Pages from File 2
// import { UserDashboard } from "./components/user/UserDashboard";
import { UserDashboard } from "./../../components/user/UserDashboard";
import { UserWallet } from "./../../components/user/UserWallet";
import { UserSettings } from "./../../components/user/UserSettings";
import NotFound from "./../../pages/NotFound/NotFound"; // Reused for wildcard route
import { SessionTimeoutProvider } from "./../../context/SessionTimeoutContext";

// Placeholder Components
const EventDetail = () => <div>Event Detail</div>;
const DiscoverEvents = () => <div>Discover Events</div>;
const UserEvents = () => <div>My Events</div>;

const queryClient = new QueryClient();

const MainLayout = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <EventsProvider>
          <Toaster />
          <Sonner />
          <ToastContainer theme="colored" />
          <BrowserRouter>
            <SessionTimeoutProvider timeout={10 * 60 * 1000}>
              <Routes>
                {/* Auth & Public Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/events-details" element={<EventsDetails />} />
                <Route
                  path="/guest-registration"
                  element={<GuestRegistration />}
                />

                {/* User Dashboard & Features */}
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/user/discover" element={<DiscoverEvents />} />
                <Route path="/user/events" element={<UserEvents />} />
                <Route path="/user/wallet" element={<UserWallet />} />
                <Route path="/user/settings" element={<UserSettings />} />
                <Route path="/user/events/:id" element={<EventDetail />} />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SessionTimeoutProvider>
          </BrowserRouter>
        </EventsProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default MainLayout;
