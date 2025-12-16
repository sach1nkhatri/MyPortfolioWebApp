import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';
import '../css/paper.css';

const PaperBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const blogRef = ref(database, 'blogs');
        const unsubscribe = onValue(blogRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const blogArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key,
                }));
                const sorted = blogArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPosts(sorted);
            } else {
                setPosts([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <section className="paper-section" style={{ paddingBottom: '12px' }}>
                <div className="paper-hero-text" style={{ transform: 'rotate(-0.5deg)', margin: '0 12px' }}>
                    <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Notebook Blogs</h1>
                    <p>Hand-drawn stories, snapshots, and class notes—kept on a digital paper page.</p>
                </div>
            </section>

            <section className="paper-section">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="paper-grid">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default PaperBlog;
