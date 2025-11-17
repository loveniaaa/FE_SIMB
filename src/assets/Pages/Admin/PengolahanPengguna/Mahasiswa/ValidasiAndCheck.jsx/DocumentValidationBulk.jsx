"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../../../../api/apiClient";

// 📄 Kategori dokumen berdasarkan jenis beasiswa
const documentCategoriesByType = {
  GenBI: [
    "Pass Foto",
    "Form Biodata A1",
    "Form Keterampilan",
    "Surat Keterangan Tidak Mampu",
    "Resume Pribadi",
    "Motivation Letter",
    "Surat Pernyataan Tidak Menerima Beasiswa Lain",
    "Surat Pernyataan Bermetrai",
    "Fotocopy KTP",
    "Fotocopy KTM",
    "Transkrip Nilai",
  ],
  KIP: [
    "Akte",
    "KK",
    "Ijazah SMA",
    "Surat Keterangan Tidak Mampu",
    "Sertifikat Prestasi",
  ],
};

export default function DocumentValidationBulk() {
  const { uploadedBy } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [allComplete, setAllComplete] = useState(false);
  const [verifications, setVerifications] = useState({});
  const [notes, setNotes] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [scholarshipUuid, setScholarshipUuid] = useState(null);
  const [scholarshipType, setScholarshipType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // 🟢 Ambil data beasiswa berdasarkan user
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await apiClient.get(`/scholarship/detail?userUuid=${uploadedBy}`);
        const result = res.data?.output_schema?.result;
        if (result?.uuid) {
          setScholarshipUuid(result.uuid);
          setScholarshipType(result.scholarship_type);
        }
      } catch (error) {
        console.error("Gagal mengambil data beasiswa:", error);
        setErrorMessage("Gagal mengambil data beasiswa");
      }
    };
    fetchScholarship();
  }, [uploadedBy]);

  // 🟢 Ambil dokumen user
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        if (!uploadedBy || !scholarshipType) return;
        const res = await apiClient.get(`/document/get?uploadedBy=${uploadedBy}`);
        const uploaded = res.data?.output_schema?.records || [];

        const list = documentCategoriesByType[scholarshipType] || [];
        const docs = {};
        const verif = {};
        const notesMap = {};

        for (const name of list) {
          const found = uploaded.find((d) => d.category === name);
          docs[name] = found || null;
          verif[name] = found?.isVerified ?? null;
          notesMap[name] = found?.note || "";
        }

        setDocuments(docs);
        setVerifications(verif);
        setNotes(notesMap);
        setAllComplete(list.every((name) => docs[name]));
      } catch (err) {
        console.error("Gagal mengambil dokumen:", err);
        setErrorMessage("Gagal mengambil dokumen");
      } finally {
        setLoading(false);
      }
    };

    if (scholarshipType) fetchDocuments();
  }, [uploadedBy, scholarshipType]);

  // 📝 Ubah verifikasi & note
  const handleVerificationChange = (cat, val) => {
    setVerifications((prev) => ({ ...prev, [cat]: val }));
    setNotes((prev) => ({
      ...prev,
      [cat]: val ? "Dokumen valid" : "Dokumen tidak valid",
    }));
  };

  const handleNoteChange = (cat, val) => {
    setNotes((prev) => ({ ...prev, [cat]: val }));
  };

  // 🟢 Kirim semua hasil verifikasi ke backend
  const handleBulkVerifySubmit = async () => {
    if (!uploadedBy) return alert("User tidak ditemukan");
    if (!Object.keys(documents).length) return alert("Belum ada dokumen untuk diverifikasi");

    const payload = {
      userUuid: uploadedBy,
      documents: Object.entries(documents)
        .filter(([_, doc]) => doc?.uuid)
        .map(([category, doc]) => ({
          uuid: doc.uuid,
          isVerified: verifications[category] ?? false,
          note:
            notes[category]?.trim() ||
            (verifications[category] ? "Dokumen valid" : "Dokumen tidak valid"),
        })),
    };

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      await apiClient.patch("/document/verify-all", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Semua verifikasi berhasil disimpan.");
      setSubmitted(true);
    } catch (error) {
      console.error("Gagal menyimpan verifikasi:", error);
      alert("❌ Gagal menyimpan verifikasi. Silakan coba lagi.");
    }
  };

  // 🟢 Update status kelengkapan
  const handleCompletion = async () => {
    if (!uploadedBy) return alert("UUID pengguna tidak ditemukan");

    // 🔹 hitung validasi dokumen
    const verifiedDocs = Object.entries(verifications)
      .filter(([key]) => documents[key]) // hanya yang punya file
      .map(([_, v]) => v);

    const allVerified = verifiedDocs.length > 0 && verifiedDocs.every((v) => v === true);

    const payloadStatus = allVerified ? "true" : "false";

    try {
      await apiClient.patch(
        `/document/completion-status?uploadedBy=${uploadedBy}&isComplete=${payloadStatus}`
      );

      if (allVerified) {
        alert("✅ Semua dokumen valid. Status kelengkapan diset TRUE.");
      } else {
        alert("⚠️ Masih ada dokumen tidak valid. Status kelengkapan diset FALSE.");
      }

      navigate(`/bidang/informasi-pendaftar/data-pendaftar/${uploadedBy}`);
    } catch (error) {
      console.error("Gagal memperbarui status kelengkapan:", error);
      alert("❌ Terjadi kesalahan saat memperbarui status kelengkapan.");
    }
  };

  // 🟢 Preview dokumen
  const previewDocument = async (uuid) => {
    try {
      const res = await apiClient.get(`/document/preview/${uuid}`, { responseType: "blob" });
      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      window.open(URL.createObjectURL(blob), "_blank");
    } catch {
      alert("Gagal membuka dokumen");
    }
  };

  const docList = documentCategoriesByType[scholarshipType] || [];
  const allVerified = Object.values(verifications).every((v) => v === true);
  const allRejected = Object.values(verifications).every((v) => v === false);

  const statusText = !allComplete
    ? "Belum lengkap — ada dokumen yang belum diunggah"
    : allRejected
    ? "Semua dokumen tidak valid"
    : allVerified
    ? "Semua dokumen valid dan lengkap"
    : "Ada dokumen tidak valid";
  const statusClass = allVerified ? "text-success" : "text-danger";

  return (
    <section className="mt-0">
      {loading ? (
        <div className="text-center py-4">Memuat data...</div>
      ) : errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-4 fw-bold m-0">Cek Dokumen</h2>
            <div className="d-flex gap-2">
              <span>Status :</span>
              <span className={statusClass}>{statusText}</span>
            </div>
          </div>

          <div className="list-group border-0">
            {docList.map((doc, idx) => (
              <div key={idx} className="list-group-item border-0 bg-transparent mb-3">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span className="fw-medium">{doc}</span>
                  <span className="mx-2">:</span>
                  {documents[doc] ? (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => previewDocument(documents[doc].uuid)}
                    >
                      Lihat
                    </button>
                  ) : (
                    <span className="text-muted">Tidak ada File</span>
                  )}
                  <span
                    className={`badge ${
                      verifications[doc] === true
                        ? "bg-success"
                        : verifications[doc] === false
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {verifications[doc] === true
                      ? "Valid"
                      : verifications[doc] === false
                      ? "Tidak Valid"
                      : "Belum Dicek"}
                  </span>
                </div>

                {documents[doc] && (
                  <div className="ps-4">
                    <div className="mb-2">
                      <label className="form-label mb-1">Catatan:</label>
                      <textarea
                        rows="2"
                        className="form-control"
                        value={notes[doc] || ""}
                        onChange={(e) => handleNoteChange(doc, e.target.value)}
                      />
                    </div>
                    <div className="mb-3 d-flex align-items-center gap-3">
                      <input
                        type="checkbox"
                        checked={verifications[doc] === true}
                        onChange={(e) => handleVerificationChange(doc, e.target.checked)}
                      />
                      <label className="form-check-label">Valid</label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 🟢 Tombol Aksi */}
          <div className="d-flex flex-column align-items-start gap-2 mt-4">
            <button
              className="btn btn-primary"
              onClick={handleBulkVerifySubmit}
              disabled={submitted || !Object.keys(documents).length}
            >
              {submitted ? "Sudah Diverifikasi" : "Simpan Semua Verifikasi"}
            </button>

            <button
              className="btn btn-success rounded-pill px-5 mt-3"
              disabled={!allComplete || !scholarshipUuid}
              onClick={handleCompletion}
            >
              {allComplete ? "Selesai" : "Lengkapi Dulu"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
