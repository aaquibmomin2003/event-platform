"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0d1117",
        color: "#e6edf3",
        fontFamily: "Inter, sans-serif",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        🎉 Welcome to Event Platform
      </h1>

      <p style={{ fontSize: "1.1rem", maxWidth: "600px", textAlign: "center", opacity: 0.9 }}>
        Manage your events with ease. Create events, invite users, and RSVP with 
        <strong> Yes / No / Maybe</strong>. Powered by <strong>Next.js</strong> + <strong>Supabase</strong>.
      </p>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link
          href="/events"
          style={{
            padding: "0.75rem 1.25rem",
            background: "#238636",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          View Events
        </Link>

        <Link
          href="/rsvp/demo-id" // replace demo-id with a real event id
          style={{
            padding: "0.75rem 1.25rem",
            background: "#161b22",
            color: "#58a6ff",
            border: "1px solid #30363d",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Try RSVP
        </Link>
      </div>
    </main>
  );
}
