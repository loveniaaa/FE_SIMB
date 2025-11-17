"use client";
import React from "react";

function StatusLegend() {
  return (
    <footer className="mt-4 d-flex gap-4 text-muted">
      <div className="d-flex align-items-center gap-1">
        <span className="status-circle bg-primary"></span>
        <span className="fw-light small">Diterima</span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <span className="status-circle bg-warning"></span>
        <span className="fw-light small">Belum</span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <span className="status-circle bg-danger"></span>
        <span className="fw-light small">Ditolak</span>
      </div>
    </footer>
  );
}

export default StatusLegend;
