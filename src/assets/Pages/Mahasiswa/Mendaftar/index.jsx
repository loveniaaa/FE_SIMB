import React, { useEffect, useState } from "react";
import MahasiswaLayout from "../components/MahasiswaLayout";
import { Link } from "react-router-dom";
import { KIPLogo, LogoGenbi } from "../../../img";
import apiClient from "../../../../api/apiClient";

const Mendaftar = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;
        const userUuid = storedUser?.user?.uuid;

        if (!token || !userUuid) {
          console.error("Token atau UUID user tidak tersedia.");
          return;
        }

        const response = await apiClient.get(`/scholarship/detail?userUuid=${userUuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const scholarshipData = response.data.output_schema?.result || null;
        setStudent(scholarshipData);
      } catch (error) {
        console.error("Gagal fetch data scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Memuat informasi beasiswa...</div>;
  }

  if (student?.scholarship_type) {
    return (
      <MahasiswaLayout>
        <div className="text-center py-5 text-success">
          Kamu sudah terdaftar pada beasiswa <strong>{student.scholarship_type.toUpperCase()}</strong>.<br />
          Kamu tidak dapat mendaftar beasiswa lain.
        </div>
      </MahasiswaLayout>
    );
  }

  return (
    <MahasiswaLayout>
      <section id="values" className="values section">
        <div className="card-container container">
          <div className="row gy-3 justify-content-center">
            <Link to="/beasiswa/kip" className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
              <div className="card">
                <img src={KIPLogo} className="img-fluid" alt="KIP Logo" />
                <h3>Kartu Indonesia Pintar <br />(KIP) Kuliah</h3>
                <p>
                  (KIP) Kuliah adalah program bantuan biaya pendidikan yang disediakan oleh pemerintah Indonesia.
                </p>
              </div>
            </Link>
            <Link to="/beasiswa/genbi" className="col-lg-4" data-aos="fade-up" data-aos-delay={300}>
              <div className="card">
                <img src={LogoGenbi} className="img-fluid" alt="GenBI Logo" />
                <h3>Generasi Baru Indonesia <br /> (GenBI)</h3>
                <p>
                  Beasiswa GenBI adalah program beasiswa yang diselenggarakan oleh Bank Indonesia (BI).
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </MahasiswaLayout>
  );
};

export default Mendaftar;
