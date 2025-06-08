import { Link } from 'react-router-dom';
import './css/game.css'; // Style from your existing shared css or specific landing one

const GamesLanding = () => {
    const games = [
        {
            title: '🧬 Immune Clash',
            path: '/games/immune-clash',
            description: 'Defend the body using WBCs against virus invaders.'
        },
        {
            title: '🐍 Snake Game',
            path: '/games/snake',
            description: 'Classic snake game — don’t eat yourself!'
        },
        // Add more games here
    ];

    return (
        <div className="games-wrapper">
            <h1 className="games-header">🎮 Developer Arcade</h1>
            <p className="games-subtext">Fun browser-based games built by Sachin Khatri.</p>
            <div className="games-grid">
                {games.map((game, idx) => (
                    <a
                        key={idx}
                        href={game.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="game-card"
                    >
                        <h3>{game.title}</h3>
                        <p>{game.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default GamesLanding;
