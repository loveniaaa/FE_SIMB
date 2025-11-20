"use client";
import React from "react";
import { Link } from "react-router-dom";
import './PengaturanSistem.css'; // Add the new CSS for design

const PengaturanSistemContent = () => {
  return (
    <section className="settings-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/admin" className="d-flex align-items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/659fa5f3e981f264647a7f21ca78fa1154d428a4?placeholderIfAbsent=true"
            alt="Icon"
            className="settings-icon"
          />
          <h1 className="h4 fw-bold mb-0">Pengaturan Sistem</h1>
        </Link>
      </div>

      <div className="settings-content bg-light rounded-3 p-4">
        <div className="row mb-4">
          {/* Reset Password Akun Button */}
          <div className="col-md-6">
            <button
              className="btn btn-warning w-100 py-3 shadow-sm mb-3"
              style={{ fontSize: "16px" }}
            >
              Reset Password Akun
            </button>
          </div>

          {/* Backup Button */}
          <div className="col-md-6">
            <button
              className="btn btn-secondary w-100 py-3 shadow-sm mb-3"
              style={{ fontSize: "16px" }}
            >
              Backup
            </button>
          </div>
        </div>

        {/* Log Aktifitas */}
        <h5 className="fw-bold mb-3">Log Aktifitas</h5>
        <div className="log-container bg-white rounded-3 p-3">
          <p className="mb-0 text-muted">Belum ada log aktifitas yang tercatat.</p>
        </div>
      </div>
    </section>
  );
};

export default PengaturanSistemContent;
