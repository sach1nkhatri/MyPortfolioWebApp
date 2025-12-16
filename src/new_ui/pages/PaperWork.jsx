import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import Spinner from '../components/Spinner';
import WorkCard from '../components/WorkCard';
import '../css/paper.css';

const PaperWork = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const workRef = ref(database, 'works');
        const unsubscribe = onValue(workRef, (snapshot) => {
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

        return () => unsubscribe();
    }, []);

    return (
        <>
            <section className="paper-section" style={{ paddingBottom: '12px' }}>
                <div className="paper-hero-text" style={{ transform: 'rotate(-0.5deg)', margin: '0 12px' }}>
                    <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Works</h1>
                    <p>Products and experiments built with React, Node, Flask, Dart, and more—real, usable builds with some personality.</p>
                </div>
            </section>

            <section className="paper-section">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="paper-grid">
                        {works.map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default PaperWork;
