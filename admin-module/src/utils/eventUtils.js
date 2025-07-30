import { events } from "../data/mockdata";

// Function to check if event is at full capacity
export const isEventFull = (event) => {
  return event.maxAttendees !== undefined && event.attendees.length >= event.maxAttendees;
};

// Function to format time display
export const formatTimeDisplay = (time) => {
  // If there's no time, return empty string
  if (!time) {
    return "";
  }
  
  // If it already contains a dash (range), return as is
  if (time.includes('-')) {
    return time;
  }
  
  // Otherwise, just return the start time without "onwards"
  return time;
};
