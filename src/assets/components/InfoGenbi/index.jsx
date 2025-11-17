import React, { useContext, useEffect, useState } from "react";
import styles from "./infogenbi.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogoGenbi } from "../../img";
import apiClient from "../../../api/apiClient";

const InfoGenbi = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [isRegistered, setIsRegistered] = useState(false);
  const [scholarshipType, setScholarshipType] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchScholarshipStatus = async () => {
      try {
        // cek apakah beasiswa GenBI aktif
        const res = await apiClient.get(`/scholarshipType/detail?uuid=95ed47eb-656a-4d36-9f53-360a2271afa7`);
        const detail = res.data?.output_schema?.result;
        setIsActive(detail?.active ?? false);
      } catch (err) {
        console.error("Gagal memuat status beasiswa:", err);
      }
    };

    const fetchRegistrationDetail = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return;

      const userUuid = storedUser.user?.uuid;

      if (isLoggedIn && userUuid) {
        try {
          const res = await apiClient.get(`/scholarship/detail?userUuid=${userUuid}`);
          const detail = res.data?.output_schema?.result;

          if (detail && Object.keys(detail).length > 0) {
            setIsRegistered(true);
            setScholarshipType(detail.scholarship_type || "");
          }
        } catch (error) {
          console.error("Gagal memuat detail pendaftaran:", error);
        } finally {
          setLoadingStatus(false);
        }
      } else {
        setLoadingStatus(false);
      }
    };

    fetchScholarshipStatus();
    fetchRegistrationDetail();
  }, [isLoggedIn, user]);

  const handleRegisterClick = () => {
    if (!isActive) {
      setAlertMessage("Pendaftaran Beasiswa GenBI saat ini tidak aktif.");
      return;
    }

    if (isLoggedIn) {
      if (!isRegistered) {
        navigate("/beasiswa/genbi/form-pendaftaran");
      } else {
        setShowModal(true);
      }
    } else {
      navigate("/login");
    }
  };

  const closeModal = () => setShowModal(false);
  const closeAlert = () => setAlertMessage(null);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <section className={styles.headerSection}>
            <img src={LogoGenbi} alt="Genbi Logo" className={styles.genbiLogo} />
            <h2 className={styles.mainTitle}>Generasi Baru Indonesia</h2>

            <button
              onClick={handleRegisterClick}
              className={`${styles.registerButton} ${
                !isActive ? styles.disabledButton : ""
              }`}
              disabled={!isActive}
            >
              {isActive ? "Daftar" : "Beasiswa Tidak Aktif"}
            </button>

            {/* Modal Sudah Terdaftar */}
            {showModal && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <p>
                    Anda sudah terdaftar pada Beasiswa{" "}
                    <strong>{scholarshipType}</strong>.
                  </p>
                  <p>Anda tidak dapat mendaftar beasiswa lain.</p>
                  <button onClick={closeModal} className={styles.closeButton}>
                    Tutup
                  </button>
                </div>
              </div>
            )}

            {/* Alert Beasiswa Tidak Aktif */}
            {alertMessage && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <p>{alertMessage}</p>
                  <button onClick={closeAlert} className={styles.closeButton}>
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </section>

            <section className={styles.requirementsSection}>
                <h3 className={styles.requirementsTitle}>
                Syarat Pengajuan Nama Mahasiswa Penerima Beasiswa Baru
                </h3>
                <div className={styles.requirementsList}>
                <p className={styles.requirementItem}>
                    1. Merupakan mahasiswa aktif program S1 yang dibuktikan dengan
                    Kartu Tanda Mahasiswa atau Surat Keterangan Aktif
                </p>
                <p className={styles.requirementItem}>
                    2. Sekurang-kurangnya telah menyelesaiakn 40 (empat puluh)
                    satuan kredit semester (SKS) atau berada di semester 3 (tiga)
                </p>
                <p className={styles.requirementItem}>
                    3. Mahasiswa yang berprestasi di kampus dengan IPK Minimal 3.00
                    (skala 4) untuk PTN dan 3.25 (Skala 4) untuk PTS.
                </p>
                <p className={styles.requirementItem}>
                    4. Maksimal berusia 23 tahun atau belum berusai 24 tahun pada
                    saat ditetapkan sebagai penerima beasiswa.
                </p>
                <p className={styles.requirementItem}>
                    5. Nilai tambah bagi yang mempunyai pengalaman menjalankan
                    aktivitas sosial yang memiliki dampak kebermanfaatan bagi
                    masyarakat.
                </p>
                <p className={styles.requirementItem}>
                    6. Bersedia untuk berperan aktif, mengelola dan mengembangkan
                    Generasi Baru Indonesia (GenBI) serta berpartisipasi dalam
                    kegiatan yang diselenggarakan oleh Bank Indonesia.
                </p>
                <p className={styles.requirementItem}>
                    7. Diutamakan bagi mahasiswa yang berasal dari latar belakang
                    ekonomi keluarga kurang mampu (prasejahtera) yang dibuktikan
                    dengan adanya Surat Keterangan Tidak Mampu (SKTM) dari
                    kelurahan/desa domisili orang tua mahasiswa. Apabila jumlah
                    mahasiswa yang mengajukan SKTM melebihi kuota, maka yang
                    dinyatakan lolos seleksi mengacu pada ranking dari hasil
                    seleksi. Dalam hal tidak terdapat calon penerima beasiswa yang
                    berasal dari kalangan keluarga kurang mampu, maka dibuka
                    kesempatan kepada mahasiswa lainnya sebagai calon penerima
                    beasiswa sepanjang memenuhi persyaratan lainnya yang telah
                    ditentukan.
                </p>
                <p className={styles.requirementItem}>
                    8. Membuat resume pribadi dan motivation letter dalam Bahasa
                    Indonesia.
                </p>
                <p className={styles.requirementItem}>
                    9. Melampirkan Form Biodata A1 dan Form Keterampilan (Form A1
                    dapat diambil di kantor Wakil Rektor III bidang Kemahasiswaan,
                    Lt. 2 GA)
                </p>
                <p className={styles.requirementItem}>
                    10. Membuat Surat Pernyataan Pribadi tidak sedang menerima
                    beasiswa dari Lembaga lain dan/atau berada dalam status ikatan
                    dinas dari Lembaga / instansi lain.
                </p>
                </div>
            </section>
        </main>
      </div>
    </>
  );
};

export default InfoGenbi;
