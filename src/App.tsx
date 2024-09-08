import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Work from './components/Work';
import './App.css';
import Contact from './components/Contact';

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

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>

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
