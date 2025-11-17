import React, { useEffect, useState } from "react";
import { AnnouncementCard } from "./AnnouncementCard";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../../api/apiClient";
import DeleteConfirmationModal from "./Delete";

export const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        const response = await apiClient.get("/announcement/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ambil array data dari response
        const records = Array.isArray(response.data)
          ? response.data
          : response.data?.output_schema?.result || [];

        setAnnouncements(records);
        setFilteredAnnouncements(records);
      } catch (error) {
        console.error("Gagal mengambil pengumuman:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async () => {
    if (!announcementToDelete) return;

    try {
      await apiClient.delete(`/announcement/delete?uuid=${announcementToDelete.uuid}`);
      setAnnouncements((prev) =>
        prev.filter((item) => item.uuid !== announcementToDelete.uuid)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Gagal menghapus pengumuman:", error);
    }
  };

  const handleDetail = (uuid) => {
    navigate(`/bidang/announcement/detail/${uuid}`);
  };

  const handleUpdate = (announcement) => {
    navigate(`/bidang/announcement/update/${announcement.uuid}`, { state: announcement });
  };

  const openDeleteModal = (announcement) => {
    setAnnouncementToDelete(announcement);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setAnnouncementToDelete(null);
  };

  // === Penentuan status otomatis berdasarkan tanggal ===
  const getAnnouncementStatus = (publishDate, displayDate) => {
    if (!publishDate || !displayDate) {
      return { label: "Tanggal Tidak Valid", color: "text-secondary", bg: "bg-secondary-subtle" };
    }

    const now = new Date();
    const start = new Date(`${publishDate}T00:00:00`);
    const end = new Date(`${displayDate}T23:59:59`);

    if (now < start) {
      return { label: "Dijadwalkan", color: "text-warning", bg: "bg-warning-subtle", value: "dijadwalkan" };
    } else if (now >= start && now <= end) {
      return { label: "Sedang Tampil", color: "text-success", bg: "bg-success-subtle", value: "tampil" };
    } else {
      return { label: "Sudah Berakhir", color: "text-danger", bg: "bg-danger-subtle", value: "berakhir" };
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterStatus(value);

    if (value === "Semua") {
      setFilteredAnnouncements(announcements);
      return;
    }

    const filtered = announcements.filter((item) => {
      const status = getAnnouncementStatus(item.publishDate, item.displayDate).value;
      return status === value;
    });

    setFilteredAnnouncements(filtered);
  };

  return (
    <section className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold mb-0">Pengumuman</h2>

        {/* Dropdown filter */}
        <select
          className="form-select w-auto"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="Semua">Semua</option>
          <option value="dijadwalkan">Dijadwalkan</option>
          <option value="tampil">Sedang Tampil</option>
          <option value="berakhir">Sudah Berakhir</option>
        </select>
      </div>

      <Link
        to="/bidang/announcement/add"
        className="btn btn-light rounded-3 d-flex align-items-center gap-3 mb-4"
      >
        <span className="fs-5">Tambahkan Pengumuman</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/f86c0f5ab4188643405595cb3b98aa2a04ca2d6e?placeholderIfAbsent=true"
          alt="Add"
          style={{ width: "24px", height: "24px" }}
        />
      </Link>

      {filteredAnnouncements.length > 0 ? (
        filteredAnnouncements.map((announcement) => {
          const status = getAnnouncementStatus(
            announcement.publishDate,
            announcement.displayDate
          );

          const isExpired = status.label === "Sudah Berakhir";
          
          return (
            <AnnouncementCard
              key={announcement.uuid}
              uuid={announcement.uuid}
              title={announcement.title || "(Tanpa Judul)"}
              category={announcement.category || "-"}
              date={new Date(announcement.publish_date).toLocaleDateString("id-ID")}
              onDetail={() => handleDetail(announcement.uuid)}
              onUpdate={() => handleUpdate(announcement)}
              onDelete={() => openDeleteModal(announcement)}
              status={status} // kirim status ke card
              isExpired={isExpired}
            />
          );
        })
      ) : (
        <p className="text-muted">Belum ada pengumuman yang tersedia.</p>
      )}

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title={announcementToDelete?.title || ""}
      />
    </section>
  );
};
