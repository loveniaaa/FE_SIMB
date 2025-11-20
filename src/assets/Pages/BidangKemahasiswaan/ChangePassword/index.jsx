import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import apiClient from "../../../../api/apiClient";
import BidangKemahasiswaanLayout from "../components/BidangKemahasiswaanLayout";

const ChangePasswordBidangKemahasiswaan = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
    <BidangKemahasiswaanLayout>
      <div className="container mt-4">
        <h3 className="fw-bold text-primary mb-4 border-bottom pb-2">
          🔒 Ubah Password
        </h3>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Password Lama</Form.Label>
                <Form.Control
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Masukkan password lama"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password Baru</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Masukkan password baru"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Konfirmasi Password Baru</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password baru"
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </BidangKemahasiswaanLayout>
  );
};

export default ChangePasswordBidangKemahasiswaan;
