"use client";
import React from "react";
import { Link } from "react-router-dom";

export const StudentCard = ({ faculty, name, id, uuid, scholarshipType, status }) => {
  // Tentukan warna card berdasarkan status
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "border-primary bg-primary-subtle"; // hijau lembut
      case "IN_PROGRESS":
        return "border-warning bg-warning-subtle"; // kuning lembut
      case "REJECTED":
        return "border-danger bg-danger-subtle"; // merah lembut
      default:
        return "border-secondary bg-light"; // netral
    }
  };

  return (
    <article
      className={`rounded-3 p-3 d-flex justify-content-between align-items-center mt-4 mx-2 border ${getStatusStyle(status)}`}
    >
      <div className="d-flex gap-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/0af7f59473cb15434c6049f8168453068c57fd9e"
          alt="Student"
          className="rounded-circle align-self-center"
          style={{ width: "40px" }}
        />
        <div>
          <p className="text-muted small mb-1">{faculty}</p>
          <h3 className="h6 mb-1">{name}</h3>
          <p className="text-muted small mb-0">{id}</p>
        </div>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="text-end">
          <span className="fw-semibold text-dark">{scholarshipType}</span>
          <div className="small text-muted">{status || "-"}</div>
        </div>
        <Link
          to={`/bidang/informasi-pendaftar/data-pendaftar/${uuid}`}
          className="btn btn-light rounded-pill px-3 py-1 d-flex align-items-center gap-3 text-decoration-none"
        >
          <span className="small">Detail</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/ace77583411a4ee7faf19261d9fc3d4b8417296d"
            alt="View details"
            style={{ width: "14px" }}
          />
        </Link>
      </div>
    </article>
  );
};
