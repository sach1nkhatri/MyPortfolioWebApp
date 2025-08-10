import React, { useState, useEffect } from 'react';
import '../styles/Work.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

function Work() {
    const [workData, setWorkData] = useState([]);
    const [loadingImages, setLoadingImages] = useState({});

    useEffect(() => {
        const workRef = ref(database, 'works');
        onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const workArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                setWorkData(workArray);
            } else {
                setWorkData([]);
            }
        });
    }, []);

    const handleImageLoad = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: false }));
    };

    const handleImageStartLoading = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: true }));
    };

    // Function to render technology tags
    const renderTechTags = (technologies) => {
        if (!technologies || technologies.length === 0) return null;
        
        return (
            <div className="tech-tags">
                {technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                        {tech}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="work">
            <h1>My Works</h1>
            <div className="featured-work-items">
                {workData.map((work) => {
                    // Start tracking when image begins to load
                    if (loadingImages[work.id] === undefined) {
                        handleImageStartLoading(work.id);
                    }

                    return (
                        <div className="work-item" key={work.id}>
                            <Link to={`/work/${work.id}`} className="work-link">
                                <div className="image-container">
                                    {loadingImages[work.id] && <Spinner />}
                                    <img
                                        src={work.img}
                                        alt={work.title}
                                        onLoad={() => handleImageLoad(work.id)}
                                        style={{ display: loadingImages[work.id] ? 'none' : 'block' }}
                                    />
                                </div>
                                <div className="work-info">
                                    <h2>{work.title}</h2>
                                    <div className="work-meta">
                                        <span className="year-tag">{work.year}</span>
                                        <span className="category">{work.category}</span>
                                    </div>
                                    <p>{work.description}</p>
                                    {renderTechTags(work.technologies)}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Work;
