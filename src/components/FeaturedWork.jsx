import React, { useState, useEffect } from 'react';
import '../styles/FeaturedWork.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ref, onValue } from 'firebase/database'; // Firebase Realtime Database functions
import { database } from '../firebase'; // Firebase configuration

function FeaturedWork() {
    const [workData, setWorkData] = useState([]);

    // Function to shuffle array and get 4 random works
    const getRandomWorks = (data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4); // Select first 4 after shuffle
    };

    // Fetch data from Firebase
    useEffect(() => {
        const workRef = ref(database, 'works'); // Reference to the 'works' node in Realtime Database

        onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array
                const workArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                // Shuffle the array and set state with 4 random works
                setWorkData(getRandomWorks(workArray));
            } else {
                setWorkData([]); // Set empty array if no data
            }
        });
    }, []);

    return (
        <div className="featured-work-section">
            <h2>Featured Works</h2>
            <div className="featured-work-items">
                {workData.map((work, index) => (
                    <Link to={work.link} key={work.id} className="work-item">
                        <img src={work.img} alt={work.title} />
                        <div className="work-info">
                            <h3>{work.title}</h3>
                            <div className="work-meta">
                                <span className="year-tag">{work.year}</span>
                                <span className="category">{work.category}</span>
                            </div>
                            <p>{work.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FeaturedWork;
