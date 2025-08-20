"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RSVPPage() {
  const { id } = useParams(); // Event ID from URL
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch event details from Supabase
  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setMessage("❌ Error fetching event: " + error.message);
      } else {
        setEvent(data);
      }
    }
    fetchEvent();
  }, [id]);

  // Handle RSVP submission
  const handleRSVP = async (response) => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("rsvps").insert([
      {
        event_id: id,
        response: response,
      },
    ]);

    if (error) {
      setMessage("❌ Error saving RSVP: " + error.message);
    } else {
      setMessage("✅ RSVP submitted successfully!");
      setStatus(response);
    }

    setLoading(false);
  };

  if (!event) {
    return <p className="p-4 text-gray-500">Loading event details...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          RSVP for {event.title}
        </h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <p className="text-sm text-gray-500 mb-6">
          📅 {event.event_date} | 📍 {event.city}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => handleRSVP("Yes")}
            disabled={loading}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={() => handleRSVP("No")}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            No
          </button>
          <button
            onClick={() => handleRSVP("Maybe")}
            disabled={loading}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
          >
            Maybe
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        {status && (
          <p className="mt-2 text-center text-green-600 font-semibold">
            Your response: {status}
          </p>
        )}
      </div>
    </div>
  );
}
