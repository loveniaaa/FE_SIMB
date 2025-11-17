import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../../../api/apiClient';
import BidangKemahasiswaanLayout from '../../components/BidangKemahasiswaanLayout';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const UpdateBeasiswaBidangKemahasiswaan = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({
    scholarshipName: '',
    description: '',
    applicantQuota: '',
    minimumGpa: '',
    minimumSemester: '',
    logo: '',
    active: true
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        const response = await apiClient.get(`/scholarshipType/detail?uuid=${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.output_schema?.result;
        if (!data) throw new Error("Data tidak ditemukan");

        setInitialData(data);
        setFormData({
          scholarship_name: '',
          description: '',
          applicant_quota: '',
          minimum_gpa: '',
          minimum_semester: '',
          logo: '',
          isActive: data.active
        });
      } catch (error) {
        console.error('Gagal memuat detail beasiswa:', error);
      }
    };

    fetchDetail();
  }, [uuid]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      uuid: uuid,
      scholarship_name: formData.scholarshipName || initialData.scholarshipName,
      description: formData.description || initialData.description,
      applicant_quota: formData.applicantQuota || initialData.applicantQuota,
      minimum_gpa: formData.minimumGpa || initialData.minimumGpa,
      minimum_semester: formData.minimumSemester || initialData.minimumSemester,
      logo: formData.logo || initialData.logo,
      isActive: formData.active
    };

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;

      await apiClient.put(`/scholarshipType/update?uuid=${uuid}`, finalData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Beasiswa berhasil diperbarui!');
      navigate('/bidang/informasi-beasiswa');
    } catch (error) {
      console.error('Gagal mengupdate beasiswa:', error);
    }
  };

  return (
    <BidangKemahasiswaanLayout>
      <div className="container mt-4">
        <h3 className="fw-bold text-primary mb-4 border-bottom pb-2">
          ✏️ Update Data Beasiswa
        </h3>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Nama Beasiswa</Form.Label>
                    <Form.Control
                      type="text"
                      name="scholarshipName"
                      value={formData.scholarshipName}
                      onChange={handleChange}
                      placeholder={initialData.scholarship_name || 'Masukkan nama beasiswa'}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Kuota Pendaftar</Form.Label>
                    <Form.Control
                      type="number"
                      name="applicantQuota"
                      value={formData.applicantQuota}
                      onChange={handleChange}
                      placeholder={initialData.applicant_quota?.toString() || 'Contoh: 100'}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>IPK Minimum</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="minimumGpa"
                      value={formData.minimumGpa}
                      onChange={handleChange}
                      placeholder={initialData.minimum_gpa?.toString() || 'Contoh: 3.25'}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Semester Minimum</Form.Label>
                    <Form.Control
                      type="number"
                      name="minimumSemester"
                      value={formData.minimumSemester}
                      onChange={handleChange}
                      placeholder={initialData.minimum_semester?.toString() || 'Contoh: 3'}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={initialData.description || 'Tuliskan deskripsi beasiswa...'}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>URL Logo</Form.Label>
                <Form.Control
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder={initialData.logo || 'Masukkan URL gambar logo'}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Beasiswa Aktif"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Batal
                </Button>
                <Button type="submit" variant="primary">
                  Simpan Perubahan
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </BidangKemahasiswaanLayout>
  );
};

export default UpdateBeasiswaBidangKemahasiswaan;
