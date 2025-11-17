import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';

const DetailBeasiswa = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [beasiswa, setBeasiswa] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        const response = await apiClient.get(`/scholarshipType/detail?uuid=${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBeasiswa(response.data.result);
      } catch (error) {
        console.error('Gagal mengambil detail beasiswa:', error);
      }
    };

    fetchDetail();
  }, [uuid]);

  if (!beasiswa) return <p className="text-center mt-4">Memuat data...</p>;

  return (
      <div className="container mt-4">
        <h3>Detail Beasiswa</h3>
        <hr />
        <p><strong>Nama:</strong> {beasiswa.scholarshipName}</p>
        <p><strong>Deskripsi:</strong> {beasiswa.description}</p>
        <p><strong>Kuota:</strong> {beasiswa.applicantQuota}</p>
        <p><strong>IPK Minimum:</strong> {beasiswa.minimumGpa}</p>
        <p><strong>Semester Minimum:</strong> {beasiswa.minimumSemester}</p>
        <p><strong>Status:</strong> {beasiswa.active ? 'Aktif' : 'Tidak Aktif'}</p>
        <img src={beasiswa.logo} alt="logo" width="100" />
        <br />
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Kembali</button>
      </div>
  );
};

export default DetailBeasiswa;
