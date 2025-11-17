"use client";
import React, { useEffect, useState } from "react";
import { FilterBar } from "./FilterBar";
import { StudentCard } from "./StudentCard";
import axios from "axios";
import apiClient from "../../../../api/apiClient";

export const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    faculty: "semua",
    scholarship: "semua",
    status: "semua",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        if (!token) {
          console.error("No token found, user might not be logged in");
          return;
        }

        const response = await apiClient.get("/scholarship/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedStudents = response.data.output_schema.records || [];
        setStudents(fetchedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const facultyMatch =
      filters.faculty === "semua" ||
      student.major?.facultyName === filters.faculty;

    const scholarshipMatch =
      filters.scholarship === "semua" ||
      student.scholarshipType === filters.scholarship;

    const statusMatch =
      filters.status === "semua" ||
      (filters.status === "Aktif" && student.status === "APPROVED") ||
      (filters.status === "Tidak Aktif" && student.status === "REJECTED") ||
      (filters.status === "In Progess" && student.status === "IN_PROGRESS");

    return facultyMatch && scholarshipMatch && statusMatch;
  });

  return (
    <main className="mt-4">
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="mt-4">
        {loading ? (
          <p className="text-center">Loading daftar pendaftar...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="text-center text-danger">Tidak ada data pendaftar.</p>
        ) : (
          filteredStudents.map((student, index) => (
            <StudentCard
              key={index}
              faculty={`${student.major?.facultyName || "-"} / ${student.major?.majorName || "-"}`}
              name={`${student.masterUser?.lastName || ""}, ${student.masterUser?.firstName || ""}`}
              id={`${student.nim || "-"} / ${student.noRegistration || "-"}`}
              uuid={student.masterUser?.uuid}
              scholarshipType={student.scholarshipType || "-"}
              status={student.status}
            />
          ))
        )}
      </div>
    </main>
  );
};
