import React from 'react';
import './Home.css';
import heroImg from './k4.jpg';
import parisImg from './paris.avif';
import tokyoImg from './tokyo.avif';
import baliImg from './bali.avif';
import bangkokImg from './bangkok.avif'; // ✅ Newly added

const Home = () => {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Plan your next memory<br />with us?</h1>
          <p className="location">📍 <em>Somewhere on the seas of Phang Nga Bay near <strong>Phuket, Thailand</strong></em></p>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Luxury Yacht" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <h2>Welcome to Our Safe Travels</h2>
        <p>Discover and book amazing travel experiences.</p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <h3>Flight Bookings</h3>
          <p>Book domestic and international flights easily.</p>
        </div>
        <div className="feature-card">
          <h3>Hotel Accommodations</h3>
          <p>Find and reserve hotels around the world.</p>
        </div>
        <div className="feature-card">
          <h3>Cab Services</h3>
          <p>Hire cabs for local and outstation travel.</p>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <img src={parisImg} alt="Paris, France" />
            <p>Paris, France</p>
          </div>
          <div className="destination-card">
            <img src={tokyoImg} alt="Tokyo, Japan" />
            <p>Tokyo, Japan</p>
          </div>
          <div className="destination-card">
            <img src={baliImg} alt="Bali, Indonesia" />
            <p>Bali, Indonesia</p>
          </div>
          <div className="destination-card">
            <img src={bangkokImg} alt="Bangkok, Thailand" />
            <p>Bangkok, Thailand</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
