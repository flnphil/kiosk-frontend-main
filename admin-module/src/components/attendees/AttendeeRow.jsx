import React from "react";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronDown, ChevronRight } from "lucide-react";
// import { AttendeeWithEvents } from '@/utils/attendeeUtils';

// interface AttendeeRowProps {
//   attendee: AttendeeWithEvents;
//   isExpanded: boolean;
//   onToggleExpand: () => void;
// }

export function AttendeeRow({ attendee, isExpanded, onToggleExpand }) {
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={onToggleExpand}
    >
      <TableCell className="p-2 w-8">
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </TableCell>
      <TableCell className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#E5DEFF] text-purple-700">
            {attendee.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{attendee.name}</span>
      </TableCell>
      {/* <TableCell>
        {attendee.userType === "normal" ? `@${attendee.name.toLowerCase().split(' ').join('_')}` : "-"}
      </TableCell> */}
      <TableCell>{attendee.email}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            attendee.userType === "guest"
              ? "bg-purple-50 text-[#333333] border-purple-200 rounded-full px-3 py-1"
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
        {new Date(attendee.registeredAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{attendee.events?.length || 0}</Badge>
      </TableCell>
    </TableRow>
  );
}
