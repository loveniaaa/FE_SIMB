"use client";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";
import "./announcement-form.css";
import FormInput from "./FormInput";

function AnnouncementFormBike() {

  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    uuid: "",
    title: "",
    description: "",
    category: "",
    publish_date: "",
    display_date: "",
  });

  const [base64File, setBase64File] = useState(""); // File base64

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    if (!storedUser || !token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      return;
    }

    if(!form.title || !form.description || !form.category || !form.publish_date || !form.display_date) {
      alert("Mohon lengkapi semua field yang diperlukan.");
      return;
    }

    const payload = {
      ...form,
      base64: base64File,
    };

    try {
      const response = await apiClient.post("/announcement/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Pengumuman berhasil dibuat!");
      navigate("/bidang/announcement");
      setForm({
        uuid: "",
        title: "",
        description: "",
        category: "",
        publish_date: "",
        display_date: "",
      });
      setBase64File("");
    } catch (error) {
      console.error("Gagal buat pengumuman:", error);
      alert("Gagal membuat pengumuman: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <section className="py-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <Link to="/bidang/announcement" className="d-flex align-items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/659fa5f3e981f264647a7f21ca78fa1154d428a4"
            alt="Icon"
            style={{ width: "25px" }}
          />
          <h1 className="h4 fw-bold mb-0">
            Pengumuman <span className="text-muted">/</span>{" "}
            <span className="text-primary">Pengumuman Baru</span>
          </h1>
        </Link>
      </div>

      <form className="bg-light rounded-3 p-4" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-3 text-center">
            <div
              className="bg-white rounded-3 p-4 d-flex align-items-center justify-content-center hover-upload"
              style={{ height: "150px", width: "150px", cursor: "pointer" }}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/bd35fde20057cda4be331de813726b4ee550668f"
                alt="Upload"
                style={{ width: "70px" }}
              />
            </div>
            <span className="text-muted small mt-2 d-block">Banner / Lampiran</span>
          </div>

          <div className="col-md-9">
            <FormInput
              label="Judul Pengumuman"
              placeholder="Judul"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <FormInput
              label="Isi Pengumuman"
              placeholder="Deskripsi"
              multiline
              height={150}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 🔽 Dropdown kategori */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Kategori Pengumuman</label>
          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="GenBI">GenBI</option>
            <option value="KIP Kuliah">KIP Kuliah</option>
            <option value="semua">Semua</option>
          </select>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <FormInput
              label="Tanggal Terbit"
              type="date"
              name="publish_date"
              min={today}
              value={form.publish_date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              label="Tanggal Berakhir"
              type="date"
              name="display_date"
              min={form.publish_date || today}
              value={form.display_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <h5 className="mt-4 mb-2">Upload Lampiran (Opsional)</h5>
        <FileUpload onFileChange={setBase64File} />

        <button className="btn btn-success px-4 mt-5 shadow-sm" type="submit">
          Simpan
        </button>
      </form>
    </section>
  );
}

export default AnnouncementFormBike;
