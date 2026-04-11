import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiCheckCircle, FiUser, FiArrowLeft } from 'react-icons/fi';
import API from '../services/api';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch the specific doctor's details
    const fetchDoctor = async () => {
      try {
        const { data } = await API.get('/doctors');
        const selectedDoctor = data.find(doc => doc._id === doctorId);
        setDoctor(selectedDoctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      // Combine date and time for backend
      const combinedDateTime = `${date}T${time}`;

      await API.post('/appointments/book', {
        doctorId,
        userId: user._id,
        date: combinedDateTime
      });
      
      setSuccess(true);
      setMessage('Appointment confirmed successfully!');
      setTimeout(() => navigate('/my-appointments'), 2500);
    } catch (err) {
      setSuccess(false);
      setMessage('Error booking appointment. Please try again.');
    }
  };

  if (!doctor) return (
    <div className="container mt-5 text-center pt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-5 pt-3 mb-5">
      <button 
        className="btn btn-link text-decoration-none p-0 mb-4 d-flex align-items-center text-muted"
        onClick={() => navigate('/')}
      >
        <FiArrowLeft className="me-2" /> Back to Dashboard
      </button>

      <div className="row justify-content-center">
        {/* Doctor Information Card */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-body text-center p-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{width: 80, height: 80}}>
                <FiUser size={40} className="text-primary" />
              </div>
              <h4 className="fw-bold mb-1">{doctor.specialization} Specialist</h4>
              <p className="text-muted mb-4 pb-3 border-bottom">Booking ID: {doctor._id.substring(0,8).toUpperCase()}</p>
              
              <div className="text-start">
                <p className="mb-2"><strong>Consultation Fee:</strong> <span className="text-success fw-bold p-1 bg-success bg-opacity-10 rounded px-2">${doctor.fees}</span></p>
                <p className="mb-2"><strong>Availability:</strong> Mon - Fri</p>
                <p className="mb-0"><strong>Status:</strong> {doctor.isApproved ? <span className="text-success"><FiCheckCircle className="me-1"/>Available</span> : 'Unavailable'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Layout */}
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
              <h3 className="fw-bold">Schedule an Appointment</h3>
              <p className="text-muted">Select your preferred date and time slot below.</p>
            </div>
            
            <div className="card-body p-4">
              {message && (
                <div className={`alert ${success ? 'alert-success border-success' : 'alert-danger'} d-flex align-items-center`} role="alert">
                  {success && <FiCheckCircle size={20} className="me-2" />}
                  {message}
                </div>
              )}

              <form onSubmit={handleBooking}>
                <div className="row g-3">
                  {/* Date Input */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-secondary d-flex align-items-center">
                      <FiCalendar className="me-2" /> Date
                    </label>
                    <input 
                      type="date" 
                      className="form-control form-control-lg bg-light border-0" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      min={new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>

                  {/* Time Input */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-secondary d-flex align-items-center">
                      <FiClock className="me-2" /> Time Slot
                    </label>
                    <input 
                      type="time" 
                      className="form-control form-control-lg bg-light border-0" 
                      value={time} 
                      onChange={(e) => setTime(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="bg-light p-3 rounded-3 mt-2 mb-4 text-center">
                  <small className="text-muted">You will automatically receive an email confirmation once scheduled.</small>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                  disabled={success}
                  style={{ borderRadius: '10px' }}
                >
                  {success ? 'Confirmed!' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
