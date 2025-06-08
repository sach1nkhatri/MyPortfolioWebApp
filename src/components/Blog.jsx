import React, { useState, useEffect } from 'react';
import '../styles/Blog.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Link } from 'react-router-dom';
import Spinner from './Spinner'; // Spinner component

function Blog() {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingImages, setLoadingImages] = useState({}); // ⬅️ Image loading states

    useEffect(() => {
        const blogRef = ref(database, 'blogs');
        onValue(blogRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const blogArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                const sortedBlogData = blogArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogData(sortedBlogData);
            } else {
                setBlogData([]);
            }
            setLoading(false);
        });
    }, []);

    const handleImageLoad = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: false }));
    };

    const handleImageStart = (id) => {
        setLoadingImages(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="blog">
            <h1>My Blogs</h1>

            {loading ? (
                <Spinner />
            ) : (
                <div className="blog-posts">
                    {blogData.map((post) => {
                        if (loadingImages[post.id] === undefined) {
                            handleImageStart(post.id);
                        }

                        return (
                            <Link to={`/blog/${post.id}`} className="blog-post" key={post.id}>
                                <div className="blog-content">
                                    <div className="image-container">
                                        {loadingImages[post.id] && <Spinner />}
                                        <img
                                            src={post.img}
                                            alt={post.title}
                                            className="blog-image"
                                            onLoad={() => handleImageLoad(post.id)}
                                            style={{ display: loadingImages[post.id] ? 'none' : 'block' }}
                                        />
                                    </div>
                                    <div className="blog-info">
                                        <h2>{post.title}</h2>
                                        <p>{post.date} | {post.category}</p>
                                        <p>{post.description}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Blog;
