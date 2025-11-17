import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../../api/apiClient";

export default function Content() {
  const [userData, setUserData] = useState(null);
  const [scholarshipData, setScholarshipData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;
        const userUuid = storedUser?.user?.uuid;

        if (!token || !userUuid) {
          console.error("Token atau UUID tidak ditemukan");
          return;
        }

        // Fetch user data
        const userResponse = await apiClient.get(
          `/master-user/detail?uuid=${userUuid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(userResponse.data.output_schema.result);

        // Fetch scholarship data
        const scholarshipResponse = await apiClient.get(
          `/scholarship/detail?userUuid=${userUuid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setScholarshipData(scholarshipResponse.data.output_schema.result);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) return <div className="text-center py-5">Memuat data...</div>;

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <div className="card shadow p-4 rounded-3 w-100 h-100 border-0">
        <div className="text-center">
          <div className="d-flex flex-column align-items-center">
            <div
              className="rounded-circle bg-secondary"
              style={{ width: "200px", height: "200px" }}
            />
            <h2 className="h3 fw-bold mt-4">
              {userData.first_name} {userData.last_name}
            </h2>
            <div className="mt-3">
              <p className="text-secondary mb-4">
                {scholarshipData
                  ? `${scholarshipData.nim} / ${scholarshipData.no_registration}`
                  : "-"}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <InfoRow label="Email" value={userData.email} />

            {scholarshipData ? (
              <>
                <InfoRow
                  label="Fakultas"
                  value={scholarshipData.major?.faculty_name || "-"}
                />
                <InfoRow
                  label="Jurusan"
                  value={scholarshipData.major?.major_name || "-"}
                />
                <InfoRow
                  label="Jenis Beasiswa"
                  value={scholarshipData.scholarship_type || "-"}
                />
                <InfoRow
                  label="Status Beasiswa"
                  value={
                    scholarshipData.status === "needs_revision" ? (
                      <span className="badge bg-warning text-dark">
                        Perlu Diperbaiki
                      </span>
                    ) : (
                      scholarshipData.status
                    )
                  }
                />
                {scholarshipData.document_completion_status === false && (
                  <div className="mt-3">
                    <Link
                      to="/mahasiswa/dokumen"
                      className="btn btn-outline-warning"
                    >
                      Perbaiki Dokumen
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-5 text-danger">
                <p>Belum ada data beasiswa</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="d-flex gap-3 justify-content-center mb-2 flex-wrap">
      <h5 className="mb-0">{label}</h5>
      <span>:</span>
      <p className="mb-0 fw-medium">{value}</p>
    </div>
  );
}
