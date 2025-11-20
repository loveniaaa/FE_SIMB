"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="p-3 pt-4 bg-light">
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet" />
      <div className="nav flex-column h-100" style={{ width: "240px", minHeight: "100vh" }}>
        <Link to="/bidang-dashboard" className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/bidang-dashboard") ? "bg-primary text-white" : "bg-white"}`}>
          <i className="bi bi-house-door" />
          <span className="ms-2 text-nowrap">Dashboard</span>
        </Link>

        <Link to="/bidang/informasi-beasiswa" className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/bidang/informasi-beasiswa") ? "bg-primary text-white" : "bg-white"}`}>
          <i className="bi bi-mortarboard"></i>
          <span className="ms-2 text-nowrap">Informasi Beasiswa</span>
        </Link>

        <Link to="/bidang/announcement" className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/bidang/announcement") ? "bg-primary text-white" : "bg-white"}`}>
          <i className="bi bi-megaphone"></i>
          <span className="ms-2 text-nowrap">Pengumuman</span>
        </Link>

        <Link to="/bidang/informasi-pendaftar" className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/bidang/informasi-pendaftar") ? "bg-primary text-white" : "bg-white"}`}>
          <i className="bi bi-people"></i>
          <span className="ms-2 text-nowrap">Informasi Pendaftar</span>
        </Link>

        <Link to="/bidang/change-password" className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/bidang/change-password") ? "bg-primary text-white" : "bg-white"}`}>
          <i className="bi bi-key"></i>
          <span className="ms-2 text-nowrap">Change Password</span>
        </Link>

        <Link to="/login" className="btn btn-danger rounded-end py-2 px-4 mt-5">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
