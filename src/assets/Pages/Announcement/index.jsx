import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api/apiClient";

const Announcement = () => {
  const { uuid } = useParams();
  const { state } = useLocation();
  const [announcement, setAnnouncement] = useState(state || {});
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      const fetchAnnouncementDetail = async () => {
        try {
          const response = await apiClient.get(`/announcement/detail?uuid=${uuid}`);
          const data = response.data?.output_schema?.result || {};
          setAnnouncement(data);
        } catch (error) {
          console.error("Gagal mengambil detail pengumuman:", error);
        }
      };
      fetchAnnouncementDetail();
    }
  }, [uuid, state]);

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Format tanggal tidak valid"
      : date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  return (
    <div className="bg-light min-vh-100" style={{ marginTop: "90px" }}>
      {/* Hero Section */}
      <div
        className="text-center py-5 mb-4"
        style={{
          background: "linear-gradient(135deg, #004aad, #007bff)",
          color: "white",
        }}
      >
        <h1 className="fw-bold mb-2">
          <i className="bi bi-megaphone-fill me-2"></i>
          {announcement.title || "Pengumuman"}
        </h1>
        <p className="mb-0 text-light opacity-75">
          Diterbitkan pada {formatDate(announcement.publish_date)}
        </p>
      </div>

      {/* Konten Utama */}
      <div className="container col-lg-8 col-md-10">
        {/* Tombol Kembali */}
        <div className="mb-3">
          <button
            className="btn btn-outline-primary d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Kembali ke Beranda
          </button>
        </div>

        {/* Card Konten */}
        <div className="bg-white shadow rounded-4 p-4 p-md-5">
          {/* Metadata */}
          <div className="text-center text-muted mb-4">
            {announcement.display_date && (
              <div>
                <i className="bi bi-clock-history me-2"></i>
                Tampil sampai: {formatDate(announcement.display_date)}
              </div>
            )}
            <div>
              <i className="bi bi-folder2-open me-2"></i>
              {announcement.category || "Umum"}
            </div>
          </div>

          <hr className="mb-4" />

          {/* Isi Pengumuman */}
          <article
            className="fs-5 lh-lg text-secondary"
            style={{ whiteSpace: "pre-line", textAlign: "justify" }}
          >
            {announcement.description ||
              "Belum ada deskripsi pengumuman yang tersedia."}
          </article>

          {/* Footer */}
          <hr className="mt-5" />
          <div className="text-end text-muted small">
            <i className="bi bi-megaphone me-1"></i>
            Sistem Manajemen Beasiswa — Bidang Kemahasiswaan
          </div>

          {/* File Lampiran */}
          {announcement.file && (
            <div className="mt-5">
              <h5 className="fw-bold mb-3">Lampiran Dokumen</h5>

              <embed
                src={`data:application/pdf;base64,${announcement.file}`}
                type="application/pdf"
                width="100%"
                height="600px"
                className="border rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
