"use client";
import React from "react";
import { StatusCard } from "./StatusCard";

function StatusSeleksi() {
  return (
    <main className="bg-white min-vh-100" style={{ overflowX: "hidden" }}>
      <div className="px-4 py-4">
        <StatusCard />
      </div>
    </main>
  );
}

export default StatusSeleksi;
