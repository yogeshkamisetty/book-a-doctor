import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get('/doctors');
        setDoctors(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Available Doctors</h2>
      
      <div className="mb-3">
        {user?.role === 'user' && (
          <button className="btn btn-info text-white" onClick={() => navigate('/my-appointments')}>View My Appointments</button>
        )}
      </div>

      <div className="row">
        {doctors.length === 0 ? <p>No doctors currently available.</p> : doctors.map((doc) => (
          <div key={doc._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body border-top border-primary border-4">
                <h5 className="card-title text-primary">{doc.specialization}</h5>
                <p className="card-text mb-1"><strong>Consultation Fees:</strong> ${doc.fees}</p>
                <button 
                  className="btn btn-primary mt-3 w-100" 
                  onClick={() => navigate(`/book/${doc._id}`)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
