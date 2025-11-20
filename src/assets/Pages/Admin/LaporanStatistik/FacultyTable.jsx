"use client";
import React from "react";

export const FacultyTable = ({ faculties = [], stats = {} }) => {
  return (
    <section className="mt-5">
      <h2 className="fw-semibold fs-6 mb-3">Tabel Pendaftar per Fakultas</h2>
      <div className="table-responsive">
        <table className="table">
          <thead className="bg-light">
            <tr>
              <th></th>
              {faculties.map((faculty, index) => (
                <th key={index}>{faculty}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-semibold">GenBI</td>
              {faculties.map((f, i) => (
                <td key={i}>{stats[f]?.genbi || 0}</td>
              ))}
            </tr>
            <tr>
              <td className="fw-semibold">KIP Kuliah</td>
              {faculties.map((f, i) => (
                <td key={i}>{stats[f]?.kip || 0}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
