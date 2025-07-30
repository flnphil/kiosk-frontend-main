import { DashboardLayout } from "../components/DashboardLayout";
import { events } from "../data/mockdata";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  CalendarDays,
  Clock,
  Edit,
  MapPin,
  TicketX,
  User,
  Users,
  AlignLeft,
  Download,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <TicketX className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate stats
  const guestAttendees = event.attendees.filter(
    (a) => a.userType === "guest"
  ).length;
  const normalAttendees = event.attendees.filter(
    (a) => a.userType === "normal"
  ).length;
  const paidAttendees = event.attendees.filter(
    (a) => a.paymentStatus === "paid"
  ).length;
  const freeAttendees = event.attendees.filter(
    (a) => a.paymentStatus === "free"
  ).length;

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <div className="flex items-center mt-1">
            <Badge className={event.isFree ? "bg-green-500" : "bg-blue-500"}>
              {event.isFree ? "Free Event" : "Paid Event"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/events/${event.id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Event
            </Button>
          </Link>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Attendees
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CalendarDays className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">
                      Registered Attendees
                    </p>
                    <p className="font-medium">{event.attendees.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Attendee Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span>Guest Users:</span>
                  <Badge variant="outline">{guestAttendees}</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Normal Users:</span>
                  <Badge variant="outline">{normalAttendees}</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Paid Tickets:</span>
                  <Badge variant="outline">{paidAttendees}</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Free Tickets:</span>
                  <Badge variant="outline">{freeAttendees}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <AlignLeft className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-semibold">Description</h2>
        </div>
        <p className="text-muted-foreground">{event.description}</p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-semibold">Attendees</h2>
            </div>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="guests">Guests</TabsTrigger>
              <TabsTrigger value="normal">Normal</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <AttendeeTable attendees={event.attendees} />
          </TabsContent>

          <TabsContent value="guests" className="mt-0">
            <AttendeeTable
              attendees={event.attendees.filter((a) => a.userType === "guest")}
            />
          </TabsContent>

          <TabsContent value="normal" className="mt-0">
            <AttendeeTable
              attendees={event.attendees.filter((a) => a.userType === "normal")}
            />
          </TabsContent>

          <TabsContent value="paid" className="mt-0">
            <AttendeeTable
              attendees={event.attendees.filter(
                (a) => a.paymentStatus === "paid"
              )}
            />
          </TabsContent>

          <TabsContent value="free" className="mt-0">
            <AttendeeTable
              attendees={event.attendees.filter(
                (a) => a.paymentStatus === "free"
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function AttendeeTable({ attendees }) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Registered On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No attendees found in this category
              </TableCell>
            </TableRow>
          ) : (
            attendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell className="font-medium">{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      attendee.userType === "guest"
                        ? "bg-purple-50 text-purple-700 border-purple-200 rounded-full px-3 py-1"
                        : "bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1"
                    }
                  >
                    {attendee.userType === "guest" ? "Guest" : "Normal"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      attendee.paymentStatus === "free"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {attendee.paymentStatus === "free" ? "Free" : "Paid"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(attendee.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EventDetail;
