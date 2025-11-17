"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../../../../api/apiClient";

export const StudentDetailsAndParentInformation = () => {
  const { uuid } = useParams();
  const [student, setStudent] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState("IN_PROGRESS");
  const [documentStatus, setDocumentStatus] = useState("Belum Lengkap");
  const [autoRejectedReason, setAutoRejectedReason] = useState("");
  const [autoRejected, setAutoRejected] = useState(false);
  const [canApprove, setCanApprove] = useState(false);

  const fetchStudentDetails = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!token || !uuid) return;

      const response = await apiClient.get(`/scholarship/detail?userUuid=${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const studentData = response.data.output_schema.result;
      setStudent(studentData);

      const docResponse = await apiClient.get(`/document/get?uploadedBy=${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const records = docResponse.data?.output_schema?.records || [];
      const passFoto = records.find(doc => doc.category === "Pass Foto");
      if (passFoto) {
        setPhotoUrl(`http://localhost:9900/sms-mgmt/document/preview?uuid=${passFoto.uuid}`);
      }

      const documentCompletionStatus = studentData.document_completion_status;
      setDocumentStatus(documentCompletionStatus ? "Lengkap" : "Belum Lengkap");

      const scholarUuid = studentData.uuid;
      if (documentCompletionStatus && ["IN_PROGRESS", "INTERVIEW"].includes(studentData.status)) {
        if (studentData.status === "IN_PROGRESS") {
          await apiClient.put(`/scholarship/interview?uuid=${scholarUuid}&isValid=true`, null, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        setApprovalStatus("INTERVIEW");
        setCanApprove(true);
        setAutoRejected(false);
      } else if (!documentCompletionStatus) {
        setApprovalStatus("IN_PROGRESS");
        setCanApprove(false);
        setAutoRejected(true);
        setAutoRejectedReason("Menunggu validasi data atau kelengkapan dokumen.");
      } else {
        setApprovalStatus(studentData.status || "IN_PROGRESS");
        setCanApprove(studentData.status === "INTERVIEW");
        setAutoRejected(false);
      }
    } catch (error) {
      console.error("Error fetching student detail:", error);
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  useEffect(() => {
    if (student?.scholarship_status === "INTERVIEW" && documentStatus === "Lengkap") {
      setCanApprove(true);
    }
  }, [student, approvalStatus, documentStatus]);

  const handleApprovalChange = async () => {
    if (autoRejected || (approvalStatus === "APPROVED" && !canApprove)) {
      alert("Tidak dapat menyetujui karena data/dokumen belum lengkap atau valid.");
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;
      const scholarUuid = student?.uuid;

      await apiClient.put(`/scholarship/approval?uuid=${scholarUuid}&isApproved=${approvalStatus === "APPROVED"}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Status pendaftaran berhasil diperbarui.");
      await fetchStudentDetails();
    } catch (error) {
      console.error("Error changing approval status:", error);
      alert("Gagal mengubah status pendaftaran.");
    }
  };

  if (loading) return <div className="text-center py-5">Loading detail mahasiswa...</div>;
  if (!student) return <div className="text-center py-5 text-danger">Data mahasiswa tidak ditemukan.</div>;

  return (
    <section className="container-fluid">
      <div className="d-flex align-items-center gap-2 mb-5">
        <Link to="/admin/pengolahan-pengguna/mahasiswa" className="text-decoration-none">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/659fa5f3e981f264647a7f21ca78fa1154d428a4?placeholderIfAbsent=true"
            alt="Navigation"
            style={{ width: "25px", height: "25px", objectFit: "contain" }}
          />
        </Link>
        <Link to="/admin/pengolahan-pengguna/mahasiswa">
          <h2 className="h4 mb-0 fw-bold text-black">Daftar Mahasiswa</h2>
        </Link>
        <span>/</span>
        <h2 className="h4 mb-0 text-primary">Data Pendaftar</h2>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="text-center">
            {photoUrl ? (
              <img src={photoUrl} className="rounded-circle mb-4" style={{ width: "150px", height: "150px", objectFit: "cover" }} alt="Student" />
            ) : (
              <div className="rounded-circle bg-secondary mb-4" style={{ width: "150px", height: "150px" }} />
            )}
            <h3 className="h4 fw-bold mb-2">
              {student.master_user?.last_name || "-"}, {student.master_user?.first_name || "-"}
            </h3>
            <p className="text-secondary mb-4">
              {student.nim || "-"} / {student.no_registration || "-"}
            </p>

            <div className="row">
              <div className="col-md-4 text-start">
                <p className="mb-2">Fakultas :</p>
                <p className="mb-2">Jurusan :</p>
                <p className="mb-2">Email :</p>
                <p className="mb-2">No. Telepon :</p>
                <p className="mb-2">IPK :</p>
                <p className="mb-2">Beasiswa :</p>
                <p className="mb-2">Status Dokumen :</p>
              </div>
              <div className="col-md-8 text-start">
                <p className="mb-2 fw-medium">{student.major?.faculty_name || "-"}</p>
                <p className="mb-2 fw-medium">{student.major?.major_name || "-"}</p>
                <p className="mb-2 fw-medium">{student.master_user?.email || "-"}</p>
                <p className="mb-2 fw-medium">{student.master_user?.phone_number || "-"}</p>
                <p className="mb-2 fw-medium">{student.master_user?.gpa || "-"}</p>
                <p className="mb-2 fw-medium">{student.scholarship_type || "-"}</p>
                <p className="fw-medium">{documentStatus}</p>
              </div>
            </div>

            <div className="ms-4 mt-4">
              <select className="form-select mb-3" value={approvalStatus} onChange={(e) => setApprovalStatus(e.target.value)}>
                <option value="">Pilih Status Approval</option>
                <option value="APPROVED" disabled={!canApprove && approvalStatus !== "APPROVED"}>Setujui Pendaftaran</option>
                <option value="REJECTED">Tolak Pendaftaran</option>
              </select>

              <button
                className="btn btn-success fw-semibold px-5"
                onClick={handleApprovalChange}
                disabled={!approvalStatus || (approvalStatus === "APPROVED" && !canApprove) || approvalStatus === "IN_PROGRESS"}
              >
                Simpan Status
              </button>

              <p className="mt-2 text-muted small">
                Status: {approvalStatus}
              </p>
            </div>

            {autoRejectedReason && (
              <div className="alert alert-warning mt-3 text-start">
                <strong>Status:</strong> {approvalStatus.replace("_", " ").toUpperCase()}<br />
                {autoRejectedReason}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <section className="bg-light rounded p-5 mt-5">
            <h2 className="h5 fw-semibold mb-4">Orang Tua</h2>
            <div className="mb-4">
              <h3 className="h6 fw-semibold ms-4 mb-3">Ayah</h3>
              <div className="row ms-4">
                <div className="col-md-4">
                  <p className="mb-2">Nama :</p>
                  <p className="mb-2">Alamat :</p>
                  <p className="mb-2">Pekerjaan :</p>
                  <p className="mb-2">No. Telepon :</p>
                </div>
                <div className="col-md-8">
                  <p className="mb-2 fw-semibold">{student.father_name || "-"}</p>
                  <p className="mb-2 fw-semibold">{student.father_address || "-"}</p>
                  <p className="mb-2 fw-semibold">{student.father_job || "-"}</p>
                  <p className="mb-2 fw-semibold">{student.father_phone || "-"}</p>
                </div>
              </div>
            </div>

            <hr className="border-dark border-dashed my-4" />

            <div className="mb-4">
              <h3 className="h6 fw-semibold ms-4 mb-3">Ibu</h3>
              <div className="row ms-4">
                <div className="col-md-4">
                  <p className="mb-2">Nama :</p>
                  <p className="mb-2">Alamat :</p>
                  <p className="mb-2">Pekerjaan :</p>
                  <p className="mb-2">No. Telepon :</p>
                </div>
                <div className="col-md-8">
                  <p className="mb-2 fw-semibold">{student.mother_name || "-"}</p>
                  <p className="mb-2 fw-semibold">{student.mother_address || "-"}</p>
                  <p className="mb-2 fw-semibold">{student.mother_job || "-"}</p>
                  <p className="mb-2 fw-semibold">{student.mother_phone || "-"}</p>
                </div>
              </div>
            </div>

            <div className="ms-4">
              <Link to={`/admin/pengolahan-pengguna/mahasiswa/data-mahasiswa/validation-and-check/${student.master_user?.uuid}`} className="btn btn-primary fw-semibold mb-3 px-3">
                Validasi Data dan Dokumen
              </Link>
              <br />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
