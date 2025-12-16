import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import Spinner from '../components/Spinner';
import '../css/paper.css';

const PaperWorkDetail = () => {
    const { id } = useParams();
    const [work, setWork] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const workRef = ref(database, `works/${id}`);
        const unsubscribe = onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setWork(data);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    if (loading) {
        return (
            <Spinner />
        );
    }

    if (!work) {
        return (
            <div className="paper-section">Work not found.</div>
        );
    }

    return (
        <article className="paper-article">
            <div className="paper-back-row">
                <Link to="/work" className="paper-back-link">← Back to work</Link>
            </div>
            <div className="paper-article-header">
                <div className="paper-article-kicker">Case Study</div>
                <div className="paper-article-meta">
                    <span>{work.year}</span>
                    <span>•</span>
                    <span>{work.category}</span>
                </div>
                <h1 className="paper-article-title">{work.title}</h1>
            </div>

            <div className="paper-article-hero">
                <img src={work.img} alt={work.title} />
            </div>

            <div className="paper-article-body">
                <p>{work.description}</p>
                {work.technologies && (
                    <div className="paper-tags">
                        {work.technologies.map((tech, idx) => (
                            <span key={idx} className="paper-tag">{tech}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="paper-detail-actions">
                {work.link && (
                    <a
                        href={work.link}
                        target="_blank"
                        rel="noreferrer"
                        className="paper-cta-link"
                    >
                        Visit Project
                    </a>
                )}
            </div>
        </article>
    );
};

export default PaperWorkDetail;
