import React from 'react';
import '../styles/ContactSection.css';
import instagramIcon from "../assets/instagram.png";
import githubIcon from "../assets/github.png";
import youtubeIcon from "../assets/youtube.png";

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="section-container">
                <h2>Contact Me</h2>
                <form action="#" method="post" className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
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
}

export default Contact;



