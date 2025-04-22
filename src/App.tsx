import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './components/Home';
import Blog from './components/Blog';
import Work from './components/Work';
import Contact from './components/Contact';
import DetailPreview from './components/DetailPreview';
import './App.css';

function AnimatedRoutes() {
    const location = useLocation();
    const [animationClass, setAnimationClass] = useState('flip');

    // Array of different flip animations (X-axis and Y-axis flips)
    const animations = ['flip', 'flip-x'];

    // Randomize the animation class on each route change
    useEffect(() => {
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        setAnimationClass(randomAnimation);
    }, [location]);

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames={animationClass}  // Apply the random flip animation class
                timeout={600}
            >
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/blog/:id" element={<DetailPreview />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

function App() {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1 className="typing-animation">Welcome To My Portfolio!!!</h1>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/blog">Blogs</Link>
                        <Link to="/work">Works</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </header>

                <AnimatedRoutes />

                <footer>
                    <p>
                        © 2024 All rights reserved | Developed By{' '}
                        <a
                            href="https://chilli-audioworks.web.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sachin Khatri
                        </a>
                    </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
