"use client";
import React from "react";

export const FilterSection = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="row g-3 mb-4">
      {/* Fakultas */}
      <div className="col-md-4">
        <label className="form-label fw-light">Fakultas</label>
        <select
          name="faculty"
          className="form-select"
          value={filters?.faculty ?? "semua"}
          onChange={handleFilterChange}
        >

          <option value="semua">Semua</option>
          <option value="Fakultas Ilmu Komputer">Fakultas Ilmu Komputer</option>
          <option value="Fakultas Teknik">Fakultas Teknik</option>
        </select>
      </div>

      {/* Beasiswa */}
      <div className="col-md-4">
        <label className="form-label fw-light">Beasiswa</label>
        <select
          name="scholarship"
          className="form-select"
          value={filters?.scholarship ?? "semua"}
          onChange={handleFilterChange}
        >

          <option value="semua">Semua</option>
          <option value="GenBI">GenBI</option>
          <option value="Bidik Misi">Bidik Misi</option>
        </select>
      </div>

      {/* Status */}
      <div className="col-md-4">
        <label className="form-label fw-light">Status</label>
        <select
          name="status"
          className="form-select"
          value={filters?.status ?? "semua"}
          onChange={handleFilterChange}
        >

          <option value="semua">Semua</option>
          <option value="Aktif">Aktif (APPROVED)</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </div>
    </div>
  );
};
