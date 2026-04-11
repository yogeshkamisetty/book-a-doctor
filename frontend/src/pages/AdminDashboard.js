import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Ideally this endpoint should fetch ALL doctors, both approved and pending
    // For now we will rely on what backend currently provides.
    const fetchAllDoctors = async () => {
      try {
        // Fetch logic 
        // Example: await API.get('/admin/pending-doctors');
        console.log("Admin Dashboard Loaded - Doctor Moderation Functionality Placeholder");
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllDoctors();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-danger border-bottom pb-2 mb-4">Admin Dashboard</h2>
      
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title">System Metrics</h4>
          <p>This panel allows admins to approve/reject pending doctors, manage platform configurations, and monitor system health.</p>
        </div>
      </div>
      
      <div className="alert alert-warning">
        <strong>Upcoming Feature:</strong> Complete endpoints for PUT /approve-doctor and GET /pending-doctors required to populate moderation tables.
      </div>
    </div>
  );
};

export default AdminDashboard;
