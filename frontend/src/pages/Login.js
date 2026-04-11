import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.role === 'admin') navigate('/admin');
      else navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h3 className="mb-3 text-center">Login to Book A Doctor</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;
