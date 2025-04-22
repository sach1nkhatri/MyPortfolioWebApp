import React, { useState, useEffect } from 'react';
import '../styles/Blog.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { Link } from 'react-router-dom';

function Blog() {
    const [blogData, setBlogData] = useState([]);

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
        });
    }, []);

    return (
        <div className="blog">
            <h1>My Blogs</h1>
            <div className="blog-posts">
                {blogData.map((post) => (
                    <Link to={`/blog/${post.id}`} className="blog-post" key={post.id}>
                        <div className="blog-content">
                            <img src={post.img} alt={post.title} className="blog-image" />
                            <div className="blog-info">
                                <h2>{post.title}</h2>
                                <p>{post.date} | {post.category}</p>
                                <p>{post.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Blog;
