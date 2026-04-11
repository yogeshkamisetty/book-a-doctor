import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPhoneCall, FiSearch } from 'react-icons/fi';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="hero-title">
                Book Your Doctor <br/> Appointment <br/> Online.
              </h1>
              <p className="hero-subtitle">
                A Healthier Tomorrow Starts Today: Schedule Your Appointment!<br/>
                Your Wellness, Our Expertise: Set Up Your Appointment Today.
              </p>
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-light text-primary px-4 py-2 opacity-100 fw-bold" 
                  onClick={() => navigate('/login')}
                  style={{ borderRadius: '8px' }}
                >
                  Book An Appointment
                </button>
                <button 
                  className="btn btn-outline-custom d-flex align-items-center gap-2"
                >
                  <FiPhoneCall /> Call now
                </button>
              </div>
            </div>
            
            <div className="col-lg-6 my-auto text-center position-relative">
              {/* Note: I'm using an Unsplash image of a friendly doctor as a placeholder for the hero graphic */}
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Doctor with crossed arms" 
                className="doctor-img rounded-circle shadow-lg object-fit-cover"
                style={{ width: '450px', height: '450px', objectPosition: 'top' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping Search Box */}
      <div className="container search-box-wrapper">
        <div className="search-box">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <select className="form-select border-0 bg-light p-3 text-muted">
                <option defaultValue>Select Date & Time</option>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>Next Week</option>
              </select>
            </div>
            <div className="col-md-5">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control border-0 bg-light p-3" 
                  placeholder="Search doctors, name, specialist" 
                />
              </div>
            </div>
            <div className="col-md-3">
              <button 
                className="btn btn-primary w-100 p-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate('/login')}
                style={{ borderRadius: '10px' }}
              >
                <FiSearch size={20} /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="container text-center mt-5 pt-5 mb-5">
        <h2 className="section-title">How It Works!</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Discover, book, and experience personalized healthcare effortlessly with our user-friendly Doctor Appointment Website.
        </p>

        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded shadow-sm h-100 border-top border-primary border-4">
              <h4 className="fw-bold mb-3">1. Find a Doctor</h4>
              <p className="text-muted">Search through our huge network of certified professionals by specialty or location.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded shadow-sm h-100 border-top border-primary border-4">
              <h4 className="fw-bold mb-3">2. Book Appointment</h4>
              <p className="text-muted">Choose your preferred date and time, and instantly secure your booking online.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded shadow-sm h-100 border-top border-primary border-4">
              <h4 className="fw-bold mb-3">3. Get Treatment</h4>
              <p className="text-muted">Connect with your doctor effortlessly and receive the best possible care securely.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
