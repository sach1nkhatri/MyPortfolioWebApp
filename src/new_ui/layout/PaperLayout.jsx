import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../css/paper.css';

const PaperLayout = () => {
    return (
        <div className="paper-page">
            <div className="paper-sheet">
                <Header />
                <main className="paper-main">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default PaperLayout;
