import React from "react";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import { Calendar } from "lucide-react";

export function AttendeeEventsRow({ attendee }) {
  return (
    <TableRow className="bg-muted/20">
      <TableCell colSpan={8} className="py-2 px-4">
        <div className="pl-8">
          <p className="text-sm font-medium mb-2">Registered Events:</p>
          <div className="space-y-2">
            {attendee.events && attendee.events?.length > 0 ? (
              attendee.events.map((event, index) => {
                const eventDate = event.time || event.date || ""; // fallback
                const formattedDate = eventDate
                  ? new Date(eventDate).toLocaleDateString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A";

                const isFree = event?.isFree ?? parseFloat(event.price) === 0;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm bg-white p-2 rounded border"
                  >
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {event.title || "Untitled"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({formattedDate})
                    </span>

                    {isFree ? (
                      <Badge
                        variant="outline"
                        className="ml-auto bg-green-50 text-green-700 border-green-200"
                      >
                        Free
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="ml-auto bg-amber-50 text-amber-700 border-amber-200"
                      >
                        £{event.price}
                      </Badge>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">No events found</p>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
