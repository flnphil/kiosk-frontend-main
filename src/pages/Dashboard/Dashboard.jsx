import React from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/user-card";
import { Button } from "../components/ui/user-button";
import { CalendarDays, Users, Ticket, ChevronRight } from "lucide-react";
import { useEvents } from "../context/EventsContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { events } = useEvents();

  // Calculate metrics
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  ).length;

  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);

  const totalRevenue = events.reduce(
    (sum, event) => sum + event.price * (event.capacity * 0.7),
    0
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your event management dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="h-8 w-8 text-purple-500 mr-2" />
                  <div className="text-2xl font-bold">{upcomingEvents}</div>
                </div>
                <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500 mr-2" />
                  <div className="text-2xl font-bold">
                    {totalCapacity.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                  Attendees
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Projected Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Ticket className="h-8 w-8 text-green-500 mr-2" />
                  <div className="text-2xl font-bold">
                    ${totalRevenue.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-full">
                  Estimated
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Overview of your most recent events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center">
                      <CalendarDays className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} · {event.location}
                      </p>
                    </div>
                  </div>
                  <Link to={`/events/${event.id}`}>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/events">
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/events/create">
            <Button variant="default" className="w-full">
              <CalendarDays className="mr-2 h-4 w-4" />
              Create New Event
            </Button>
          </Link>
          <Link to="/attendees">
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              View Attendees
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
