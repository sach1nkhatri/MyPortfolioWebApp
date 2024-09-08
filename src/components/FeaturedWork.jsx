// src/components/FeaturedWork.jsx
import React from 'react';
import '../styles/FeaturedWork.css';
import { workData } from '../data/workData';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function FeaturedWork() {
    // Function to shuffle array and get 3 random works
    const getRandomWorks = () => {
        const shuffled = workData.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4); // Select first 3 after shuffle
    };

    const featuredWorks = getRandomWorks();

    return (
        <div className="featured-work-section">
            <h2>Featured Works</h2>
            <div className="featured-work-items">
                {featuredWorks.map((work, index) => (
                    <Link to={work.link} key={index} className="work-item">
                        <img src={work.img} alt={work.title} />
                        <div className="work-info">
                            <h3>{work.title}</h3>
                            <div className="work-meta">
                                <span className="year-tag">{work.year}</span>
                                <span className="category">{work.category}</span>
                            </div>
                            <p>{work.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FeaturedWork;
