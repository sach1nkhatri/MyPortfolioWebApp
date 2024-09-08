import React, { useState } from 'react';
import { ref, set } from "firebase/database";
import { database } from "../firebase";  // Import the initialized database
import instagramIcon from "../assets/instagram.png";
import githubIcon from "../assets/github.png";
import youtubeIcon from "../assets/youtube.png";
import '../styles/ContactSection.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        // Sanitize email to remove invalid characters for Firebase path
        const sanitizedEmail = email.replace(/\./g, '_');

        // Get current timestamp
        const timestamp = Date.now();

        // Push data to Firebase Realtime Database
        set(ref(database, 'contacts/' + sanitizedEmail), {
            name: name,
            email: email,
            message: message,
            timestamp: timestamp  // Include timestamp in the data
        })
            .then(() => {
                alert("Message sent successfully!");
                setFormData({ name: '', email: '', message: '' });  // Clear form fields after submission
            })
            .catch((error) => {
                console.error("Error sending message: ", error);
                alert("Error sending message. Check the console for details.");
            });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="section-container">
                <h2>Contact Me</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Send</button>
                </form>
            </div>
            <section className="social-link">
                <h1>Connect With Me On</h1>
                <div className="social-links">
                    <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram"/>
                    </a>
                    <a href="https://github.com/sach1nkhatri" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub"/>
                    </a>
                    <a href="https://www.youtube.com/@SachinKhatri" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="YouTube"/>
                    </a>
                </div>
            </section>
        </section>
    );
};

export default Contact;
