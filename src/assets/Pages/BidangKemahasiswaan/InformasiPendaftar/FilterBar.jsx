"use client";
import React from "react";

export const FilterBar = ({ filters, setFilters }) => {
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
          value={filters.faculty}
          onChange={handleFilterChange}
        >
          <option value="semua">Semua</option>
          <option value="Fakultas Filsafat">Fakultas Filsafat</option>
          <option value="Fakultas Keguruan Dan Ilmu Pendidikan">Fakultas Keguruan Dan Ilmu Pendidikan</option>
          <option value="Fakultas Ekonomi Dan Bisnis">Fakultas Ekonomi Dan Bisnis</option>
          <option value="Fakultas Pertanian">Fakultas Pertanian</option>
          <option value="Fakultas Ilmu Komputer">Fakultas Ilmu Komputer</option>
          <option value="Fakultas Keperawatan">Fakultas Keperawatan</option>
          <option value="Fakultas Teknik">Fakultas Teknik</option>
        </select>
      </div>

      {/* Beasiswa */}
      <div className="col-md-4">
        <label className="form-label fw-light">Beasiswa</label>
        <select
          name="scholarship"
          className="form-select"
          value={filters.scholarship}
          onChange={handleFilterChange}
        >
          <option value="semua">Semua</option>
          <option value="GenBI">GenBI</option>
          <option value="Bidik Misi">KIP Kuliah</option>
        </select>
      </div>

      {/* Status */}
      <div className="col-md-4">
        <label className="form-label fw-light">Status</label>
        <select
          name="status"
          className="form-select"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="semua">Semua</option>
          <option value="Aktif">APPROVED</option>
          <option value="Tidak Aktif">REJECTED</option>
          <option value="In Progess">IN PROGRESS</option>
        </select>
      </div>
    </div>
  );
};
