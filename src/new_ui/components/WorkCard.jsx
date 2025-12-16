import React from 'react';
import { Link } from 'react-router-dom';
import '../css/paper.css';

const WorkCard = ({ work }) => {
    return (
        <Link to={`/work/${work.id}`} className="paper-card paper-link">
            <img src={work.img} alt={work.title} className="paper-card-image" />
            <h3 className="paper-card-title">{work.title}</h3>
            <div className="paper-card-meta">{work.year} • {work.category}</div>
            <p className="paper-card-body">{work.description}</p>
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
