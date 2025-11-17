import React from "react";
import DocumentUploadHeader from "./DocumentUploadHeader";
import FileUploadField from "./UploadFileFields";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";

const FormPendaftaranDocumentGenBI = () => {
  const [files, setFiles] = React.useState({});
  const [uploading, setUploading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const [fileErrors, setFileErrors] = React.useState({});
  const navigate = useNavigate();

  const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg"];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi file type
    if (!allowedTypes.includes(file.type)) {
      setFileErrors((prev) => ({
        ...prev,
        [name]: "File harus berupa PDF atau gambar (JPEG/JPG)",
      }));
      setFiles((prev) => ({ ...prev, [name]: null }));
      return;
    }

    // Validasi file size
    if (file.size > maxFileSize) {
      setFileErrors((prev) => ({
        ...prev,
        [name]: "Ukuran file maksimal 10MB",
      }));
      setFiles((prev) => ({ ...prev, [name]: null }));
      return;
    }

    // Validasi sukses
    setFileErrors((prev) => ({ ...prev, [name]: null }));
    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const uploadedBy = user?.user?.uuid;

      if (!uploadedBy) {
        alert("Gagal menemukan UUID user. Silakan login ulang.");
        setUploading(false);
        return;
      }

      for (const [category, file] of Object.entries(files)) {
        if (!file) continue;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);
        formData.append("uploadedBy", uploadedBy);

        await apiClient.post("/document/upload", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log(`${category} uploaded`);
      }

      setSuccess(true);
    } catch (err) {
      console.error("Upload gagal", err);
      setError("Terjadi kesalahan saat mengunggah dokumen.");
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "500px" }}>
          <div className="text-success mb-3">
            <i className="bi bi-check-circle-fill" style={{ fontSize: "3rem" }}></i>
          </div>
          <h3 className="fw-bold text-primary">Berhasil</h3>
          <p className="text-muted">
            Dokumen Anda telah berhasil disimpan. Klik tombol di bawah untuk kembali ke dashboard.
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/mahasiswa/dashboard")}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    );
  }

  const renderField = (label, category) => (
    <div className="mb-3">
      <FileUploadField label={label} onChange={(e) => handleFileChange(e, category)} />
      {fileErrors[category] && (
        <div className="text-danger small mt-1">{fileErrors[category]}</div>
      )}
    </div>
  );

  return (
    <main className="bg-white">
      <div className="container-fluid bg-white py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <DocumentUploadHeader />
            <form onSubmit={handleSubmit}>
              {renderField("Surat Keterangan Tidak Mampu *", "Surat Keterangan Tidak Mampu")}
              {renderField("Akte *", "Akte")}
              {renderField("KK *", "KK")}
              {renderField("Ijazah SMA *", "Ijazah SMA")}
              {renderField("Sertifikat Prestasi (Optional)", "Sertifikat Prestasi")}

              <button
                type="submit"
                className="btn btn-success mt-5 px-4 py-2 fw-semibold"
                disabled={uploading}
              >
                {uploading ? "Mengunggah..." : "Submit"}
              </button>
            </form>
            {error && <div className="text-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormPendaftaranDocumentGenBI;
