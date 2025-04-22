import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Blog.css';
import { ref, onValue, runTransaction } from 'firebase/database';
import { database } from '../firebase';

function DetailPreview() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const voteKey = `blog_vote_${id}`;

    useEffect(() => {
        const postRef = ref(database, `blogs/${id}`);
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPost(data);
                setLikes(data.likes || 0);
                setDislikes(data.dislikes || 0);
            }
        });
    }, [id]);

    const handleVote = (type) => {
        const userVote = sessionStorage.getItem(voteKey);
        if (userVote === type) return; // Already voted same

        const postRef = ref(database, `blogs/${id}`);

        runTransaction(postRef, (currentData) => {
            if (currentData) {
                // Initialize if undefined
                currentData.likes = currentData.likes || 0;
                currentData.dislikes = currentData.dislikes || 0;

                // Remove previous vote
                if (userVote === 'like') currentData.likes--;
                if (userVote === 'dislike') currentData.dislikes--;

                // Add new vote
                if (type === 'like') currentData.likes++;
                if (type === 'dislike') currentData.dislikes++;

                // Save new vote in session
                sessionStorage.setItem(voteKey, type);
            }
            return currentData;
        });
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="blog">
            <div className="blog-post" style={{ width: '100%' }}>
                <img src={post.img} alt={post.title} className="blog-image" />
                <div className="blog-info">
                    <h2>{post.title}</h2>
                    <p>{post.date} | {post.category}</p>
                    <p>{post.description}</p>
                    <div style={{ marginTop: '1rem' }}>
                        <button onClick={() => handleVote('like')} style={buttonStyle}>
                            👍 {likes}
                        </button>
                        <button onClick={() => handleVote('dislike')} style={{ ...buttonStyle, marginLeft: '1rem' }}>
                            👎 {dislikes}
                        </button>
                        {post.link && (
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    marginTop: '1rem',
                                    marginLeft: '1rem',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px'
                                }}
                            >
                                🔗 Link to Source
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#eee',
};

export default DetailPreview;
