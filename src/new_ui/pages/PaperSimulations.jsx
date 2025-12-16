import React from 'react';
import '../css/paper.css';

const PaperSimulations = () => {
    const simulations = [
        { title: 'Airplane Simulator', url: '/simulations/airplane.html', type: 'Simulation', summary: 'Pilot a stylized plane through a hand-drawn sky.' },
        { title: 'Fission Playground', url: '/simulations/fission.html', type: 'Simulation', summary: 'Split atoms on paper and watch the chain reactions.' },
        { title: 'Love Calculator', url: '/simulations/love-calculator.html', type: 'Simulation', summary: 'A playful compatibility sketch on notebook paper.' },
        { title: 'Particle Sandbox', url: '/simulations/particle.html', type: 'Simulation', summary: 'Toss particles and see the physics scribble around.' },
        { title: 'Science Lab', url: '/simulations/science-sim.html', type: 'Simulation', summary: 'Mini lab experiments in a sketchy interface.' },
        { title: 'Solar System', url: '/simulations/solar.html', type: 'Simulation', summary: 'Orbit a paper solar system with draggable planets.' },
    ];

    const arcades = [
        { title: 'Bike Race', url: '/simulations/games/bikerace.html', type: 'Arcade', summary: 'Race a bike through doodled tracks.' },
        { title: 'Maze Runner', url: '/simulations/games/maze.html', type: 'Arcade', summary: 'Navigate a maze etched on notebook lines.' },
    ];

    const reactGames = [
        { title: 'Immune Clash', url: '/games/immune-clash', type: 'React Game', summary: 'Defend the body using WBCs against virus invaders.' },
        { title: 'Snake', url: '/games/snake', type: 'React Game', summary: 'Classic snake on a sketchbook grid—don’t bite your tail.' },
    ];

    const renderCard = (item) => (
        <a
            key={item.title}
            className="paper-card paper-link paper-sim-card"
            href={item.url}
            target="_blank"
            rel="noreferrer"
        >
            <div className="paper-card-meta">
                <span className="paper-pill">{item.type}</span>
            </div>
            <h3 className="paper-card-title">{item.title}</h3>
            <p className="paper-card-body">{item.summary}</p>
            <span className="paper-see-more">Open in new tab →</span>
        </a>
    );

    return (
        <>
            <section className="paper-section" style={{ paddingBottom: '12px' }}>
                <div className="paper-hero-text" style={{ transform: 'rotate(-0.5deg)', margin: '0 12px' }}>
                    <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Simulations &amp; Games Arcade</h1>
                    <p>Paper-themed labs and arcades—launch any sketchy sim or mini-game in a fresh tab.</p>
                </div>
            </section>

            <section className="paper-section">
                <h2 className="paper-section-title">Simulations</h2>
                <div className="paper-grid">
                    {simulations.map(renderCard)}
                </div>
            </section>

            <section className="paper-section">
                <h2 className="paper-section-title">Arcade</h2>
                <div className="paper-grid">
                    {arcades.map(renderCard)}
                </div>
            </section>

            <section className="paper-section">
                <h2 className="paper-section-title">React Games</h2>
                <div className="paper-grid">
                    {reactGames.map(renderCard)}
                </div>
            </section>
        </>
    );
};

export default PaperSimulations;
