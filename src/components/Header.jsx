import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1 className="logo">My Portfolio</h1>
            <nav className="nav">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#work">Work</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
