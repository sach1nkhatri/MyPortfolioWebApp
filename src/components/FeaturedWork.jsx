import React, { useState, useEffect } from 'react';
import '../styles/FeaturedWork.css';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import Spinner from './Spinner';

function FeaturedWork() {
    const [workData, setWorkData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingImages, setLoadingImages] = useState({}); // ⬅️ Track each image's loading

    const getRandomWorks = (data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    };

    useEffect(() => {
        const workRef = ref(database, 'works');

        onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const workArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                setWorkData(getRandomWorks(workArray));
            } else {
                setWorkData([]);
            }
            setLoading(false);
        });
    }, []);

    const handleImageLoad = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: false }));
    };

    const handleImageStart = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="featured-work-section">
            <h2>Featured Works</h2>

            {loading ? (
                <Spinner />
            ) : (
                <div className="featured-work-items">
                    {workData.map((work) => {
                        if (loadingImages[work.id] === undefined) {
                            handleImageStart(work.id);
                        }

                        return (
                            <Link to={`/work/${work.id}`} key={work.id} className="work-item">
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
                                    <h3>{work.title}</h3>
                                    <div className="work-meta">
                                        <span className="year-tag">{work.year}</span>
                                        <span className="category">{work.category}</span>
                                    </div>
                                    <p>{work.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default FeaturedWork;
