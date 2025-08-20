"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data);
      }
      setLoading(false);
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading events...</p>;
  }

  if (events.length === 0) {
    return <p className="p-6 text-gray-500">No events available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🎉 Upcoming Events</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              📅 {event.event_date} | 📍 {event.city}
            </p>

            <Link
              href={`/rsvp/${event.id}`}
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              RSVP →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
