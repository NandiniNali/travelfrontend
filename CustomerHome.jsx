import React from 'react';
import { Link } from 'react-router-dom';
import './CustomerHome.css';
import bgImage from './bg.avif'; // Import the image correctly

const CustomerHome = () => {
  return (
    <div className="customer-home">
      {/* Hero Section with inline background style */}
      <section 
        className="hero"
        style={{ backgroundImage: `url(${bgImage})` }} // Using imported image
      >
        <div className="hero-content">
          <h1>Your Dream Vacation Awaits</h1>
          <p>Discover amazing destinations at unbeatable prices</p>
          <Link to="/bookpackage" className="cta-button">Explore Packages</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <div className="rating">★★★★★</div>
            <p>"Amazing experience! Everything was perfectly arranged."</p>
            <div className="customer">- Rohan Sharma</div>
          </div>
          <div className="testimonial">
            <div className="rating">★★★★☆</div>
            <p>"Great value for money. Will definitely book again!"</p>
            <div className="customer">- Priya Patel</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;