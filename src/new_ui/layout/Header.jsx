import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/paper.css';


const Header = () => {
    return (
        <header className="paper-header">
            <div className="paper-brand">
                {/* <img src={logo} alt="Paper Site logo" className="paper-brand-logo" /> */}
                <span>Sachin Khatri</span>
            </div>
            <nav className="paper-nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
                <NavLink to="/work" className={({ isActive }) => isActive ? 'active' : ''}>Work</NavLink>
                <NavLink to="/games" className={({ isActive }) => isActive ? 'active' : ''}>Games</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
            </nav>
        </header>
    );
};

export default Header;
