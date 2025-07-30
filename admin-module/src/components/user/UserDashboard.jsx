
import React from "react";
import { useUser } from "../../context/usercontext";
import { useEvents } from "../../context/eventscontext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../DashboardLayout";

export function UserDashboard() {
  const { name, wallet, registeredEvents } = useUser();
  const { events } = useEvents();
  
  const userEvents = events.filter(event => 
    registeredEvents.includes(event.id)
  );

  const upcomingEvents = userEvents
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {name}</h1>
          <p className="text-muted-foreground">Manage your events and rewards</p>
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
                  {upcomingEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Link to={`/user/events/${event.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  ))}
                  {upcomingEvents.length > 3 && (
                    <Link to="/user/events" className="text-sm text-purple-600 hover:underline block text-center">
                      View all events
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven't registered for any upcoming events</p>
                  <Link to="/user/discover">
                    <Button variant="outline" className="mt-2">Discover Events</Button>
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
              <CardDescription>Your rewards and available discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-purple-700 mb-1">Available Points</p>
                <p className="text-3xl font-bold text-purple-800">{wallet.points}</p>
              </div>
              
              <h4 className="font-medium mb-2 text-sm">Available Discounts</h4>
              <div className="space-y-2">
                {wallet.discounts.map(discount => (
                  <div key={discount.id} className="border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{discount.name}</p>
                      <p className="text-xs text-muted-foreground">Cost: {discount.pointCost} points</p>
                    </div>
                    <Link to="/user/wallet">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={wallet.points < discount.pointCost}
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
        
        <div className="flex gap-4 justify-center mt-4">
          <Link to="/user/wallet">
            <Button variant="secondary">
              <Wallet className="mr-2 h-4 w-4" />
              View Wallet
            </Button>
          </Link>
          <Link to="/user/settings">
            <Button variant="outline">User Settings</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
