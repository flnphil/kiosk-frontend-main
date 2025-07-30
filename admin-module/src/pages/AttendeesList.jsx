import React, { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "../components/DashboardLayout";
import { AttendeesHeader } from "../components/attendees/AttendeesHeader";
import { AttendeesStats } from "../components/attendees/AttendeesStats";
import { AttendeesFilters } from "../components/attendees/AttendeesFilters";
import { AttendeesTable } from "../components/attendees/AttendeesTable";
import { AttendeeWithEvents } from "../utils/attendeeUtils"; // Keep if you still have types/utilities

export function AttendeesList() {
  const [allAttendees, setAllAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState(null); // Optional if not in API yet
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // 🔁 Fetch attendees from API
  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/attendees");
        if (response.data.success) {
          const mapped = response.data.attendees.map((a) => ({
            id: a.user_id,
            name: a.name,
            email: a.email,
            userType: a.role,
            registeredAt: a.created_at,
            eventCount: parseInt(a.events_count),
            paymentStatus: "Paid",
            events: a.events || [],
          }));
          setAllAttendees(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch attendees", error);
      }
    };

    fetchAttendees();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => {
    setUserTypeFilter(null);
    setPaymentFilter(null);
    setSortField(null);
    setSortDirection("asc");
    setSearchTerm("");
  };

  // 🔍 Apply filters
  let filteredAttendees = allAttendees.filter(
    (attendee) =>
      (attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (userTypeFilter === null || attendee.userType === userTypeFilter) &&
      (paymentFilter === null || attendee.paymentStatus === paymentFilter)
  );

  // 🔃 Apply sorting
  if (sortField) {
    filteredAttendees = [...filteredAttendees].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (sortField === "registeredAt") {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const hasActiveFilters =
    userTypeFilter || paymentFilter || sortField || searchTerm;

  return (
    <DashboardLayout>
      <AttendeesHeader />
      <AttendeesStats attendees={filteredAttendees} />
      <AttendeesFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        userTypeFilter={userTypeFilter}
        setUserTypeFilter={setUserTypeFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        clearFilters={clearFilters}
        hasActiveFilters={!!hasActiveFilters}
      />
      <AttendeesTable
        attendees={filteredAttendees}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
    </DashboardLayout>
  );
}

export default AttendeesList;
