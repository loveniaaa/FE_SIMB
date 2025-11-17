"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FilterSection } from "./FilterSection";
import "./TableSection.css";
import apiClient from "../../../../api/apiClient";

function TableSection() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    faculty: "semua",
    scholarship: "semua",
    status: "semua"
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        const response = await apiClient.get("/scholarship/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedData = response.data.output_schema.records || [];
        setStudents(fetchedData);
        setFilteredStudents(fetchedData);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = students.filter((student) => {
      const nameMatch = `${student.masterUser?.lastName} ${student.masterUser?.firstName}`.toLowerCase().includes(lowerSearch);
      const facultyMatch = filters.faculty === "semua" || student.major?.facultyName === filters.faculty;
      const scholarshipMatch = filters.scholarship === "semua" || student.scholarshipType === filters.scholarship;
      const statusMatch = filters.status === "semua" || student.status === filters.status;

      return nameMatch && facultyMatch && scholarshipMatch && statusMatch;
    });

    setFilteredStudents(filtered);
  }, [searchTerm, filters, students]);

  const renderStatusLegend = (status) => {
    const statusMap = {
      APPROVED: { color: "blue", label: "Diterima" },
      IN_PROGRESS: { color: "orange", label: "Belum" },
      REJECTED: { color: "red", label: "Ditolak" },
    };
  
    const statusItem = statusMap[status] || { color: "#ccc", label: "Tidak Diketahui" };


    return (
      <div
        className="table-status-icon"
        title={statusItem.label}
        style={{ backgroundColor: statusItem.color }}
      />
    );
  };

  if (loading) {
    return <div className="text-center py-5">Loading daftar mahasiswa...</div>;
  }

  return (
    <section className="mb-0 mt-0">
      <FilterSection filters={filters} setFilters={setFilters} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-5 fw-bold">Daftar Pendaftar</h2>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Cari Nama Mahasiswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-custom">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Nama Lengkap</th>
              <th>NIM</th>
              <th>Fakultas</th>
              <th>Jurusan</th>
              <th>Beasiswa</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.uuid}>
                  <td>{renderStatusLegend(student.status)}</td>
                  <td>{index + 1}</td>
                  <td>
                    {student.masterUser?.lastName || "-"},{" "}
                    {student.masterUser?.firstName || "-"}
                  </td>
                  <td>{student.nim || "-"}</td>
                  <td>{student.major?.facultyName || "-"}</td>
                  <td>{student.major?.majorName || "-"}</td>
                  <td>{student.scholarshipType || "-"}</td>
                  <td>
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Tidak ada mahasiswa ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableSection;
