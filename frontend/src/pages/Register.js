import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4 mt-5">
        <h3 className="mb-3 text-center">Register Account</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" className="form-control" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="mt-3 text-center">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
