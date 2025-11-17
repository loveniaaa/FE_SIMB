import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";

const AnnouncementUpdate = () => {
  const { uuid } = useParams(); // ambil UUID dari URL
  const [announcement, setAnnouncement] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  // Ambil data pengumuman dari API berdasarkan UUID
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        const response = await apiClient.get(`/announcement/detail?uuid=${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data?.result || response.data?.output_schema?.result || {};

        // Normalisasi data agar kompatibel dengan input form
        setAnnouncement({
          uuid: data.uuid,
          title: data.title || "",
          category: data.category || "",
          publish_date: data.publish_date || data.publishDate || "",
          display_date: data.display_date || data.displayDate || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };

    fetchAnnouncement();
  }, [uuid]);

  // Fungsi update
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      await apiClient.put("/announcement/update", announcement, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Pengumuman berhasil diperbarui!");
      navigate("/bidang/announcement");
    } catch (error) {
      console.error("Error updating announcement:", error);
      alert("Gagal memperbarui pengumuman.");
    } finally {
      setLoading(false);
    }
  };

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <div className="card-body">
              <h2 className="h4 fw-bold text-primary mb-4 text-center">
                Update Pengumuman
              </h2>

              <form>
                {/* Judul */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Judul Pengumuman
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={announcement.title}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Kategori */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Kategori
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    value={announcement.category}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="GenBI">GenBI</option>
                    <option value="KIP Kuliah">KIP Kuliah</option>
                    <option value="semua">Semua</option>
                  </select>
                </div>

                {/* Tanggal Terbit */}
                <div className="mb-3">
                  <label htmlFor="publish_date" className="form-label">
                    Tanggal Terbit
                  </label>
                  <input
                    type="date"
                    id="publish_date"
                    name="publish_date"
                    className="form-control"
                    min={today}
                    value={announcement.publish_date || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tanggal Berakhir */}
                <div className="mb-3">
                  <label htmlFor="display_date" className="form-label">
                    Tanggal Berakhir
                  </label>
                  <input
                    type="date"
                    id="display_date"
                    name="display_date"
                    className="form-control"
                    min={announcement.publish_date || today}
                    value={announcement.display_date || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Deskripsi */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Deskripsi
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="5"
                    value={announcement.description || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tombol Simpan */}
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementUpdate;
