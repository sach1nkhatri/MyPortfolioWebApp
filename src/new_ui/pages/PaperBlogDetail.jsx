import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, runTransaction } from 'firebase/database';
import { database } from '../../firebase';
import Spinner from '../components/Spinner';
import '../css/paper.css';

const PaperBlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [loading, setLoading] = useState(true);
    const voteKey = `blog_vote_${id}`;

    useEffect(() => {
        const postRef = ref(database, `blogs/${id}`);
        const unsubscribe = onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPost(data);
                setLikes(data.likes || 0);
                setDislikes(data.dislikes || 0);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    const handleVote = (type) => {
        const userVote = sessionStorage.getItem(voteKey);
        if (userVote === type) return;

        const postRef = ref(database, `blogs/${id}`);
        runTransaction(postRef, (currentData) => {
            if (currentData) {
                currentData.likes = currentData.likes || 0;
                currentData.dislikes = currentData.dislikes || 0;

                if (userVote === 'like') currentData.likes--;
                if (userVote === 'dislike') currentData.dislikes--;

                if (type === 'like') currentData.likes++;
                if (type === 'dislike') currentData.dislikes++;

                sessionStorage.setItem(voteKey, type);
            }
            return currentData;
        });
    };

    if (loading) {
        return (
            <Spinner />
        );
    }

    if (!post) {
        return (
            <div className="paper-section">Post not found.</div>
        );
    }

    return (
        <section className="paper-detail">
            <div className="paper-detail-card">
                <img src={post.img} alt={post.title} />
                <h2 style={{ fontSize: '28px', marginTop: '4px' }}>{post.title}</h2>
                <div className="paper-meta">{post.date} • {post.category}</div>
                <p style={{ fontSize: '16px', lineHeight: 1.6 }}>{post.description}</p>
                <div className="paper-detail-actions">
                    <button className="paper-button" onClick={() => handleVote('like')}>👍 {likes}</button>
                    <button className="paper-button" onClick={() => handleVote('dislike')}>👎 {dislikes}</button>
                    {post.link && (
                        <a
                            href={post.link}
                            target="_blank"
                            rel="noreferrer"
                            className="paper-cta-link"
                        >
                            Link to Source
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PaperBlogDetail;
