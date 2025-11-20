"use client";
import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="p-3 pt-5 bg-light">
      <div className="nav flex-column h-100" style={{ width: "240px", minHeight: "100vh" }}>
        <NavLink
          to="/mahasiswa/dashboard"
          className="nav-link rounded-end py-2 px-3 mb-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#007bff' : '#ffffff',
            color: isActive ? 'white' : '', // Menambahkan inline style untuk warna teks
          })}
        >
          <i className="bi bi-house-door" />
          <span className="ms-2 text-nowrap">Dashboard</span>
        </NavLink>

        <NavLink
          to="/mahasiswa/status"
          className="nav-link rounded-end py-2 px-3 mb-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#007bff' : '#ffffff',
            color: isActive ? 'white' : '', // Menambahkan inline style untuk warna teks
          })}
        >
          <i className="bi bi-file-earmark-check" />
          <span className="ms-2 text-nowrap">Status Pendaftaran</span>
        </NavLink>

        <NavLink
          to="/mahasiswa/dokumen"
          className="nav-link rounded-end py-2 px-3 mb-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#007bff' : '#ffffff',
            color: isActive ? 'white' : '', // Menambahkan inline style untuk warna teks
          })}
        >
          <i className="bi bi-folder" />
          <span className="ms-2 text-nowrap">Dokumen</span>
        </NavLink>

        <NavLink
          to="/mahasiswa/mendaftar"
          className="nav-link rounded-end py-2 px-3 mb-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#007bff' : '#ffffff',
            color: isActive ? 'white' : '', // Menambahkan inline style untuk warna teks
          })}
        >
          <i className="bi bi-file-earmark-plus" />
          <span className="ms-2 text-nowrap">Pendaftaran Beasiswa</span>
        </NavLink>

        <NavLink
          to="/mahasiswa/profile"
          className="nav-link rounded-end py-2 px-3 mb-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#007bff' : '#ffffff',
            color: isActive ? 'white' : '', // Menambahkan inline style untuk warna teks
          })}
        >
          <i className="bi bi-person" />
          <span className="ms-2 text-nowrap">Profil</span>
        </NavLink>

        <NavLink
          to="/mahasiswa/change-password"
          className="nav-link rounded-end py-2 px-3 mb-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#007bff' : '#ffffff',
            color: isActive ? 'white' : '', // Menambahkan inline style untuk warna teks
          })}
        >
          <i className="bi bi-lock" />
          <span className="ms-2 text-nowrap">Change Password</span>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `btn btn-danger rounded-end py-2 px-4 mt-5 ${isActive ? 'active-link' : ''}`
          }
        >
          <i className="bi bi-box-arrow-right" />
          <span className="ms-2 text-nowrap">Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;
