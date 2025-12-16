import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import PaperLayout from './PaperLayout';
import Spinner from '../../components/Spinner';
import { homeData } from '../../data/HomeData';
import { database } from '../../firebase';
import instagramIcon from '../../assets/instagram.png';
import githubIcon from '../../assets/github.png';
import youtubeIcon from '../../assets/youtube.png';

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
        onValue(workRef, (snapshot) => {
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
    }, []);

    return (
        <PaperLayout>
            <section className="paper-hero">
                <div className="paper-hero-text">
                    <h1>{homeData.intro.title}</h1>
                    <p>{homeData.intro.description}</p>
                    <div className="paper-cta-row">
                        <a className="paper-cta" href={homeData.intro.resumeLink} target="_blank" rel="noreferrer">
                            Download My Resume
                        </a>
                        <Link className="paper-cta alt" to="/blog">Read My Blog</Link>
                        <Link className="paper-cta" style={{ background: '#fff' }} to="/work">See My Work</Link>
                    </div>
                </div>
                <div className="paper-portrait">
                    <img src={homeData.profileImage} alt="Profile" />
                </div>
            </section>

            <section className="paper-section">
                <h2 className="paper-section-title">Featured Works (sketched)</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="paper-grid">
                        {works.map((work) => (
                            <Link to={`/work/${work.id}`} key={work.id} className="paper-card">
                                <div className="paper-thumb">
                                    {work.category || 'Work'}
                                </div>
                                <h4>{work.title}</h4>
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

            <section className="paper-social">
                <h2 className="paper-section-title">Connect With Me On</h2>
                <div className="paper-social-icons">
                    <a href="https://www.instagram.com/your-profile" target="_blank" rel="noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://github.com/sach1nkhatri" target="_blank" rel="noreferrer">
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                    <a href="https://www.youtube.com/@SachinKhatri" target="_blank" rel="noreferrer">
                        <img src={youtubeIcon} alt="YouTube" />
                    </a>
                </div>
            </section>
        </PaperLayout>
    );
};

export default PaperHome;
