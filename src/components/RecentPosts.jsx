import React from 'react';
import '../styles/RecentPosts.css';

function RecentPosts() {
    return (
        <section className="recent-posts">
            <h2>Recent Posts</h2>
            <div className="posts">
                <div className="post">
                    <h3>Making a design system from scratch</h3>
                    <p>12 Feb 2020 | Design, Pattern</p>
                </div>
                <div className="post">
                    <h3>Creating pixel perfect icons in Figma</h3>
                    <p>12 Feb 2020 | Figma, Icon Design</p>
                </div>
            </div>
        </section>
    );
}

export default RecentPosts;
