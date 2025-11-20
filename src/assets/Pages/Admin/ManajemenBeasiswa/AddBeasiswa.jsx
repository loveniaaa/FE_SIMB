import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import AdminLayout from '../../../Pages/Admin/components/AdminLayout';
import apiClient from '../../../../api/apiClient';

const AddBeasiswa = () => {
  const [formData, setFormData] = useState({
    scholarship_name: '',
    description: '',
    applicant_quota: '',
    minimum_gpa: '',
    minimum_semester: '',
    isActive: true
  });

  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setToast({ show: true, message: 'Silakan login terlebih dahulu.', variant: 'danger' });
      return;
    }

    const ipkFloat = parseFloat(formData.minimum_gpa.replace(',', '.'));
    const kuotaInt = parseInt(formData.applicant_quota);
    const semesterInt = parseInt(formData.minimum_semester);

    if (isNaN(ipkFloat) || isNaN(kuotaInt) || isNaN(semesterInt)) {
      setToast({ show: true, message: 'Pastikan semua angka diisi dengan benar.', variant: 'danger' });
      return;
    }

    try {
      const response = await apiClient.post("/scholarshipType/create", {
        uuid: null,
        scholarship_name: formData.scholarship_name,
        description: formData.description,
        applicant_quota: kuotaInt,
        minimum_gpa: ipkFloat,
        minimum_semester: semesterInt,
        isActive: formData.isActive
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setToast({ show: true, message: 'Beasiswa berhasil ditambahkan!', variant: 'success' });

      setFormData({
        scholarship_name: '',
        description: '',
        applicant_quota: '',
        minimum_gpa: '',
        minimum_semester: '',
        isActive: true
      });
    } catch (error) {
      console.error("Error saat submit:", error.response || error.message || error);
      setToast({
        show: true,
        message: error?.response?.data?.error_schema?.error_message?.indonesian || 'Terjadi kesalahan saat menambahkan beasiswa.',
        variant: 'danger'
      });
    }
  };

  return (
    <AdminLayout>
      <Container className="mt-5">
        <h5><a href="/admin/manajemen-beasiswa">Daftar Beasiswa</a> / <span className="text-primary">Tambah Beasiswa</span></h5>
        <Form onSubmit={handleSubmit} className="bg-light p-4 rounded mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Nama Beasiswa</Form.Label>
            <Form.Control type="text" name="scholarship_name" value={formData.scholarship_name} onChange={handleChange} placeholder="Contoh: GenBI" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Beasiswa dari Bank Indonesia" />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>IPK Minimum</Form.Label>
                <Form.Control type="text" name="minimum_gpa" value={formData.minimum_gpa} onChange={handleChange} placeholder="Contoh: 3.25" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Semester Minimum</Form.Label>
                <Form.Select name="minimum_semester" value={formData.minimum_semester} onChange={handleChange}>
                  <option value="">Pilih Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Kuota Pendaftar</Form.Label>
                <Form.Control type="number" name="applicant_quota" value={formData.applicant_quota} onChange={handleChange} placeholder="Contoh: 100" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3 form-check">
            <Form.Check
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              label="Aktifkan beasiswa ini"
            />
          </Form.Group>

          <Button variant="success" type="submit">Simpan</Button>
        </Form>

        <ToastContainer position="top-end" className="p-3">
          <Toast bg={toast.variant} show={toast.show} onClose={() => setToast({ ...toast, show: false })} delay={3000} autohide>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </AdminLayout>
  );
};

export default AddBeasiswa;
