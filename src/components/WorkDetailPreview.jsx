import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Blog.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

function WorkDetailPreview() {
    const { id } = useParams();
    const [work, setWork] = useState(null);

    useEffect(() => {
        const workRef = ref(database, `works/${id}`);
        onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setWork(data);
            }
        });
    }, [id]);

    if (!work) return <div>Loading...</div>;

    return (
        <div className="blog">
            <div className="blog-post" style={{ width: '100%' }}>
                <img src={work.img} alt={work.title} className="blog-image" />
                <div className="blog-info">
                    <h2>{work.title}</h2>
                    <p>{work.year} | {work.category}</p>
                    <p>{work.description}</p>
                    {work.link && (
                        <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#007bff',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            🔗 Visit Project
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WorkDetailPreview;
