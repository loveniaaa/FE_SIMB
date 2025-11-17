"use client";
import React from "react";

function Header() {
  return (
    <header className="bg-white shadow-sm py-3 px-5">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center gap-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/c1a3d0bff214f77f88bc88cdf3abef74f27d80d3?placeholderIfAbsent=true"
              className="img-fluid"
              style={{ width: "50px" }}
              alt="System Logo"
            />
            <h1 className="h4 mb-0 fw-bold">Scholarship Management System</h1>
          </div>

          <div className="d-flex align-items-center gap-5">
            <nav className="d-flex gap-4">
              <a
                href="#"
                className="text-decoration-none text-dark fw-bold fs-5"
              >
                Home
              </a>
              <a
                href="#"
                className="text-decoration-none text-dark fw-bold fs-5"
              >
                About
              </a>
              <a
                href="#"
                className="text-decoration-none fw-bold fs-5"
                style={{ color: "rgb(83, 106, 235)" }}
              >
                Dashboard
              </a>
            </nav>

            <div className="d-flex align-items-center gap-3">
              <p className="mb-0 text-end">
                Mendes, <br />
                Camilla Lovenia
              </p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/d91c0fffb9e2144c1246549a39cc7bb7f8ce7f4d?placeholderIfAbsent=true"
                className="rounded-circle"
                style={{ width: "50px" }}
                alt="User profile"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
