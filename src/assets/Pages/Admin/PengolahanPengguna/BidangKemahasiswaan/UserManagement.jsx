"use client";
import React, { useState, useEffect } from "react";
import apiClient from "../../../../../api/apiClient";
import UserCard from "./UserCard";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    non_student_email: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    non_student_email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [updateEmailError, setUpdateEmailError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState(null);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const response = await apiClient.get("/master-user/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allUsers = response.data.output_schema.records || [];
      const bidangUsers = allUsers.filter((user) => user.role?.roleId === "02");
      setUsers(bidangUsers);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "non_student_email") setEmailError("");
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
    if (name === "non_student_email") setUpdateEmailError("");
  };

  const handleSubmitUser = async () => {
    const email = formData.non_student_email;
    if (!email || !isValidEmail(email)) {
      setEmailError("Email tidak valid. Harap masukkan email yang benar.");
      return;
    }
    setEmailError("");

    try {
      setLoadingSubmit(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const payload = {
        uuid: null,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        non_student_email: email,
        role_id: "02",
        status: true,
      };

      await apiClient.post("/master-user/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User berhasil ditambahkan.");
      setShowModal(false);
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        non_student_email: "",
      });
      fetchUsers();
    } catch (error) {
      console.error("Gagal menambahkan user:", error);
      alert("Gagal menambahkan user.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleSubmitUpdateUser = async (uuid) => {
    const email = updateFormData.non_student_email;
    if (!email || !isValidEmail(email)) {
      setUpdateEmailError("Email tidak valid. Harap masukkan email yang benar.");
      return;
    }
    setUpdateEmailError("");

    try {
      setLoadingSubmit(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const payload = {
        uuid: updateFormData.uuid,
        ...updateFormData,
        role_id: "02",
      };

      await apiClient.put("/master-user/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User berhasil diperbarui.");
      setShowUpdateModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Gagal memperbarui user:", error);
      alert("Gagal memperbarui user.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDeleteUser = async (uuid) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus user ini?");
  
    if (!confirmDelete) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      await apiClient.delete(`/master-user/delete?uuid=${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User berhasil dihapus.");
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus user:", error);
      alert("Gagal menghapus user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.last_name} ${user.first_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <h1 className="h4 fw-bold mb-0">Daftar Bidang Kemahasiswaan</h1>
        <div className="input-group w-auto flex-grow-1">
          <span className="input-group-text bg-light border-0">
            <i className="bi bi-search text-secondary" />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-light"
            placeholder="Cari nama user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-light rounded-3 d-flex align-items-center gap-2 mb-4" onClick={() => setShowModal(true)}>
        <i className="bi bi-person-plus fs-5" />
        <span className="fs-6">Tambahkan User</span>
      </button>

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <UserCard
              key={index}
              user={{
                avatar: user.avatar || "https://ui-avatars.com/api/?name=Unknown",
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
              }}

              onDetail={() => {
                setDetailData(user);
                setShowDetailModal(true);
              }}

              onUpdate={() => {
                setUpdateFormData({
                  uuid: user.uuid,
                  username: user.userName,
                  first_name: user.firstName,
                  last_name: user.lastName,
                  phone_number: user.phoneNumber,
                  non_student_email: user.email,
                });
                setUpdateEmailError("");
                setShowUpdateModal(true);
              }}
              onDelete={() => handleDeleteUser(user.uuid)}
            />
          ))
        ) : (
          <p className="text-muted">Tidak ada user ditemukan.</p>
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah User Bidang Kemahasiswaan</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input name="username" className="form-control mb-2" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                <input name="first_name" className="form-control mb-2" placeholder="Nama Depan" value={formData.first_name} onChange={handleInputChange} />
                <input name="last_name" className="form-control mb-2" placeholder="Nama Belakang" value={formData.last_name} onChange={handleInputChange} />
                <input name="phone_number" className="form-control mb-2" placeholder="Nomor Telepon" value={formData.phone_number} onChange={handleInputChange} />
                <input
                  name="non_student_email"
                  type="email"
                  className={`form-control mb-1 ${emailError ? "is-invalid" : ""}`}
                  placeholder="Email Non-Student"
                  value={formData.non_student_email}
                  onChange={handleInputChange}
                />
                {emailError && <div className="text-danger small mb-2">{emailError}</div>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={handleSubmitUser} disabled={loadingSubmit}>
                  {loadingSubmit ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update User Modal */}
      {showUpdateModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User Bidang Kemahasiswaan</h5>
                <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <input name="username" className="form-control mb-2" placeholder="Username" value={updateFormData.username} onChange={handleUpdateInputChange} />
                <input name="first_name" className="form-control mb-2" placeholder="Nama Depan" value={updateFormData.first_name} onChange={handleUpdateInputChange} />
                <input name="last_name" className="form-control mb-2" placeholder="Nama Belakang" value={updateFormData.last_name} onChange={handleUpdateInputChange} />
                <input name="phone_number" className="form-control mb-2" placeholder="Nomor Telepon" value={updateFormData.phone_number} onChange={handleUpdateInputChange} />
                <input
                  name="non_student_email"
                  type="email"
                  className={`form-control mb-1 ${updateEmailError ? "is-invalid" : ""}`}
                  placeholder="Email Non-Student"
                  value={updateFormData.non_student_email}
                  onChange={handleUpdateInputChange}
                />
                {updateEmailError && <div className="text-danger small mb-2">{updateEmailError}</div>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={handleSubmitUpdateUser} disabled={loadingSubmit}>
                  {loadingSubmit ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail User Modal */}
      {showDetailModal && detailData && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              
              <div className="modal-header">
                <h5 className="modal-title">Detail User</h5>
                <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="text-center mb-3">
                  <img
                    src={detailData.avatar || "https://ui-avatars.com/api/?name=Unknown"}
                    alt="Avatar"
                    className="rounded-circle mb-2"
                    width="90"
                    height="90"
                  />
                  <h5 className="mt-2 fw-bold">{detailData.firstName} {detailData.lastName}</h5>
                </div>

                <p><strong>Username:</strong> {detailData.userName}</p>
                <p><strong>Email:</strong> {detailData.email || "-"}</p>
                <p><strong>Nomor Telepon:</strong> {detailData.phoneNumber || "-"}</p>
                <p><strong>Role:</strong> {detailData.role?.roleName || "Bidang Kemahasiswaan"}</p>
                <p><strong>Status:</strong> {detailData.status ? "Aktif" : "Tidak Aktif"}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
                  Tutup
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserManagement;
