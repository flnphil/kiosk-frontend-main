import React, { useState } from "react";
import { AttendeeWithEvents } from "../../utils/attendeeUtils";
import { Table, TableBody } from "../ui/table";
import { AttendeeTableHeader } from "./AttendeeTableHeader";
import { AttendeeRow } from "./AttendeeRow";
import { AttendeeEventsRow } from "./AttendeeEventsRow";
import { EmptyTableRow } from "./EmptyTableRow";

// interface AttendeesTableProps {
//   attendees: AttendeeWithEvents[];
//   sortField: string | null;
//   sortDirection: 'asc' | 'desc';
//   handleSort: (field: string) => void;
// }

export function AttendeesTable({
  attendees,
  sortField,
  sortDirection,
  handleSort,
}) {
  const [expandedAttendees, setExpandedAttendees] = useState(new Set());

  const toggleAttendeeExpansion = (attendeeId) => {
    const newExpanded = new Set(expandedAttendees);
    if (newExpanded.has(attendeeId)) {
      newExpanded.delete(attendeeId);
    } else {
      newExpanded.add(attendeeId);
    }
    setExpandedAttendees(newExpanded);
  };

  return (
    <div className="overflow-x-auto rounded-md border bg-white">
      <Table>
        <AttendeeTableHeader
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
        <TableBody>
          {attendees?.length === 0 ? (
            <EmptyTableRow />
          ) : (
            attendees.map((attendee) => (
              <React.Fragment key={attendee.id}>
                <AttendeeRow
                  attendee={attendee}
                  isExpanded={expandedAttendees.has(attendee.id)}
                  onToggleExpand={() => toggleAttendeeExpansion(attendee.id)}
                />

                {expandedAttendees.has(attendee.id) && (
                  <AttendeeEventsRow attendee={attendee} />
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
