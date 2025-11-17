"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../../../../api/apiClient";

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

export default function DocumentValidation() {
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
        setErrorMessage("Gagal mengambil dokumen");
      } finally {
        setLoading(false);
      }
    };

    if (scholarshipType) fetchDocuments();
  }, [uploadedBy, scholarshipType]);

  const handleVerificationChange = (cat, val) => {
    setVerifications((prev) => ({ ...prev, [cat]: val }));
  };

  const handleNoteChange = (cat, val) => {
    setNotes((prev) => ({ ...prev, [cat]: val }));
  };

  const handleVerifySubmit = async (cat) => {
    const doc = documents[cat];
    const isVerified = verifications[cat];
    const note = notes[cat] ?? "";
    if (!doc || isVerified === null) return;
    if (!window.confirm(isVerified ? `Validasi dokumen "${cat}"?` : `Tolak dokumen "${cat}"?`)) return;

    try {
      await apiClient.patch(`/document/verify?uuid=${doc.uuid}&isVerified=${isVerified}&note=${encodeURIComponent(note)}`);
      alert(`Dokumen \"${cat}\" berhasil diperbarui.`);
    } catch {
      alert(`Gagal memverifikasi dokumen \"${cat}\".`);
    }
  };

  const handleCompletion = async () => {
    if (!scholarshipUuid) return alert("UUID beasiswa tidak ditemukan");
    const allVerified = Object.values(verifications).every((v) => v === true);
    if (!allVerified) return alert("Belum semua dokumen valid");

    try {
      await apiClient.patch(`/document/completion-status?uploadedBy=${scholarshipUuid}&isComplete=true`);
      alert("Status kelengkapan berhasil diperbarui");
      navigate(`/bidang/informasi-pendaftar/data-pendaftar/${uploadedBy}`);
    } catch {
      alert("Gagal memperbarui status kelengkapan");
    }
  };

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
              <span className={
                allComplete && Object.values(verifications).every((v) => v === true)
                  ? "text-success"
                  : "text-danger"
              }>
                {allComplete && Object.values(verifications).every((v) => v === true)
                  ? "Dokumen Valid dan Lengkap"
                  : "Belum Valid atau Tidak Lengkap"}
              </span>
            </div>
          </div>

          <div className="list-group border-0">
            {docList.map((doc, idx) => (
              <div key={idx} className="list-group-item border-0 bg-transparent mb-3">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span className="fw-medium">{doc}</span>
                  <span className="mx-2">:</span>
                  {documents[doc] ? (
                    <button className="btn btn-sm btn-outline-success" onClick={() => previewDocument(documents[doc].uuid)}>
                      Lihat
                    </button>
                  ) : (
                    <span className="text-muted">Tidak ada File</span>
                  )}
                  <span className={`badge ${
                    verifications[doc] === true ? "bg-success" :
                    verifications[doc] === false ? "bg-danger" : "bg-secondary"
                  }`}>
                    {
                      verifications[doc] === true ? "Valid" :
                      verifications[doc] === false ? "Tidak Valid" : "Belum Dicek"
                    }
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
                      <button className="btn btn-sm btn-primary" onClick={() => handleVerifySubmit(doc)}>
                        Simpan Verifikasi
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="btn btn-success rounded-pill px-5 mt-5"
            disabled={!allComplete || !scholarshipUuid}
            onClick={handleCompletion}
          >
            {allComplete ? "Selesai" : "Lengkapi Dulu"}
          </button>
        </>
      )}
    </section>
  );
}
