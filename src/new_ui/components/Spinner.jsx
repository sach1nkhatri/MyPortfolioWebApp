import React from 'react';
import '../css/paper.css';

const Spinner = () => (
    <div className="paper-spinner" aria-label="Loading" role="status">
        <div className="paper-spinner-dot" />
        <div className="paper-spinner-dot" />
        <div className="paper-spinner-dot" />
    </div>
);

export default Spinner;
