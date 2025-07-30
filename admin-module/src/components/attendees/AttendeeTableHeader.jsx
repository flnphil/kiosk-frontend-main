import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { ArrowUpDown } from "lucide-react";

export function AttendeeTableHeader({ sortField, sortDirection, handleSort }) {
  const SortableHeader = ({ field, label }) => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => handleSort(field)}
    >
      {label}
      {sortField === field && (
        <ArrowUpDown
          className={`ml-1 h-4 w-4 ${
            sortDirection === "asc" ? "transform rotate-180" : ""
          }`}
        />
      )}
    </div>
  );

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-8"></TableHead>
        <TableHead>
          <SortableHeader field="name" label="Name" />
        </TableHead>
        {/* <TableHead>Username</TableHead> */}
        <TableHead>
          <SortableHeader field="email" label="Email" />
        </TableHead>
        <TableHead>
          <SortableHeader field="userType" label="User Type" />
        </TableHead>
        <TableHead>
          <SortableHeader field="paymentStatus" label="Payment" />
        </TableHead>
        <TableHead>
          <SortableHeader field="registeredAt" label="Registered On" />
        </TableHead>
        <TableHead>Events Count</TableHead>
      </TableRow>
    </TableHeader>
  );
}
