import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import "./dashboard-admin.css";
import apiClient from '../../../../api/apiClient';

const DashboardAdmin = () => {
  const [summary, setSummary] = useState({
    total: 0,
    inProgress: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        if (!token) {
          console.error("No token found.");
          return;
        }

        const response = await apiClient.get("/scholarship/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const records = response.data.output_schema.records || [];

        const total = records.length;
        const inProgress = records.filter((s) => s.status === "IN_PROGRESS").length;
        const approved = records.filter((s) => s.status === "APPROVED").length;
        const rejected = records.filter((s) => s.status === "REJECTED").length;

        setSummary({ total, inProgress, approved, rejected });

      } catch (error) {
        console.error("Error fetching scholarship summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const getPercentage = (count) => {
    if (summary.total === 0) return 0;
    return ((count / summary.total) * 100).toFixed(0);
  };

  return (
    <AdminLayout>
      <h1 className="fs-3 fw-bold mb-4">Dashboard</h1>
      
        <section className="bg-light rounded p-4">
        <h2 className="h5 mb-4">Ringkasan Pendaftar</h2>
        <div className="row g-4">

          {/* Total */}
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="bg-white rounded p-4 text-center shadow-sm">
              <h3 className="h2 mb-2">{loading ? "..." : summary.total}</h3>
              <p className="mb-2 fw-semibold text-secondary">Total Pendaftar</p>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-secondary"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="bg-white rounded p-4 text-center shadow-sm">
              <h3 className="h2 mb-2">{loading ? "..." : summary.inProgress}</h3>
              <p className="mb-2 fw-semibold text-primary">Sedang Diproses</p>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-primary"
                  style={{ width: `${getPercentage(summary.inProgress)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Approved */}
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="bg-white rounded p-4 text-center shadow-sm">
              <h3 className="h2 mb-2">{loading ? "..." : summary.approved}</h3>
              <p className="mb-2 fw-semibold text-success">Diterima</p>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${getPercentage(summary.approved)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="bg-white rounded p-4 text-center shadow-sm">
              <h3 className="h2 mb-2">{loading ? "..." : summary.rejected}</h3>
              <p className="mb-2 fw-semibold text-danger">Ditolak</p>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: `${getPercentage(summary.rejected)}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </AdminLayout>
  );
};

export default DashboardAdmin;
