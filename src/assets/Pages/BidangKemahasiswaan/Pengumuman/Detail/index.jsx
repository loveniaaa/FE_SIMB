import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";

const AnnouncementDetail = () => {
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

  // === Fungsi untuk format tanggal ===
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

  // === Cek apakah pengumuman sudah berakhir ===
  const isExpired = () => {
    if (!announcement.displayDate && !announcement.display_date) return false;
    const displayDate = new Date(
      announcement.displayDate || announcement.display_date
    );
    const today = new Date();
    return today > displayDate;
  };

  return (
    <div className="bg-light py-5">
      <div className="container col-lg-8 col-md-10">
        <div className="bg-white shadow-sm rounded-4 p-4 position-relative">
          {/* Tombol Edit */}
          <button
            className={`btn btn-sm position-absolute top-0 end-0 m-3 ${
              isExpired() ? "btn-secondary" : "btn-outline-primary"
            }`}
            onClick={() =>
              !isExpired() &&
              navigate(`/bidang/announcement/update/${announcement.uuid}`, {
                state: announcement,
              })
            }
            disabled={isExpired()}
            title={
              isExpired()
                ? "Pengumuman sudah berakhir dan tidak dapat diedit"
                : "Edit pengumuman ini"
            }
          >
            <i className="bi bi-pencil-square me-1"></i>
            {isExpired() ? "Tidak Dapat Diedit" : "Edit"}
          </button>

          {/* Judul Pengumuman */}
          <h1 className="fw-bold text-center text-primary mb-3">
            {announcement.title || "Judul Pengumuman"}
          </h1>

          {/* Metadata */}
          <div className="text-center text-muted mb-4">
            <div>
              <i className="bi bi-calendar3 me-2"></i>
              Diterbitkan: {formatDate(announcement.publishDate || announcement.publish_date)}
            </div>
            {announcement.displayDate || announcement.display_date ? (
              <div>
                <i className="bi bi-clock-history me-2"></i>
                Tampil sampai: {formatDate(announcement.displayDate || announcement.display_date)}
              </div>
            ) : null}
            <div>
              <i className="bi bi-folder2-open me-2"></i>
              {announcement.category || "Umum"}
            </div>
          </div>

          <hr className="my-4" />

          {/* Isi Pengumuman */}
          <article
            className="fs-5 lh-lg text-secondary"
            style={{ whiteSpace: "pre-line", textAlign: "justify" }}
          >
            {announcement.description ||
              "Belum ada deskripsi pengumuman yang tersedia."}
          </article>

          {/* Footer */}
          <div className="mt-5 text-end text-muted small">
            <i className="bi bi-megaphone me-1"></i>
            Sistem Manajemen Beasiswa — Bidang Kemahasiswaan
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
