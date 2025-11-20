"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi dan request update password di sini
    console.log("Changing password...");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-5 rounded-4 shadow-sm" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="text-center mb-4">
          <FaKey size={40} className="mb-2" />
          <h4 className="fw-bold">Change Password</h4>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="position-relative">
            <label className="form-label text-muted">Current Password</label>
            <input
              type={showCurrent ? "text" : "password"}
              className="form-control rounded-pill bg-light border-0 px-4"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted "
              style={{ cursor: "pointer" }}
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="position-relative">
            <label className="form-label text-muted">New Password</label>
            <input
              type={showNew ? "text" : "password"}
              className="form-control rounded-pill bg-light border-0 px-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              style={{ cursor: "pointer" }}
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="position-relative">
            <label className="form-label text-muted">Confirm New Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              className="form-control rounded-pill bg-light border-0 px-4"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-success rounded-pill mt-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
