
import React from 'react';
import { TableCell, TableRow } from "../ui/table";

export function EmptyTableRow() {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
        No attendees found matching the current filters
      </TableCell>
    </TableRow>
  );
}
