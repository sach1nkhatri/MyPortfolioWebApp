import React, { useState, useEffect } from 'react';
import '../styles/Blog.css';
import { ref, onValue } from 'firebase/database'; // Firebase Realtime Database functions
import { database } from '../firebase'; // Firebase configuration

function Blog() {
    const [blogData, setBlogData] = useState([]);

    // Function to fetch data from Firebase Realtime Database
    useEffect(() => {
        const blogRef = ref(database, 'blogs'); // Reference to the 'blogs' node in Realtime Database

        onValue(blogRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Transform the data into an array
                const blogArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                // Sort blog data by date
                const sortedBlogData = blogArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogData(sortedBlogData);
            } else {
                setBlogData([]); // If no data, set an empty array
            }
        });
    }, []);

    return (
        <div className="blog">
            <h1>My Blogs</h1>
            <div className="blog-posts">
                {blogData.map((post, index) => (
                    <a href={post.link} className="blog-post" key={post.id} target="_blank" rel="noopener noreferrer">
                        <div className="blog-content">
                            <img src={post.img} alt={post.title} className="blog-image" />
                            <div className="blog-info">
                                <h2>{post.title}</h2>
                                <p>{post.date} | {post.category}</p>
                                <p>{post.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Blog;
