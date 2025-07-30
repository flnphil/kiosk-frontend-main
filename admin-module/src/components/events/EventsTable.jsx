import { events } from "../../data/mockdata";
import { useState } from "react";
import { AttendeesList } from "./AttendeesList";
import { EventRow } from "./EventRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";

export function EventsTable({ events }) {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const toggleEventExpansion = async (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null); // collapse
    } else {
      setExpandedEvent(eventId); // expand

      // Lazy load attendees if not already loaded
      if (!eventAttendees[eventId]) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/attendees?event_id=${eventId}`
          );
          if (response.data.success) {
            setEventAttendees((prev) => ({
              ...prev,
              [eventId]: response.data.attendees,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch attendees:", error);
        }
      }
    }
  };
  const [eventAttendees, setEventAttendees] = useState({});

  return (
    <div className="overflow-x-auto rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Attendees</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <>
                <EventRow
                  key={event.id}
                  event={event}
                  isExpanded={expandedEvent === event.id}
                  onToggleExpand={() => toggleEventExpansion(event.id)}
                />

                {expandedEvent === event.id && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={9} className="p-0">
                      <AttendeesList
                        attendees={eventAttendees[event.id] || []}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center py-8 text-muted-foreground"
              >
                No events found matching your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
