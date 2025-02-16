import React, { useState, useEffect } from 'react';
import '../styles/Work.css';
import { ref, onValue } from 'firebase/database'; // Firebase Realtime Database functions
import { database } from '../firebase'; // Firebase configuration

function Work() {
    const [workData, setWorkData] = useState([]);

    // Function to fetch data from Firebase Realtime Database
    useEffect(() => {
        const workRef = ref(database, 'works'); // Reference to the 'works' node in Realtime Database

        onValue(workRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Transform the data into an array
                const workArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                setWorkData(workArray);
            } else {
                setWorkData([]); // If no data, set an empty array
            }
        });
    }, []);

    return (
        <div className="work">
            <h1>My Works</h1>
            <div className="featured-work-items">
                {workData.map((work, index) => (
                    <div className="work-item" key={work.id}>
                        <a href={work.link} target="_blank" rel="noopener noreferrer" className="work-link">
                            <img src={work.img} alt={work.title} />
                            <div className="work-info">
                                <h2>{work.title}</h2>
                                <div className="work-meta">
                                    <span className="year-tag">{work.year}</span>
                                    <span className="category">{work.category}</span>
                                </div>
                                <p>{work.description}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Work;
