import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import InputDesign from "../../components/TextInput";
import styles from "./signup.module.css";
import { Button } from "react-bootstrap";
import { LogoUK, ScholarshipLogo } from "../../img";

const CreatePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama.");
      return;
    }

    if (password.length < 6) {
      return setError("Password harus terdiri dari minimal 6 karakter.");
    }

    try {
      const response = await fetch(`http://localhost:9900/sms-mgmt/auth/create-new-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_password: password,
          confirm_new_password: confirmPassword
        }),
      });      

      if (response.ok) {
        setSuccess("Password berhasil dibuat! Anda akan diarahkan ke login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const res = await response.json();
        setError(res.message || "Terjadi kesalahan saat membuat password.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
        {/* Left Side */}
        <div className={`${styles.kiri} col-md-6`}>
          <div className={`${styles.glassBox} p-0 g-0 min-vh-100 flex-column align-items-center p-4 z-2 position-absolute`}>
            <img src={LogoUK} className={`justify-content-center ms-4 mt-5`} style={{ width: 250, height: "auto" }} />
            <h1 className={`${styles.textScholarship} text-start ms-4 mt-5`}>Scholarship Management System</h1>
          </div>
          <img src={ScholarshipLogo} className={`${styles.bgImage} justify-content-center align-items-center`} />
        </div>

        {/* Right Side */}
        <div className="col-md-6 bg-light d-flex justify-content-center align-items-start row">
          <div className="col-md-12 justify-content-center align-items-center row mt-5 ms-3">
            <h1 className={`${styles.TitleKanan} text-black`}>Buat Kata Sandi Anda</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-2 mt-2">
                <span className="text-black">Kata Sandi</span>
                <InputDesign
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
              <div className="mb-2 mt-2">
                <span className="text-black">Masukan kembali Kata Sandi</span>
                <InputDesign
                  placeholder="Konfirmasi Kata sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
              </div>

              <Button type="submit" className={`${styles.button} mt-4`}>
                Simpan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
