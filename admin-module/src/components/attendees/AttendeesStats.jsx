import React from "react";

export function AttendeesStats({ attendees }) {
  const guestCount = attendees.filter((a) => a.userType === "guest").length;
  const normalCount = attendees.filter((a) => a.userType === "user").length;

  // Count total events across all attendees
  const allEvents = attendees.flatMap((a) => a.events || []);
  const paidCount = allEvents.filter(
    (event) => parseFloat(event.price) > 0
  ).length;
  const freeCount = allEvents.filter(
    (event) => parseFloat(event.price) === 0
  ).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-1">
          Total Attendees
        </h2>
        <p className="text-2xl font-bold">{attendees?.length}</p>
      </div>
      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-1">
          Guest Users
        </h2>
        <p className="text-2xl font-bold">{guestCount}</p>
      </div>
      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-1">
          Normal Users
        </h2>
        <p className="text-2xl font-bold">{normalCount}</p>
      </div>
      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-1">
          Paid / Free Events
        </h2>
        <p className="text-2xl font-bold">
          {paidCount} / {freeCount}
        </p>
      </div>
    </div>
  );
}
