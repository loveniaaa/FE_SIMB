"use client";
import React, { useState } from "react";
import MahasiswaLayout from "../components/MahasiswaLayout";
import { Form, Button, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../../../api/apiClient";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      return setError("Semua field wajib diisi.");
    }

    if (formData.newPassword.length < 6) {
      return setError("Password baru minimal 6 karakter.");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return setError("Konfirmasi password tidak cocok.");
    }

    // Konfirmasi sebelum kirim ke backend
    const confirmChange = window.confirm("Apakah Anda yakin ingin mengganti password?");
    if (!confirmChange) return;

    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;
      const uuid = storedUser?.user?.uuid;

      if (!uuid) {
        setError("Data pengguna tidak ditemukan. Silakan login ulang.");
        return;
      }

      await apiClient.patch(
        `/master-user/change-password?uuid=${uuid}&oldPassword=${formData.oldPassword}&newPassword=${formData.newPassword}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Password berhasil diperbarui!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Gagal mengganti password. Coba lagi.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MahasiswaLayout>
      <div className="container mt-4">
        <h3 className="fw-bold text-primary mb-4 border-bottom pb-2">Change Password</h3>

        <Card className="shadow-lg border-0 rounded-3">
          <Card.Body className="p-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Password Lama</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    placeholder="Masukkan password lama"
                    className="form-control-lg"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="input-group-text"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password Baru</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Masukkan password baru"
                    className="form-control-lg"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="input-group-text"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label>Konfirmasi Password Baru</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password baru"
                    className="form-control-lg"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="input-group-text"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button type="submit" variant="success" size="lg" disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </MahasiswaLayout>
  );
};

export default ChangePassword;
