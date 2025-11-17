import React, { useEffect, useState } from "react";
import { RegistrationHeader } from "./RegistrationHeader";
import { FormInput } from "./FormInput";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";

function FormPendaftaranKip() {
  const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nim, setNim] = useState("");
    const [noRegistration, setNoRegistration] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [highSchoolName, setHighSchoolName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
  
    const [facultyCode, setFacultyCode] = useState(""); // ganti dari facultyId
    const [majorId, setMajorId] = useState("");
  
    const [faculties, setFaculties] = useState([]);
    const [majors, setMajors] = useState([]);
    const [filteredMajors, setFilteredMajors] = useState([]);
  
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchFacultiesAndMajors = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
  
        if (!token) return;
  
        try {
          const [facultyRes, majorRes] = await Promise.all([
            apiClient.get("/faculty/get", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            apiClient.get("/major/get", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
  
          setFaculties(facultyRes.data.output_schema.records || []);
          setMajors(majorRes.data.output_schema.records || []);
        } catch (error) {
          console.error("Gagal mengambil data fakultas/major:", error);
        }
      };
  
      fetchFacultiesAndMajors();
    }, []);
  
    useEffect(() => {
      if (facultyCode) {
        const filtered = majors.filter((m) => m.facultyCode === facultyCode);
        setFilteredMajors(filtered);
      } else {
        setFilteredMajors([]);
      }
      setMajorId("");
    }, [facultyCode, majors]);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const requestBody = {
        uuid: crypto.randomUUID(),
        nim,
        first_name: firstName,
        last_name: lastName,
        nomor_registrasi: noRegistration,
        scholarship_type: "KIP",
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        high_school_name: highSchoolName,
        father_name: fatherName,
        mother_name: motherName,
        major_id: majorId,
      };
  
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
  
      if (!token) {
        alert("Silakan login terlebih dahulu.");
        return;
      }
  
      try {
        const response = await apiClient.post(
          "/scholarship/create",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        localStorage.setItem("scholarship", JSON.stringify(response.data.output_schema.result));
        setSuccess(true);
        setError("");
      } catch (error) {
        console.error("Gagal mengirim data:", error.response?.data || error.message);
        setError("Gagal mengirim data!");
      }
    };
  
    if (success) {
      return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="card shadow-lg p-4 text-center animate__animated animate__fadeInUp" style={{ maxWidth: "500px" }}>
            <div className="text-success mb-3">
              <i className="bi bi-check-circle-fill" style={{ fontSize: "3rem" }}></i>
            </div>
            <h3 className="fw-bold text-primary">Pendaftaran Berhasil!</h3>
            <p className="text-muted">
              Data pendaftaran Anda telah berhasil disimpan. Klik tombol di bawah untuk melanjutkan ke tahap berikutnya.
            </p>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/beasiswa/kip/form-pendaftaran/document")}>
              Lanjutkan ke Pendaftaran Dokumen
            </button>
          </div>
        </div>
      );
    }
  
    return (
      <main className="bg-white" style={{ fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif" }}>
        <div className="container-fluid bg-white py-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-10">
              <form className="px-4" onSubmit={handleSubmit}>
                <RegistrationHeader />
  
                <FormInput label="NIM" placeholder="type here" value={nim} onChange={(e) => setNim(e.target.value)} />
                <FormInput label="Nomor Regis" placeholder="type here" value={noRegistration} onChange={(e) => setNoRegistration(e.target.value)} />
  
                <FormInput
                  label="Fakultas"
                  placeholder="Select"
                  isSelect
                  value={facultyCode}
                  onChange={(e) => setFacultyCode(e.target.value)}
                  options={faculties}
                  optionLabel="facultyName"
                  optionValue="facultyCode"
                />
  
  
                <FormInput
                  label="Jurusan"
                  placeholder="Select"
                  isSelect
                  value={majorId}
                  onChange={(e) => setMajorId(e.target.value)}
                  options={filteredMajors}
                  optionLabel="majorName"
                  optionValue="uuid"
                />
  
  
                <FormInput label="Alamat" placeholder="Jl, desa, RT / RW" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                <FormInput placeholder="Kecamatan, Kabupaten/Kota, Provinsi" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
  
                <FormInput label="Asal Sekolah" placeholder="Type here" value={highSchoolName} onChange={(e) => setHighSchoolName(e.target.value)} />
                <FormInput label="Nama Ayah" placeholder="Type here" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                <FormInput label="Nama Ibu" placeholder="Type here" value={motherName} onChange={(e) => setMotherName(e.target.value)} />
  
                <button type="submit" className="btn btn-success px-4 py-2 mt-5 fw-semibold">
                  Next
                </button>
              </form>
              {error && <div className="error-message text-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </main>
  );
}

export default FormPendaftaranKip;