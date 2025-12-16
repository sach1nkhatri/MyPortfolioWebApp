import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import Spinner from '../components/Spinner';
import WorkCard from '../components/WorkCard';
import '../css/paper.css';

const resumeLink = 'https://drive.google.com/file/d/19UsVQWL4nKQ5w7fC3sqDBfq4UG8CICRm/view?usp=sharing';
const profileImage = '/profileimage.jpg';

const PaperHome = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    const pickRandom = (data) => {
        if (!data || data.length === 0) return [];
        const clone = [...data];
        return clone.sort(() => 0.5 - Math.random()).slice(0, 4);
    };

    useEffect(() => {
        const workRef = ref(database, 'works');
        const unsubscribe = onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const workArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key,
                }));
                setWorks(pickRandom(workArray));
            } else {
                setWorks([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <section className="paper-hero">
                <div className="paper-hero-text">
                    <h1>Hi, I'm Sachin.</h1>
                    <p>
                        I live at the intersection of code, creativity, and intelligence. From playful UIs to
                        data-driven builds, I turn ideas into human-feeling products. This page is drawn to feel
                        like a notebook you can walk through.
                    </p>
                    <div className="paper-cta-row">
                        <a className="paper-cta" href={resumeLink} target="_blank" rel="noreferrer">Download My Resume</a>
                        <Link className="paper-cta alt" to="/blog">Read My Blog</Link>
                        <Link className="paper-cta" style={{ background: '#fff' }} to="/work">See My Work</Link>
                    </div>
                </div>
                <div className="paper-portrait">
                    <img src={profileImage} alt="Profile" />
                </div>
            </section>

            <section className="paper-section">
                <h2 className="paper-section-title">Featured Works</h2>
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

            <section className="paper-social">
                <h2 className="paper-section-title">Connect With Me On</h2>
                <div className="paper-social-icons">
                    <a href="https://www.instagram.com/your-profile" target="_blank" rel="noreferrer">ig</a>
                    <a href="https://github.com/sach1nkhatri" target="_blank" rel="noreferrer">gh</a>
                    <a href="https://www.youtube.com/@SachinKhatri" target="_blank" rel="noreferrer">yt</a>
                </div>
            </section>
        </>
    );
};

export default PaperHome;
