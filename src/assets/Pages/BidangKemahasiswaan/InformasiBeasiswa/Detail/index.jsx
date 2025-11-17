import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../../../api/apiClient';
import BidangKemahasiswaanLayout from '../../components/BidangKemahasiswaanLayout';
import { Badge, Button } from 'react-bootstrap';
import { KIPLogo, LogoGenbi } from '../../../../img';

const DetailBeasiswaBidangKemahasiswaan = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [beasiswa, setBeasiswa] = useState(null);

  // 🔹 Ambil data detail
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        const response = await apiClient.get(`/scholarshipType/detail?uuid=${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBeasiswa(response.data.output_schema.result);
      } catch (error) {
        console.error('Gagal mengambil detail beasiswa:', error);
      }
    };

    fetchDetail();
  }, [uuid]);

  // 🔹 Fungsi toggle status
  const handleToggleStatus = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;

      const newStatus = !beasiswa.active;

      await apiClient.patch(
        `/scholarshipType/${uuid}/status`,
        { isActive: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Beasiswa berhasil ${newStatus ? 'diaktifkan' : 'dinonaktifkan'}.`);

      // Update state tanpa reload
      setBeasiswa((prev) => ({ ...prev, active: newStatus }));
    } catch (error) {
      console.error('Gagal memperbarui status beasiswa:', error);
      alert('Terjadi kesalahan saat memperbarui status.');
    }
  };

  // 🔹 Logo helper
  const getLogo = () => {
    if (!beasiswa) return null;

    const name = beasiswa.scholarship_name?.toLowerCase();
    if (name === 'genbi') return LogoGenbi;
    if (name === 'kip kuliah') return KIPLogo;
    return beasiswa.logo || null;
  };

  if (!beasiswa) return <p className="text-center mt-4">Memuat data...</p>;

  return (
    <BidangKemahasiswaanLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Detail Beasiswa</h3>
          <Badge bg={beasiswa.active ? 'success' : 'danger'} className="px-3 py-2">
            {beasiswa.active ? 'Aktif' : 'Tidak Aktif'}
          </Badge>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-4 d-flex justify-content-center align-items-center mb-3 mb-md-0">
                {getLogo() ? (
                  <img
                    src={getLogo()}
                    alt="Logo Beasiswa"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="text-muted fst-italic">Logo tidak tersedia</div>
                )}
              </div>
              <div className="col-md-8">
                <h5 className="fw-semibold mb-3">{beasiswa.scholarship_name}</h5>
                <p className="text-muted">{beasiswa.description}</p>
                <div className="row">
                  <div className="col-sm-6 mb-2">
                    <strong>Kuota:</strong> {beasiswa.applicant_quota}
                  </div>
                  <div className="col-sm-6 mb-2">
                    <strong>IPK Minimum:</strong> {beasiswa.minimum_gpa}
                  </div>
                  <div className="col-sm-6 mb-2">
                    <strong>Semester Minimum:</strong> {beasiswa.minimum_semester}
                  </div>
                  <div className="col-sm-6 mb-2">
                    <strong>Dibuat Oleh:</strong> {beasiswa.created_by}
                  </div>
                  <div className="col-sm-6 mb-2">
                    <strong>Dibuat Tanggal:</strong> {beasiswa.created_at}
                  </div>
                  <div className="col-sm-6 mb-2">
                    <strong>Diubah Tanggal:</strong> {beasiswa.updated_at}
                  </div>
                  <div className="col-sm-6 mb-2">
                    <strong>Diubah Oleh:</strong> {beasiswa.updated_by}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Tombol Aksi */}
        <div className="mt-4 d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Kembali
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/bidang/informasi-beasiswa/update/${uuid}`)}
          >
            Edit Beasiswa
          </Button>
          <Button
            variant={beasiswa.active ? 'danger' : 'success'}
            onClick={handleToggleStatus}
          >
            {beasiswa.active ? 'Nonaktifkan Beasiswa' : 'Aktifkan Beasiswa'}
          </Button>
        </div>
      </div>
    </BidangKemahasiswaanLayout>
  );
};

export default DetailBeasiswaBidangKemahasiswaan;
