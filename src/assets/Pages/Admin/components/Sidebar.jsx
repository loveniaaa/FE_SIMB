"use client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Fungsi bantu untuk cek menu aktif
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="p-3 pt-4 bg-light">
      <div className="nav flex-column h-100" style={{ width: "240px", minHeight: "100vh" }}>
        <Link to="/admin/dashboard" className="align-self-end">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/6bcabb01bd314d3f2f3d65eecb3aa4a0ba5778f5?placeholderIfAbsent=true"
            alt="User avatar"
            className="rounded-circle mb-4"
            style={{ width: "40px" }}
          />
        </Link>

        <Link
          to="/admin/manajemen-beasiswa"
          className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/admin/manajemen-beasiswa") ? "bg-primary text-white" : "bg-white"}`}
        >
          <i className="bi bi-journal-text"></i>
          <span className="ms-2 text-nowrap">Manajemen Beasiswa</span>
        </Link>

        <Link
          to="/admin/daftar-pendaftar"
          className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/admin/daftar-pendaftar") ? "bg-primary text-white" : "bg-white"}`}
        >
          <i className="bi bi-people"></i>
          <span className="ms-2 text-nowrap">Pendaftar</span>
        </Link>

        <div
          className={`nav-link py-2 px-3 mb-2 rounded-end d-flex justify-content-between align-items-center ${isActive("/admin/pengolahan-pengguna") ? "bg-primary text-white" : "bg-white"}`}
          style={{ cursor: "pointer" }}
          onClick={toggleDropdown}
        >
          <div>
            <i className="bi bi-person-gear"></i>
            <span className="ms-2 text-nowrap">Pengolahan Pengguna</span>
          </div>
          <i className={`bi ${showDropdown ? "bi-caret-down-fill" : "bi-caret-right-fill"}`}></i>
        </div>

        {showDropdown && (
          <div className="ms-4 mb-2">
            <Link
              to="/admin/pengolahan-pengguna/mahasiswa"
              className={`nav-link text-dark fw-light py-1 px-3 ${isActive("/admin/pengolahan-pengguna/mahasiswa") ? "bg-primary text-white rounded" : ""}`}
            >
              <i className="bi bi-person"></i> <span className="ms-1">Mahasiswa</span>
            </Link>
            <Link
              to="/admin/pengolahan-pengguna/bidang-kemahasiswaan"
              className={`nav-link text-dark fw-light py-1 px-3 ${isActive("/admin/pengolahan-pengguna/bidang-kemahasiswaan") ? "bg-primary text-white rounded" : ""}`}
            >
              <i className="bi bi-person-vcard"></i> <span className="ms-1">Kemahasiswaan</span>
            </Link>
          </div>
        )}

        <Link
          to="/admin/pengumuman"
          className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/admin/pengumuman") ? "bg-primary text-white" : "bg-white"}`}
        >
          <i className="bi bi-megaphone"></i>
          <span className="ms-2">Pengumuman</span>
        </Link>

        <Link
          to="/admin/laporan-statistik"
          className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/admin/laporan-statistik") ? "bg-primary text-white" : "bg-white"}`}
        >
          <i className="bi bi-bar-chart"></i>
          <span className="ms-2">Laporan</span>
        </Link>

        <Link
          to="/admin/pengaturan"
          className={`nav-link py-2 px-3 mb-2 rounded-end ${isActive("/admin/pengaturan") ? "bg-primary text-white" : "bg-white"}`}
        >
          <i className="bi bi-gear"></i>
          <span className="ms-2">Pengaturan Sistem</span>
        </Link>

        <Link to="/login" className="btn btn-danger rounded-end py-2 px-4 mt-5">
          <i className="bi bi-box-arrow-right"></i>
          <span className="ms-2">Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
