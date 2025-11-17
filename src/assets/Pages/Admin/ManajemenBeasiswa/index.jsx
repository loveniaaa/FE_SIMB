import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import AdminLayout from '../components/AdminLayout';

import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../../../api/apiClient';
import { KIPLogo, LogoGenbi } from '../../../img';
import BeasiswaItem from './BeasiswaItem';

const ManajemenBeasiswa = () => {
  const [beasiswaList, setBeasiswaList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeasiswa = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        const response = await apiClient.get('/scholarshipType/get', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const records = response.data.output_schema.records;

        // Tambahkan logo lokal jika nama cocok
        const withCustomLogos = records.map(b => {
          const name = b.scholarshipName?.toLowerCase();
          let logo = b.logo;

          if (name === 'genbi') {
            logo = LogoGenbi;
          } else if (name === 'kip kuliah') {
            logo = KIPLogo;
          }

          return { ...b, logo };
        });

        setBeasiswaList(withCustomLogos);
      } catch (error) {
        console.error('Gagal mengambil daftar beasiswa:', error);
      }
    };

    fetchBeasiswa();
  }, []);

  const handleUpdate = (uuid) => {
    navigate(`/admin/manajemen-beasiswa/update/${uuid}`);
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Apakah yakin ingin menghapus beasiswa ini?')) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        await apiClient.delete(`/scholarshipType/delete?uuid=${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBeasiswaList(beasiswaList.filter(b => b.uuid !== uuid));
      } catch (error) {
        console.error('Gagal menghapus beasiswa:', error);
      }
    }
  };

  const handleDetail = (uuid) => {
    navigate(`/admin/manajemen-beasiswa/detail/${uuid}`);
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h3>Daftar Beasiswa</h3>
        <Link to="/admin/manajemen-beasiswa/add" className="btn btn-primary mb-3">
          Tambah Beasiswa +
        </Link>

        {beasiswaList.map((beasiswa) => (
          <BeasiswaItem
            key={beasiswa.uuid}
            beasiswa={{
              id: beasiswa.uuid,
              nama: beasiswa.scholarshipName || 'Tanpa Nama',
              logo: beasiswa.logo || '',
              active: beasiswa.active ?? false
            }}
            onUpdate={() => handleUpdate(beasiswa.uuid)}
            onDelete={() => handleDelete(beasiswa.uuid)}
            onDetail={() => handleDetail(beasiswa.uuid)}
          />
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManajemenBeasiswa;
