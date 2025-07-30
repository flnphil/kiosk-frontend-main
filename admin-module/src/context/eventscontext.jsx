import React, { createContext, useContext, useState, useEffect } from "react";

const EventsContext = createContext(undefined);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/events?limit=10000"
      );
      const data = await response.json();
      if (data.success && Array.isArray(data.results)) {
        setEvents(
          data.results.map((event) => ({
            ...event,
            id: event.event_id,
            date: new Date(event.time).toLocaleDateString(),
            time: new Date(event.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            price: parseFloat(event.price),
            isFree: parseFloat(event.price) === 0,
            imageUrl: event.image_url,
            attendeesCount: parseInt(event.registered) || 0,
          }))
        );
      } else {
        setEvents([]);
      }
    } catch (error) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const updateEvent = async (id, updatedEvent) => {
    const formData = new FormData();
    formData.append("title", updatedEvent.title);
    formData.append("description", updatedEvent.description);
    formData.append("location", updatedEvent.location);
    formData.append(
      "time",
      new Date(updatedEvent.date).toISOString().split("T")[0] +
        "T" +
        (updatedEvent.time || "09:00") +
        ":00.000Z"
    );
    formData.append(
      "capacity",
      updatedEvent.maxAttendees || updatedEvent.capacity || "0"
    );
    formData.append("price", updatedEvent.price || "0.00");
    formData.append("category_id", updatedEvent.category_id || "18");
    if (updatedEvent.image) {
      formData.append("image", updatedEvent.image);
    }

    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update event");
    }

    const data = await response.json();

    if (data.success) {
      await fetchEvents(); // Refresh events list after update
    }
    return data;
  };

  // In eventsContext.js
  const deleteEvent = async (id) => {
    try {
      // Make the DELETE API call
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Optionally, you can check for a success message from the response
      const result = await response.json();
      if (result.success) {
        // Only update state if backend delete was successful
        setEvents((currentEvents) =>
          currentEvents.filter((event) => event.id !== id)
        );
      } else {
        throw new Error(result.message || "Delete failed");
      }
    } catch (error) {
      // You can handle or rethrow, or bubble up as you like
      throw error;
    }
  };

  const addEvent = async (eventData) => {
    const formData = new FormData();

    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("location", eventData.location);
    formData.append(
      "time",
      new Date(eventData.date).toISOString().split("T")[0] +
        "T" +
        (eventData.time || "09:00") +
        ":00.000Z"
    );
    formData.append(
      "capacity",
      eventData.maxAttendees || eventData.capacity || "0"
    );
    formData.append("price", eventData.price || "0.00");
    formData.append("category_id", eventData.category_id || "18");

    if (eventData.image) {
      formData.append("image", eventData.image);
    }

    const response = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create event");
    }

    const data = await response.json();

    if (data.success) {
      await fetchEvents(); // ensures you always see new event
    }
    return data;
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        loading,
        deleteEvent,
        addEvent,
        updateEvent,
        fetchEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
