import React, { useState } from 'react';
import { ref, set } from "firebase/database";
import { database } from "../firebase";
import instagramIcon from "../assets/instagram.png";
import githubIcon from "../assets/github.png";
import youtubeIcon from "../assets/youtube.png";
import '../styles/ContactSection.css';
import Spinner from './Spinner'; // ✅ spinner import
import { notify } from '../utils/notify'; // ✅ custom notify

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false); // ✅ loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const sanitizedEmail = email.replace(/\./g, '_');
        const timestamp = Date.now();

        setLoading(true); // ✅ start spinner

        set(ref(database, 'contacts/' + sanitizedEmail), {
            name, email, message, timestamp
        })
            .then(() => {
                notify('success', 'Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                console.error("Error sending message: ", error);
                notify('error', 'Something went wrong.');
            })
            .finally(() => setLoading(false)); // ✅ stop spinner
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

                    {loading ? <Spinner /> : (
                        <button type="submit" className="submit-button">Send</button>
                    )}
                </form>
            </div>

            <section className="social-link">
                <h1>Connect With Me On</h1>
                <div className="social-links">
                    <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://github.com/sach1nkhatri" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                    <a href="https://www.youtube.com/@SachinKhatri" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="YouTube" />
                    </a>
                </div>
            </section>
        </section>
    );
};

export default Contact;
