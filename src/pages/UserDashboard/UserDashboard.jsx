import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/user-card";
import { Button } from "../ui/user-button";
import { Calendar, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../DashboardLayout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export function UserDashboard() {
  const { wallet } = useUser();
  const [userId, setUserId] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}bookings/user/events/${userId}`
        );

        console.log("response: ", response);

        if (response.data.success) {
          const events = response.data.events || [];

          const filtered = events
            .filter((event) => new Date(event.time) > new Date())
            .sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            );

          setUpcomingEvents(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch user events:", error);
      }
    };

    fetchUserEvents();
  }, [userId]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Events Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your events and rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span>My Events</span>
              </CardTitle>
              <CardDescription>Your upcoming registered events</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.event_id}
                      className="border rounded-md p-3 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.time).toLocaleString()}
                        </p>
                      </div>
                      <Link to={`/user/events/${event.event_id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                  {upcomingEvents.length > 3 && (
                    <Link
                      to="/user/events"
                      className="text-sm text-purple-600 hover:underline block text-center"
                    >
                      View all events
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven't registered for any upcoming events</p>
                  <Link to="/home">
                    <Button
                      variant="outline"
                      className="bg-purple-500 hover:bg-purple-600 text-white mt-2"
                    >
                      Discover Events
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-purple-500" />
                <span>Points Wallet</span>
              </CardTitle>
              <CardDescription>
                Your rewards and available discounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 bg-white-50 rounded-lg p-4 text-center">
                <p className="text-sm text-purple-700 mb-1">Available Points</p>
                <p className="text-3xl font-bold text-purple-800">
                  {wallet.points}
                </p>
              </div>

              <h4 className="font-medium mb-2 text-sm">Available Discounts</h4>
              <div className="space-y-2">
                {wallet.discounts.map((discount) => (
                  <div
                    key={discount.id}
                    className="border rounded-md p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{discount.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Cost: {discount.pointCost} points
                      </p>
                    </div>
                    <Link to="/user/wallet">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={wallet.points < discount.pointCost}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        Redeem
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
