// src/components/ImmuneClashGame.jsx
import React, { useEffect } from 'react';

const ImmuneClashGame = () => {
    useEffect(() => {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = '/style.css';

        const script = document.createElement('script');
        script.src = '/game.js';
        script.async = true;

        document.head.appendChild(style);
        document.body.appendChild(script);

        return () => {
            document.head.removeChild(style);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <h1>🧬 Immune Clash</h1>
            <canvas id="gameCanvas" width="800" height="500"></canvas>
            <div id="gameOver" style={{ display: "none" }}>
                <h2>Game Over!</h2>
                <p id="finalScore"></p>
                <button onClick={() => window.restartGame()}>Restart</button>
            </div>
        </div>
    );
};

export default ImmuneClashGame;
