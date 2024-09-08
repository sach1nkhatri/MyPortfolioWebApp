import React from 'react';
import '../styles/Home.css';
import FeaturedWork from './FeaturedWork';
import { homeData } from '../data/HomeData'; // Import the data class

// Import images
import instagramIcon from '../assets/instagram.png';
import githubIcon from '../assets/github.png';
import youtubeIcon from '../assets/youtube.png';

function Home() {
    return (
        <div className="home">
            {/* Combined Intro Section with Image */}
            <section className="intro">
                <div className="intro-text">
                    <h1>{homeData.intro.title}</h1>
                    <p>{homeData.intro.description}</p>
                    <a href={homeData.intro.resumeLink} download={homeData.intro.resumeName}>
                        <button>Download My Resume</button>
                    </a>
                </div>
                <div className="intro-image">
                    <img src={homeData.profileImage} alt="Profile" />
                </div>
            </section>

            <section className="featured-work">
                <FeaturedWork />
            </section>

            <section className="social-link">
                <h1>Connect With Me On</h1>
                <div className="social-links">
                    <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://github.com/sach1nkhatri" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                    <a href="https://www.youtube.com/@SachinKhatri" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="YouTube" />
                    </a>
                </div>
            </section>
        </div>
    );
}

export default Home;
