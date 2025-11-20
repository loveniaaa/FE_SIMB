import React, { useState } from "react";
import styles from "./signup.module.css";
import { LogoUK, ScholarshipLogo } from "../../img";
import InputDesign from "../../components/TextInput";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nim, setNim] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Nama depan wajib diisi";
    if (!lastName.trim()) newErrors.lastName = "Nama belakang wajib diisi";
    if (!nim.trim()) newErrors.nim = "Username (NIM) wajib diisi";
    if (!phone_number.trim()) newErrors.phone_number = "Nomor telepon wajib diisi";
    if (!email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@student\.unklab\.ac\.id$/.test(email)) {
      newErrors.email = "Email harus menggunakan domain @student.unklab.ac.id";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      username: nim,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone_number,
      email: email,
      role_id: "03",
      status: true,
    };

    try {
      const response = await axios.post("http://localhost:9900/sms-mgmt/auth/sign-up", payload);
      console.log("Success:", response.data);
      navigate("/signup/succes");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup gagal. Cek kembali isian atau hubungi admin.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
        <div className={`${styles.kiri} col-md-6`}>
          <div className={`${styles.glassBox} p-0 g-0 min-vh-100 flex-column align-items-center p-4 z-2 position-absolute`}>
            <img src={LogoUK} className="justify-content-center ms-4 mt-5" style={{ width: 250 }} />
            <h1 className={`${styles.textScholarship} text-start ms-4 mt-5`}>Sistem Informasi Manajemen Beasiswa</h1>
          </div>
          <img src={ScholarshipLogo} className={`${styles.bgImage}`} />
        </div>

        <div className="col-md-6 bg-light d-flex justify-content-center align-items-start row">
          <form onSubmit={handleSubmit} className="col-md-12 d-flex justify-content-center align-items-center row mt-5 ms-3 mb-5">
            <h1 className={`${styles.TitleKanan} text-black`}>Buat akun anda</h1>

            <div className="mb-2 mt-2">
              <span className="text-black">Nama Depan</span>
              <InputDesign
                type="text"
                placeholder="Nama Depan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <div className="text-danger small mt-1">{errors.firstName}</div>}
            </div>

            <div className="mb-2 mt-2">
              <span className="text-black">Nama Belakang</span>
              <InputDesign
                placeholder="Nama Belakang"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <div className="text-danger small mt-1">{errors.lastName}</div>}
            </div>

            <div className="mb-2 mt-2">
              <span className="text-black">Username</span>
              <InputDesign
                placeholder="Username / NIM"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
              {errors.nim && <div className="text-danger small mt-1">{errors.nim}</div>}
            </div>

            <div className="mb-2 mt-2">
              <span className="text-black">Nomor Telepon</span>
              <InputDesign
                placeholder="Nomor Telepon"
                value={phone_number}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                  setPhoneNumber(onlyNums);
                }}
                inputMode="numeric"
              />
              {errors.phone_number && <div className="text-danger small mt-1">{errors.phone_number}</div>}
            </div>

            <div className="mb-2 mt-2">
              <span className="text-black">Email</span>
              <InputDesign
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
            </div>

            <div>
              <Button type="submit" className={`${styles.button} mt-4`}>
                Lanjutkan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
