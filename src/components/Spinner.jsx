// src/components/Spinner.jsx
import React from 'react';
import '../styles/Spinner.css'; // Create this CSS

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="loader"></div>
        </div>
    );
};

export default Spinner;
