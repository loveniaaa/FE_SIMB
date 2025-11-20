"use client";
import React, { useEffect, useState } from "react";
import { StatisticsCard } from "./StatisticsCard";
import { FacultyTable } from "./FacultyTable";
import apiClient from "../../../../api/apiClient";

export const LaporanAnalitikContent = () => {
  const [stats, setStats] = useState(null);
  const [facultyStats, setFacultyStats] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [reasons, setReasons] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      try {
        const res = await apiClient.get("/scholarship/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.output_schema.records || [];

        // Statistik Umum
        const summary = {
          totalApplicants: data.length,
          passed: 0,
          failed: 0,
          genbi: { total: 0, passed: 0, failed: 0 },
          kip: { total: 0, passed: 0, failed: 0 },
        };

        const facultyMap = {};
        const facultyNames = new Set();
        const rejectionReasons = { IPK: 0, Dokumen: 0, Keduanya: 0 };

        data.forEach((s) => {
          const status = s.status;
          const type = s.scholarshipType;
          const faculty = s.major?.facultyName || "Lainnya";

          facultyNames.add(faculty);
          if (!facultyMap[faculty]) facultyMap[faculty] = { genbi: 0, kip: 0 };

          if (type === "GenBI") {
            summary.genbi.total++;
            facultyMap[faculty].genbi++;
          } else if (type === "KIP") {
            summary.kip.total++;
            facultyMap[faculty].kip++;
          }

          if (status === "APPROVED") {
            summary.passed++;
            if (type === "GenBI") summary.genbi.passed++;
            if (type === "KIP") summary.kip.passed++;
          } else {
            summary.failed++;
            if (type === "GenBI") summary.genbi.failed++;
            if (type === "KIP") summary.kip.failed++;

            if (s.reason === "IPK") rejectionReasons.IPK++;
            else if (s.reason === "Dokumen") rejectionReasons.Dokumen++;
            else if (s.reason === "Keduanya") rejectionReasons.Keduanya++;
          }
        });

        setStats(summary);
        setFacultyStats(facultyMap);
        setFaculties([...facultyNames]);
        setReasons(rejectionReasons);
      } catch (err) {
        console.error("Gagal fetch data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="w-full p-1">
      <h1 className="fw-bold fs-4 mb-4">Laporan</h1>

      <div className="row g-4">
        <div className="col-md-4">
          <StatisticsCard
            title="Jumlah Pendaftar"
            mainCount={stats?.totalApplicants || 0}
            genbiCount={stats?.genbi?.total || 0}
            kipCount={stats?.kip?.total || 0}
          />
        </div>
        <div className="col-md-4">
          <StatisticsCard
            title="Lolos"
            mainCount={stats?.passed || 0}
            genbiCount={stats?.genbi?.passed || 0}
            kipCount={stats?.kip?.passed || 0}
          />
        </div>
        <div className="col-md-4">
          <StatisticsCard
            title="Tidak Lolos"
            mainCount={stats?.failed || 0}
            genbiCount={stats?.genbi?.failed || 0}
            kipCount={stats?.kip?.failed || 0}
          />
        </div>
      </div>

      <FacultyTable faculties={faculties} stats={facultyStats} />
    </main>
  );
};

export default LaporanAnalitikContent;
