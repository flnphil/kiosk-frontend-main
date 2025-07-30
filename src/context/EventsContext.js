import React, { createContext, useContext, useState } from "react";

const defaultContext = {
  events: [],
  getEvent: () => undefined,
  addEvent: () => "",
  updateEvent: () => false,
  deleteEvent: () => false,
};

const EventsContext = createContext(defaultContext);

const initialEvents = [
  {
    id: "evt1",
    title: "Tech Conference 2025",
    description:
      "Join us for the biggest tech conference of the year featuring the latest innovations and expert speakers.",
    date: "2025-06-15",
    location: "San Francisco Convention Center",
    price: 299,
    capacity: 1000,
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000",
    status: "upcoming",
    organizer: "TechEvents Inc.",
    category: "Technology",
  },
  {
    id: "evt2",
    title: "Music Festival",
    description:
      "Three days of amazing music featuring top artists from around the world.",
    date: "2025-07-10",
    location: "Central Park",
    price: 150,
    capacity: 5000,
    imageUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000",
    status: "upcoming",
    organizer: "Music Events Ltd",
    category: "Music",
  },
  {
    id: "evt3",
    title: "Business Workshop",
    description:
      "Learn essential business skills from industry leaders in this comprehensive workshop.",
    date: "2025-05-25",
    location: "Downtown Business Center",
    price: 99,
    capacity: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
    status: "upcoming",
    organizer: "Business Academy",
    category: "Business",
  },
  {
    id: "evt4",
    title: "Charity Run",
    description:
      "Join our annual charity run to raise funds for children's education.",
    date: "2025-08-05",
    location: "Riverside Park",
    price: 25,
    capacity: 1000,
    imageUrl:
      "https://images.unsplash.com/photo-1533560904424-a0c61c142fbc?q=80&w=1000",
    status: "upcoming",
    organizer: "Charity for Children",
    category: "Charity",
  },
];

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(initialEvents);

  const getEvent = (id) => {
    return events.find((event) => event.id === id);
  };

  const addEvent = (event) => {
    const id = `evt${events.length + 1}`;
    const newEvent = { ...event, id };
    setEvents((prev) => [...prev, newEvent]);
    return id;
  };

  const updateEvent = (id, eventUpdates) => {
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) return false;

    setEvents((prev) => {
      const updated = [...prev];
      updated[eventIndex] = { ...updated[eventIndex], ...eventUpdates };
      return updated;
    });
    return true;
  };

  const deleteEvent = (id) => {
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) return false;

    setEvents((prev) => prev.filter((event) => event.id !== id));
    return true;
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        getEvent,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => useContext(EventsContext);
