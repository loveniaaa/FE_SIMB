"use client";
import React from "react";

const ActionButton = ({ iconClass, label, onClick, variant = "light" }) => {
  return (
    <button
      className={`btn btn-${variant} rounded-pill d-flex align-items-center gap-2 py-1 px-3`}
      onClick={onClick}
      style={{ fontSize: "14px" }}
    >
      <span>{label}</span>
      <i className={`bi ${iconClass}`} style={{ fontSize: "14px" }}></i>
    </button>
  );
};

export default ActionButton;
