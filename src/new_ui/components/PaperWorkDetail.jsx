import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import PaperLayout from './PaperLayout';
import Spinner from '../../components/Spinner';
import { database } from '../../firebase';
import '../css/paper.css';

const PaperWorkDetail = () => {
    const { id } = useParams();
    const [work, setWork] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const workRef = ref(database, `works/${id}`);
        onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setWork(data);
            }
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <PaperLayout>
                <Spinner />
            </PaperLayout>
        );
    }

    if (!work) {
        return (
            <PaperLayout>
                <div className="paper-section">Work not found.</div>
            </PaperLayout>
        );
    }

    return (
        <PaperLayout>
            <section className="paper-detail">
                <div className="paper-detail-card">
                    <img src={work.img} alt={work.title} />
                    <h2 style={{ fontSize: '28px', marginTop: '4px' }}>{work.title}</h2>
                    <div className="paper-meta">{work.year} • {work.category}</div>
                    <p style={{ fontSize: '16px', lineHeight: 1.6 }}>{work.description}</p>
                    {work.technologies && (
                        <div className="paper-tags">
                            {work.technologies.map((tech, idx) => (
                                <span key={idx} className="paper-tag">{tech}</span>
                            ))}
                        </div>
                    )}
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
                </div>
            </section>
        </PaperLayout>
    );
};

export default PaperWorkDetail;
