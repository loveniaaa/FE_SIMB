"use client";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="p-3 pt-4 bg-light">
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet" />
      <div className="nav flex-column h-100" style={{ width: "240px", minHeight: "100vh" }}>
        <Link to="/bidang-dashboard" className="align-self-end py-2 px-3 align-items-center justify-content-center">
          <span className="ms-2 text-nowrap">Dashboard</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/6bcabb01bd314d3f2f3d65eecb3aa4a0ba5778f5?placeholderIfAbsent=true"
            alt="User avatar"
            className="rounded-circle mb-4"
            style={{ width: "40px" }}
          />
        </Link>

        <Link to="/bidang/informasi-beasiswa" className="nav-link bg-white rounded-end py-2 px-3 mb-2">
          <i className="bi bi-mortarboard"></i>
          <span className="ms-2 text-nowrap">Informasi Beasiswa</span>
        </Link>

        <Link to="/bidang/announcement" className="nav-link bg-white rounded-end py-2 px-3 mb-2">
          <i className="bi bi-megaphone"></i>
          <span className="ms-2 text-nowrap">Pengumuman</span>
        </Link>

        <Link to="/bidang/informasi-pendaftar" className="nav-link bg-white rounded-end py-2 px-3 mb-2">
          <i className="bi bi-people"></i>
          <span className="ms-2 text-nowrap">Informasi Pendaftar</span>
        </Link>

        <Link to="/bidang/change-password" className="nav-link bg-white rounded-end py-2 px-3 mb-2">
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
