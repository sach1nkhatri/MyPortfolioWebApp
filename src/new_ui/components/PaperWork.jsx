import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import PaperLayout from './PaperLayout';
import Spinner from '../../components/Spinner';
import { database } from '../../firebase';
import '../css/paper.css';

const PaperWork = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const workRef = ref(database, 'works');
        onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const workArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key,
                }));
                setWorks(workArray);
            } else {
                setWorks([]);
            }
            setLoading(false);
        });
    }, []);

    return (
        <PaperLayout>
            <section className="paper-section" style={{ paddingBottom: '12px' }}>
                <div className="paper-hero-text" style={{ transform: 'rotate(-0.5deg)', margin: '0 12px' }}>
                    <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Sketchbook Works</h1>
                    <p>Projects penciled into a digital notebook—playful, imperfect, and human.</p>
                </div>
            </section>

            <section className="paper-section">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="paper-grid">
                        {works.map((work) => (
                            <Link key={work.id} to={`/work/${work.id}`} className="paper-card">
                                <img src={work.img} alt={work.title} />
                                <h3>{work.title}</h3>
                                <div className="paper-meta">{work.year} • {work.category}</div>
                                <p>{work.description}</p>
                                {work.technologies && (
                                    <div className="paper-tags">
                                        {work.technologies.map((tech, idx) => (
                                            <span key={idx} className="paper-tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </PaperLayout>
    );
};

export default PaperWork;
