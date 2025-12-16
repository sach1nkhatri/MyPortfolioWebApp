import React from 'react';
import { Link } from 'react-router-dom';
import '../css/paper.css';

const truncate = (text = '', limit = 140) => {
    if (!text) return '';
    return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
};

const WorkCard = ({ work }) => {
    return (
        <Link to={`/work/${work.id}`} className="paper-card paper-link">
            <img src={work.img} alt={work.title} className="paper-card-image" />
            <h3 className="paper-card-title">{work.title}</h3>
            <div className="paper-card-meta">{work.year} • {work.category}</div>
            <p className="paper-card-body">{truncate(work.description)}</p>
            <span className="paper-see-more">See more →</span>
            {work.technologies && (
                <div className="paper-tags">
                    {work.technologies.map((tech, idx) => (
                        <span key={idx} className="paper-tag">{tech}</span>
                    ))}
                </div>
            )}
        </Link>
    );
};

export default WorkCard;
