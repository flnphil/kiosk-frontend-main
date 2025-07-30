import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { ChevronDown, ChevronUp, Pencil, Trash, Users } from "lucide-react";
import { isEventFull, formatTimeDisplay } from "../../utils/eventUtils";
import { useState } from "react";
import { DeleteEventDialog } from "./DeleteEventDialog";

export function EventRow({ event, isExpanded, onToggleExpand }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <TableRow
        className={`cursor-pointer hover:bg-muted/50 ${
          isEventFull(event) ? "bg-purple-100" : ""
        }`}
        onClick={onToggleExpand}
      >
        <TableCell className="font-medium flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
          {event.title}
        </TableCell>
        <TableCell>{event.date}</TableCell>
        <TableCell>{formatTimeDisplay(event.time)}</TableCell>
        <TableCell>{event.location}</TableCell>
        <TableCell>
          {event.isFree ? (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Free
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              Paid
            </Badge>
          )}
        </TableCell>
        <TableCell>
          {event.isFree ? (
            "-"
          ) : (
            <span className="font-medium">
              £{event.price?.toFixed(2) || "0.00"}
            </span>
          )}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            {event.maxAttendees ? (
              <span className="flex items-center">
                {event.attendeesCount}/{event.maxAttendees}
                {isEventFull(event) && (
                  <Badge className="ml-2 bg-red-500">Full</Badge>
                )}
              </span>
            ) : (
              <span>{event.attendeesCount}</span>
            )}
          </div>
        </TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Link to={`/events/edit/${event.id}`}>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      <DeleteEventDialog
        eventId={event.id}
        eventTitle={event.title}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
