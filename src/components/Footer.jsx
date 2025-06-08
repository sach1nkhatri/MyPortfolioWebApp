// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';
import sachinLogo from '../assets/sachin_text_logo.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <img src={sachinLogo} alt="Sachin Logo" className="footer-text-logo" />
                </div>

                <div className="footer-columns">
                    <div className="footer-column">
                        <h4>Product</h4>
                        <a href="https://attenai.com/">AttenAI</a>
                        <a href="https://chilli-audioworks.web.app/">ChilliAudioworks</a>
                        <a href="https://github.com/sach1nkhatri/KhajaKhoj">Khaja Khoj</a>
                    </div>
                    <div className="footer-column">
                        <h4>Company</h4>
                        <a href="/games">Games</a>
                        <a href="https://sachin.bio/contact">Contact</a>
                        <a href="https://sachin.bio/work">Works</a>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <a href="https://sachin.bio/blog">Blog</a>
                        <a href="https://github.com/sach1nkhatri">Github</a>
                        <a href="https://drive.google.com/drive/folders/129LfVPpFct4v-Ont5Agy93IiOclOQx8V?usp=sharing">Assets</a>
                    </div>
                </div>
            </div>

            <hr />

            <div className="footer-bottom">
                <p>© 2025 | Portfolio | Built by Sachin Khatri. All Rights Reserved.</p>
                <div className="footer-socials">
                    <img src={facebook} alt="Facebook" />
                    <img src={twitter} alt="Twitter" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
