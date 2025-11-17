"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../../../../api/apiClient";

function RegistrantTable() {
  const [registrants, setRegistrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrants = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        if (!token) {
          console.error("No token found.");
          return;
        }

        const response = await apiClient.get("/scholarship/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedRegistrants = response.data.output_schema.records || [];
        setRegistrants(fetchedRegistrants);

      } catch (error) {
        console.error("Error fetching registrants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrants();
  }, []);

  const formatStatus = (status) => {
    switch (status) {
      case "APPROVED":
        return "Lolos";
      case "REJECTED":
        return "Tidak Lolos";
      case "IN_PROGRESS":
        return "Sedang Diproses";
      default:
        return "-";
    }
  };

  return (
    <section className="bg-light rounded p-4 mt-4">
      <h2 className="h5 mb-4">Tabel Pendaftar</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="bg-white">
              <th className="py-3">Nama</th>
              <th className="py-3">Fakultas</th>
              <th className="py-3">Kelengkapan Dokumen</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-5">Loading data pendaftar...</td>
              </tr>
            ) : registrants.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-5 text-danger">Tidak ada pendaftar ditemukan</td>
              </tr>
            ) : (
              registrants.map((registrant, index) => (
                <tr key={index} className="bg-light">
                  <td className="py-3">
                    {registrant.masterUser?.lastName || ""}, {registrant.masterUser?.firstName || "-"}
                  </td>
                  <td className="py-3">
                    {registrant.major?.facultyName || "-"}
                  </td>
                  <td className={`py-3 ${registrant.documentCompletionStatus ? "text-success" : "text-danger"}`}>
                    {registrant.documentCompletionStatus
                      ? "Dokumen Lengkap dan Valid"
                      : "Dokumen Belum Lengkap dan Valid"}
                  </td>
                  <td className="py-3">
                    {formatStatus(registrant.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RegistrantTable;
