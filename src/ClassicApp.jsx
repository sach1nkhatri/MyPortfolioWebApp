import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import './App.css';

const BASE = '/classic';

const ClassicApp = () => {
    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = () => setDarkMode(prev => !prev);
    const location = useLocation();
    const [animationClass, setAnimationClass] = useState('flip');
    const animations = ['flip', 'flip-x'];

    useEffect(() => {
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        setAnimationClass(randomAnimation);
    }, [location]);

    return (
        <div className={`app ${darkMode ? 'dark' : ''}`}>
            <header className="main-header">
                <div className="centered-header-content">
                    <label className="theme-switch">
                        <input type="checkbox" onChange={toggleDarkMode} checked={darkMode}/>
                        <span className="slider"/>
                    </label>
                    <h1 className="typing-animation">Welcome To My Portfolio!!!</h1>
                </div>

                <nav>
                    <Link to={`${BASE}/`}>Home</Link>
                    <Link to={`${BASE}/blog`}>Blogs</Link>
                    <Link to={`${BASE}/work`}>Works</Link>
                    <Link to={`${BASE}/contact`}>Contact</Link>
                </nav>
            </header>

            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames={animationClass}
                    timeout={600}
                >
                    <div>
                        <Outlet />
                    </div>
                </CSSTransition>
            </TransitionGroup>
            <Footer/>
            <ToastContainer theme={darkMode ? 'dark' : 'light'}/>
        </div>
    );
};

export default ClassicApp;
