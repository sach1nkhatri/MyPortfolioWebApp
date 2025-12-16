import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import PaperLayout from './PaperLayout';
import Spinner from '../../components/Spinner';
import instagramIcon from '../../assets/instagram.png';
import githubIcon from '../../assets/github.png';
import youtubeIcon from '../../assets/youtube.png';
import { database } from '../../firebase';
import { notify } from '../../utils/notify';
import '../css/paper.css';

const PaperContact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const sanitizedEmail = email.replace(/\./g, '_');
        const timestamp = Date.now();
        setLoading(true);

        set(ref(database, 'contacts/' + sanitizedEmail), {
            name,
            email,
            message,
            timestamp,
        })
            .then(() => {
                notify('success', 'Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                console.error('Error sending message: ', error);
                notify('error', 'Something went wrong.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <PaperLayout>
            <section className="paper-section" style={{ paddingBottom: '6px' }}>
                <div className="paper-hero-text" style={{ margin: '0 12px', transform: 'rotate(-0.4deg)' }}>
                    <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Let's scribble a message together.</h1>
                    <p>Drop a note on this paper page—no pixels were left too perfect in the making.</p>
                </div>
            </section>

            <section className="paper-form-card">
                <form className="paper-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="paper-actions">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <button type="submit" className="paper-button">Send</button>
                        )}
                        <span style={{ fontSize: '14px' }}>(Pretend this sends ink on paper)</span>
                    </div>
                </form>
            </section>

            <section className="paper-social">
                <h2 className="paper-section-title">Connect With Me On</h2>
                <div className="paper-social-icons">
                    <a href="https://www.instagram.com/your-profile" target="_blank" rel="noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://github.com/sach1nkhatri" target="_blank" rel="noreferrer">
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                    <a href="https://www.youtube.com/@SachinKhatri" target="_blank" rel="noreferrer">
                        <img src={youtubeIcon} alt="YouTube" />
                    </a>
                </div>
            </section>
        </PaperLayout>
    );
};

export default PaperContact;
