import React from 'react';

export default function About() {
  return (
    <div className="about-wrapper">
      <style>
        {`
          .about-wrapper {
            display: flex;
            justify-content: center;
            padding: 40px 20px;
            background-color: #f0f2f5;
            font-family: Arial, sans-serif;
          }

          .about-page-container {
            max-width: 900px;
            width: 100%;
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .about-card {
            background-color: #ffffff;
            padding: 20px;
            margin-bottom: 24px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          }

          .about-page-container p {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          }

          .about-page-container h2 {
            margin-top: 0;
            margin-bottom: 16px;
            color: #1a1a1a;
            font-size: 22px;
          }

          .about-page-container ul {
            padding-left: 20px;
            margin-top: 10px;
          }

          .about-page-container li {
            margin-bottom: 8px;
            color: #555;
            font-size: 16px;
          }

          strong {
            color: #2c3e50;
          }
        `}
      </style>

      <div className="about-page-container">
        <div className="about-card">
          <p>Welcome to <strong>Safe Travels</strong>! ✈️🌍</p>
          <p>
            We are passionate about making travel simple, exciting, and affordable.
            Our platform offers a wide range of services—from flights and hotels
            to custom travel packages—designed to give you the best experience possible.
          </p>
        </div>

        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            To make travel easy and accessible for everyone, helping you explore the world
            without stress.
          </p>
        </div>

        <div className="about-card">
          <h2>🧳 What We Offer</h2>
          <ul>
            <li>✈️ Flight bookings</li>
            <li>🏨 Hotel reservations</li>
            <li>📦 Travel packages</li>
            <li>📞 24/7 customer support</li>
            <li>🛡️ Safety tips</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>💡 Why Choose Us?</h2>
          <ul>
            <li>💰 Best price guarantee</li>
            <li>⚡ Quick and simple booking</li>
            <li>🌟 Trusted by thousands of travelers</li>
            <li>🌐 Local and international expertise</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
