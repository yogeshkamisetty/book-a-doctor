import React, { useEffect, useState } from 'react';
import API from '../services/api';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await API.get(`/appointments?userId=${user._id}`);
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    if (user?._id) fetchAppointments();
  }, [user?._id]);

  return (
    <div className="mt-4">
      <h2 className="mb-4">My Appointments</h2>
      
      {appointments.length === 0 ? (
        <div className="alert alert-info">You have no upcoming appointments.</div>
      ) : (
        <table className="table table-striped table-hover mt-3 shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>Doctor ID</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app._id}>
                <td>{app.doctorId}</td>
                <td>{new Date(app.date).toLocaleString()}</td>
                <td>
                  <span className={`badge ${app.status === 'pending' ? 'bg-warning' : (app.status === 'approved' ? 'bg-success' : 'bg-danger')}`}>
                    {app.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
