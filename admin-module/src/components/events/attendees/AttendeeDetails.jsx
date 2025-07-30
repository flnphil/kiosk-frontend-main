
import React from 'react';
import { Attendee, Event } from "../../../data/mockdata";
import { TableCell, TableRow } from "../../ui/table";
import { AttendeeEventsList } from './AttendeeEventsList';

// interface AttendeeDetailsProps {
//   attendee: Attendee;
//   events?: Event[];
// }

export function AttendeeDetails({ attendee, events = [] }) {
  return (
    <TableRow className="bg-muted/20">
      <TableCell colSpan={7} className="py-2 px-4">
        <AttendeeEventsList attendeeId={attendee.id} events={events} />
      </TableCell>
    </TableRow>
  );
}
