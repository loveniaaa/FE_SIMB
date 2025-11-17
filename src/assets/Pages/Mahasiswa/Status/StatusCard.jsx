"use client";
import React, { useEffect, useState } from "react";
import StudentInfo from "./UserInfo";
import apiClient from "../../../../api/apiClient";

export function StatusCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;
        const userUuid = storedUser?.user?.uuid; // <-- ini yang dipakai untuk GET

        if (!token || !userUuid) {
          console.error("Token atau UUID user tidak tersedia.");
          return;
        }

        const response = await apiClient.get(`/scholarship/detail?userUuid=${userUuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const scholarshipData = response.data.output_schema?.result || null;
        setStudent(scholarshipData);
      } catch (error) {
        console.error("Gagal fetch data scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Memuat informasi beasiswa...</div>;
  }

  if (!student) {
    return <div className="text-center py-5 text-danger">Belum ada data pendaftaran beasiswa.</div>;
  }

  const isApproved = student.status === "APPROVED";
  const isRejected = student.status === "REJECTED";

  return (
    <section className="bg-body-tertiary rounded-4 shadow p-4">
      {/* Bagian Status */}
      <div className={`rounded-4 p-4 d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 ${isApproved ? "bg-primary-subtle" : isRejected ? "bg-danger-subtle" : "bg-warning-subtle"}`}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/6ec9716ab75e18b052329cccc141fcbf2f7c7638?placeholderIfAbsent=true"
          alt="Status Icon"
          style={{ width: "80px", height: "80px" }}
          className="mb-3 mb-md-0"
        />
        <div className="text-center">
          <h2 className="h5 fw-bold mb-2">
            {isApproved ? "Selamat! Anda Diterima" : isRejected ? "Maaf, Anda Tidak Lolos" : "Masih dalam Proses Seleksi"}
          </h2>
          <p className="fs-6 text-muted mb-0">
            {isApproved ? "Selamat Anda berhasil menjadi penerima beasiswa!" : isRejected ? "Tetap semangat untuk kesempatan berikutnya." : "Harap cek kembali saat pengumuman."}
          </p>
        </div>
        <div className="d-flex gap-3 mt-3 mt-md-0">
          <img src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/ac90fedeca26d1753ba5b8f81d53288fc5d43f8e?placeholderIfAbsent=true" alt="Icon 1" style={{ width: "50px", height: "50px" }} />
          <img src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/0e34a6da093adf40a7f5888c16bff8935e9ccedb?placeholderIfAbsent=true" alt="Icon 2" style={{ width: "50px", height: "50px" }} />
        </div>
      </div>

      {/* Bagian Informasi Mahasiswa */}
      <StudentInfo student={student} />
    </section>
  );
}