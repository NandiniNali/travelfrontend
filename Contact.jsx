import React from 'react';
import './Contact.css';
import msg_icon from './msg-icon.jpg';
import mail_icon from './mail-icon.jpg';
import phone_icon from './phone-icon.jpg';
import location_icon from './location-icon.jpg';

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "4486f3a1-0c6b-410c-8e4a-2acf888191e5");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className='contact-section'>
      <div className="contact-info">
        <h3>
          Send us a message <img src={msg_icon} alt="msg-icon" />
        </h3>
        <p className="contact-text">
          Feel free to reach out through the contact form or find our contact information
          below. Your feedback, questions, and suggestions are important to us as we strive 
          to provide exceptional services to our Safe Travels.
        </p>
        <ul>
          <li><img src={mail_icon} alt="mail-icon" />Contact@SafeTravels</li>
          <li><img src={phone_icon} alt="phone-icon" />+91 900-043-5689</li>
          <li>
            <img src={location_icon} alt="location-icon" />
            77 Vaddeswaram, Guntur<br />Andhra Pradesh
          </li>
        </ul>
      </div>

      <div className="contact-form">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />

          <label>Phone Number</label>
          <input type="text" name="phone" placeholder="Enter your mobile number" required />

          <label>Write your messages here</label>
          <textarea name="message" rows="6" placeholder="Enter Your message" required></textarea>

          <button type="submit" className="contact-submit-btn">Submit now</button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
