import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/usercontext";
import { EventsProvider } from "./context/eventscontext";

import { Dashboard } from "./pages/Dashboard";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import EventForm from "./pages/EventForm";
import AttendeesList from "./pages/AttendeesList";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import { UserDashboard } from "./components/user/UserDashboard";
import { UserWallet } from "./components/user/UserWallet";
import { UserSettings } from "./components/user/UserSettings";
import { SessionTimeoutProvider } from "./context/sessiontimeoutcontext";

const App = () => {
  return (
    <UserProvider>
      <EventsProvider>
        <ToastContainer theme="colored" />
        <BrowserRouter>
          <SessionTimeoutProvider timeout={10 * 60 * 1000}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<EventsList />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/events/create" element={<EventForm />} />
              <Route path="/events/edit/:id" element={<EventForm />} />
              <Route path="/attendees" element={<AttendeesList />} />
              <Route path="/settings" element={<Settings />} />

              {/* User Routes */}
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/user/wallet" element={<UserWallet />} />
              <Route path="/user/settings" element={<UserSettings />} />
              <Route path="/user/events/:id" element={<EventDetail />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionTimeoutProvider>
        </BrowserRouter>
      </EventsProvider>
    </UserProvider>
  );
};

export default App;
