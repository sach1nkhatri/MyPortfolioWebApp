import React from 'react';
import { Link } from 'react-router-dom';
import '../css/paper.css';

const PostCard = ({ post }) => {
    return (
        <Link to={`/blog/${post.id}`} className="paper-card paper-link">
            <img src={post.img} alt={post.title} className="paper-card-image" />
            <h3 className="paper-card-title">{post.title}</h3>
            <div className="paper-card-meta">{post.date} • {post.category}</div>
            <p className="paper-card-body">{post.description}</p>
        </Link>
    );
};

export default PostCard;
