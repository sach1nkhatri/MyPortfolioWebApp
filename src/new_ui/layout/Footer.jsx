import React from 'react';
import { Link } from 'react-router-dom';
import '../css/paper.css';

const Footer = () => {
    return (
        <footer className="paper-footer">
            <div className="paper-footer-col">
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>Paper Site · Sachin Khatri</div>
                <p>Drawn with a digital Sharpie so pixels feel human — everything is a prototype.</p>
                <p style={{ marginTop: '8px' }}>
                    Prefer the original look? <Link to="/classic">Classic UI</Link>
                </p>
            </div>
            <div className="paper-footer-col">
                <h5>Product</h5>
                <ul>
                    <li><a href="https://attenai.com/" target="_blank" rel="noreferrer">AttenAI</a></li>
                    <li><a href="https://chilli-audioworks.web.app/" target="_blank" rel="noreferrer">ChilliAudioworks</a></li>
                    <li><a href="https://github.com/sach1nkhatri/KhajaKhoj" target="_blank" rel="noreferrer">Khaja Khoj</a></li>
                </ul>
            </div>
            <div className="paper-footer-col">
                <h5>Company</h5>
                <ul>
                    <li><Link to="/games">Games</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/work">Works</Link></li>
                </ul>
            </div>
            <div className="paper-footer-col">
                <h5>Resources</h5>
                <ul>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><a href="https://github.com/sach1nkhatri" target="_blank" rel="noreferrer">Github</a></li>
                    <li><a href="https://drive.google.com/drive/folders/129LfVPpFct4v-Ont5Agy93IiOclOQx8V?usp=sharing" target="_blank" rel="noreferrer">Assets</a></li>
                </ul>
            </div>
            <div className="paper-legal">
                © 2025 | PaperPortfolio | Built by Sachin Khatri. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
