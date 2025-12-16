import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaperLayout from './layout/PaperLayout';
import PaperHome from './pages/PaperHome';
import PaperBlog from './pages/PaperBlog';
import PaperBlogDetail from './pages/PaperBlogDetail';
import PaperWork from './pages/PaperWork';
import PaperWorkDetail from './pages/PaperWorkDetail';
import PaperContact from './pages/PaperContact';
import GamesApp from '../games';
import PaperSimulations from './pages/PaperSimulations';

const PaperApp = () => {
    return (
        <Routes>
            <Route path="/" element={<PaperLayout />}>
                <Route index element={<PaperHome />} />
                <Route path="blog" element={<PaperBlog />} />
                <Route path="blog/:id" element={<PaperBlogDetail />} />
                <Route path="work" element={<PaperWork />} />
                <Route path="work/:id" element={<PaperWorkDetail />} />
                <Route path="simulations" element={<PaperSimulations />} />
                <Route path="games/*" element={<GamesApp />} />
                <Route path="contact" element={<PaperContact />} />
            </Route>
        </Routes>
    );
};

export default PaperApp;
