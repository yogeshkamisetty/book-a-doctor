import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-nav bg-white">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2 text-primary fw-bold fs-4" href="/">
             <span className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center p-2 mb-1" style={{width:'32px', height:'32px'}}>&copy;</span>
             oripio
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link text-primary fw-bold" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/doctors">Find a Doctor</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
            </ul>
          </div>

          <div className="d-flex">
            {token ? (
              <button className="btn btn-outline-danger fw-bold px-4" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="btn btn-cta shadow-sm" onClick={() => navigate('/login')}>Book An Appointment</button>
            )}
          </div>
        </div>
      </nav>

      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/doctors" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/book/:doctorId" element={
            <ProtectedRoute role="user">
              <BookAppointment />
            </ProtectedRoute>
          } />

          <Route path="/my-appointments" element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
