"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../api/apiClient";

function DashboardContent() {
  const [fullName, setFullName] = useState("");
  const [scholarshipType, setScholarshipType] = useState("-");
  const [registrationDate, setRegistrationDate] = useState("-");
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndScholarship = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return;

      const firstName = storedUser?.user?.first_name || "-";
      const lastName = storedUser?.user?.last_name || "-";
      setFullName(`${lastName}, ${firstName}`);

      const userUuid = storedUser?.user?.uuid;
      const token = storedUser?.token;
      if (!userUuid || !token) return;

      try {
        const response = await apiClient.get(
          `/scholarship/detail?userUuid=${userUuid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const scholarshipRecords = response.data.output_schema.result;

        if (scholarshipRecords) {
          const type = scholarshipRecords.scholarship_type || "-";
          setScholarshipType(type);

          const createdAt = scholarshipRecords.created_at;
          if (createdAt) {
            const dateObj = new Date(createdAt);
            const formattedDate = dateObj.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            setRegistrationDate(formattedDate);
          }

          // Setelah tipe beasiswa diketahui, ambil pengumuman
          fetchAnnouncements(type);
        }
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      }
    };

    const fetchAnnouncements = async (category) => {
      try {
        setLoadingAnnouncements(true);
        const res = await apiClient.get("/announcement/public");
        const allAnnouncements = Array.isArray(res.data.result)
          ? res.data.result
          : res.data.output_schema?.result || [];

        // Filter berdasarkan kategori beasiswa atau umum
        const filtered = allAnnouncements.filter((a) => {
          const cat = a.category?.toLowerCase() || "";
          return cat === category?.toLowerCase() || cat === "semua";
        });

        // Filter tambahan: hanya pengumuman yang masih aktif (berdasarkan tanggal)
        const now = new Date();
        const active = filtered.filter((a) => {
          const start = new Date(a.publish_date);
          const end = new Date(a.display_date);
          return now >= start && now <= end;
        });

        setAnnouncements(active);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoadingAnnouncements(false);
      }
    };

    fetchUserAndScholarship();
  }, []);

  const handleOpenDetail = (uuid) => {
    navigate(`/announcement/${uuid}`); // arahkan ke halaman detail
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <main
        className="col-lg-8 mx-auto px-3 py-5"
        style={{ fontFamily: "'Onest', sans-serif" }}
      >
        {/* === Profil Mahasiswa === */}
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
          <h2 className="fw-bold text-primary mb-2">Hai, Selamat Datang 👋</h2>
          <p className="h5 text-secondary">{fullName}</p>
        </div>

        {/* === Info Beasiswa === */}
        <section className="mb-4">
          <div className="bg-light rounded-4 shadow-sm p-4">
            <h4 className="fw-bold mb-3 text-dark">Informasi Beasiswa</h4>
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 hover-shadow">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Jenis Beasiswa</span>
                <span className="fw-semibold text-dark ms-3">
                  {scholarshipType}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Tanggal Daftar</span>
                <span className="fw-semibold text-dark ms-3">
                  {registrationDate}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* === Pengumuman === */}
        <section>
          <div className="bg-white p-4 rounded-4 shadow-sm">
            <h4 className="fw-bold mb-0 text-dark">📢 Pengumuman</h4>

            {loadingAnnouncements ? (
              <p className="text-muted mt-3">Memuat pengumuman...</p>
            ) : announcements.length > 0 ? (
              <ul className="list-group mt-3">
                {announcements.map((item) => (
                  <li
                    key={item.uuid}
                    className="list-group-item border-0 border-bottom py-3 list-group-item-action"
                    role="button"
                    onClick={() => handleOpenDetail(item.uuid)}
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="fw-semibold text-dark mb-1">
                          {item.title}
                        </h6>
                        <p className="text-muted small mb-1">
                          {new Date(item.publish_date).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="mb-0 text-secondary small">
                          {item.description?.substring(0, 120) ||
                            "Tidak ada deskripsi..."}
                        </p>
                      </div>
                      <span className="text-primary small align-self-center">
                        Lihat Detail →
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted mt-3">
                Belum ada pengumuman aktif untuk kategori {scholarshipType}.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default DashboardContent;
