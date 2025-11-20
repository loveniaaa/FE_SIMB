"use client";
import React from "react";

function Header() {
  return (
    <header className="bg-white shadow-sm py-3">
      <div className="container-fluid px-3 d-flex justify-content-between align-items-center">
        <div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/c1a3d0bff214f77f88bc88cdf3abef74f27d80d3?placeholderIfAbsent=true"
            alt="Logo"
            className="img-fluid ms-3"
            style={{ width: "35px" }}
          />
          <span className="ms-3">Sistem Manajemen beasiswa</span>
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <span className="fw-normal small">Bidang Kemahasiswaan</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/d91c0fffb9e2144c1246549a39cc7bb7f8ce7f4d?placeholderIfAbsent=true"
            alt="Admin profile"
            className="rounded-circle"
            style={{ width: "35px" }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
