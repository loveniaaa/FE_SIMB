"use client";
import React from "react";

export const StatisticsCard = ({ title, mainCount, genbiCount, kipCount }) => {
  return (
    <div className="card bg-white bg-opacity-75 p-3 shadow">
      <h4 className="fw-bold fs-6 mb-3">{title}</h4>
      <p className="fw-bold fs-4">{mainCount}</p>
      <div className="text-secondary small">
        GenBI: {genbiCount} | KIP: {kipCount}
      </div>
    </div>
  );
};
