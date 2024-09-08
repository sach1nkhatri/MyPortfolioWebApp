import React from 'react';
import '../styles/Work.css';
import { workData } from '../data/workData'; // Import the workData array

function Work() {
    return (
        <div className="work">
            <h1>My Works</h1>
            <div className="featured-work-items">
                {workData.map((work, index) => (
                    <div className="work-item" key={index}>
                        <a href={work.link} target="_blank" rel="noopener noreferrer" className="work-link">
                            <img src={work.img} alt={work.title} />
                            <div className="work-info">
                                <h2>{work.title}</h2>
                                <div className="work-meta">
                                    <span className="year-tag">{work.year}</span>
                                    <span className="category">{work.category}</span>
                                </div>
                                <p>{work.description}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Work;
