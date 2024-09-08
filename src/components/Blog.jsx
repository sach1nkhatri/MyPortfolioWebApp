import React from 'react';
import '../styles/Blog.css';
import { blogData } from '../data/blogData';

function Blog() {
    const sortedBlogData = blogData.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="blog">
            <h1>My Blogs</h1>
            <div className="blog-posts">
                {sortedBlogData.map((post, index) => (
                    <a href={post.link} className="blog-post" key={index} target="_blank" rel="noopener noreferrer">
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
