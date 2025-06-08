import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContainer } from 'react-toastify'; // ✅ import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // ✅ import styles
import WorkDetailPreview from './components/WorkDetailPreview';

import Home from './components/Home';
import Blog from './components/Blog';
import Work from './components/Work';
import Contact from './components/Contact';
import DetailPreview from './components/DetailPreview';
import Footer from './components/Footer';
import GamesApp from './games';
import './App.css';

function AnimatedRoutes() {
    const location = useLocation();
    const [animationClass, setAnimationClass] = useState('flip');
    const animations = ['flip', 'flip-x'];

    useEffect(() => {
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        setAnimationClass(randomAnimation);
    }, [location]);

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames={animationClass}
                timeout={600}
            >
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/blog/:id" element={<DetailPreview />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/games/*" element={<GamesApp />} />
                    <Route path="/work/:id" element={<WorkDetailPreview />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => setDarkMode(prev => !prev);


    return (
        <Router>
            <div className={`app ${darkMode ? 'dark' : ''}`}> {/* Theme class */}
                <header className="main-header">
                    <div className="centered-header-content">
                        {/* Toggle + Title in one row */}
                        <label className="theme-switch">
                            <input type="checkbox" onChange={toggleDarkMode} checked={darkMode}/>
                            <span className="slider"/>
                        </label>
                        <h1 className="typing-animation">Welcome To My Portfolio!!!</h1>
                    </div>

                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/blog">Blogs</Link>
                        <Link to="/work">Works</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </header>


                <AnimatedRoutes/>
                <Footer/>

                <ToastContainer theme={darkMode ? 'dark' : 'light'}/>
            </div>
        </Router>
    );
}


export default App;
