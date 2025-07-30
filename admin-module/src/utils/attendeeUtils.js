
import { Attendee, Event } from "../data/mockdata";

// export interface AttendeeEvent {
//   id: string;
//   title: string;
//   date: string;
//   isFree: boolean;
//   price?: number;
// }

// export interface AttendeeWithEvents extends Attendee {
//   events: AttendeeEvent[];
// }

export const processAttendeeData = (events) => {
  const uniqueAttendees = new Map();
  
  events.forEach(event => {
    event.attendees.forEach(attendee => {
      const key = attendee.email;
      
      if (!uniqueAttendees.has(key)) {
        uniqueAttendees.set(key, {
          ...attendee,
          events: [{
            id: event.id,
            title: event.title,
            date: event.date,
            isFree: event.isFree,
            price: event.price
          }]
        });
      } else {
        const existingAttendee = uniqueAttendees.get(key);
        existingAttendee.events.push({
          id: event.id,
          title: event.title,
          date: event.date,
          isFree: event.isFree,
          price: event.price
        });
        uniqueAttendees.set(key, existingAttendee);
      }
    });
  });
  
  return Array.from(uniqueAttendees.values());
};

export const formatAttendeeEvents = (attendeeId, events) => {
  if (!events || events.length === 0) return [];
  
  return events.filter(event => 
    event.attendees.some(a => a.id === attendeeId)
  );
};
