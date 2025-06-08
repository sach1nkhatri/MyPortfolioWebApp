import React, { useEffect } from 'react';
import './ImmuneClashGame.css';
import virus1 from './assets/virus1.png';
import virus2 from './assets/virus2.png';
import virus3 from './assets/virus3.png';
import virus4 from './assets/virus4.png';
import virus5 from './assets/virus5.png';
import WBC from './assets/WBC.png';

const ImmuneClash = () => {
    useEffect(() => {
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const virusImages = [virus1, virus2, virus3, virus4, virus5].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        const wbcImage = new Image();
        wbcImage.src = WBC;

        let player = { x: 50, y: 220, width: 50, height: 50, speed: 5 };
        let keys = {};
        let viruses = [];
        let score = 0;
        let highScore = 0;
        let virusSpeed = 2;
        let spawnInterval;
        let gameOver = false;

        const spawnVirus = () => {
            const imgIndex = Math.floor(Math.random() * virusImages.length);
            viruses.push({
                x: 800,
                y: Math.random() * 460,
                width: 40,
                height: 40,
                speed: virusSpeed,
                image: virusImages[imgIndex],
            });
        };

        const drawPlayer = () => {
            if (wbcImage.complete) {
                ctx.drawImage(wbcImage, player.x, player.y, player.width, player.height);
            }
        };

        const drawViruses = () => {
            for (let v of viruses) {
                if (v.image.complete) {
                    ctx.drawImage(v.image, v.x, v.y, v.width, v.height);
                }
            }
        };

        const updateViruses = () => {
            for (let i = viruses.length - 1; i >= 0; i--) {
                viruses[i].x -= viruses[i].speed;
                if (viruses[i].x + viruses[i].width < 0) {
                    endGame();
                    return;
                }

                if (
                    player.x < viruses[i].x + viruses[i].width &&
                    player.x + player.width > viruses[i].x &&
                    player.y < viruses[i].y + viruses[i].height &&
                    player.y + player.height > viruses[i].y
                ) {
                    viruses.splice(i, 1);
                    score++;
                    if (score % 30 === 0) virusSpeed += 0.5;
                }
            }
        };

        const drawScore = () => {
            ctx.fillStyle = "white";
            ctx.font = "20px monospace";
            ctx.fillText(`Eliminated: ${score} | High Score: ${highScore}`, 10, 20);
        };

        const movePlayer = () => {
            if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
            if (keys["ArrowDown"] && player.y < canvas.height - player.height) player.y += player.speed;
            if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
            if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;
        };

        const gameLoop = () => {
            if (gameOver) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            movePlayer();
            updateViruses();
            drawPlayer();
            drawViruses();
            drawScore();
            requestAnimationFrame(gameLoop);
        };

        const endGame = () => {
            gameOver = true;
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("finalScore").textContent = `Your Score: ${score}`;
            if (score > highScore) highScore = score;
            clearInterval(spawnInterval);
        };

        window.restartGame = () => {
            score = 0;
            virusSpeed = 2;
            viruses = [];
            gameOver = false;
            document.getElementById("gameOver").style.display = "none";
            spawnInterval = setInterval(spawnVirus, 1200);
            gameLoop();
        };

        const handleKeyDown = (e) => {
            const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (arrowKeys.includes(e.key)) e.preventDefault();
            keys[e.key] = true;
        };

        const handleKeyUp = (e) => {
            keys[e.key] = false;
        };

        document.addEventListener("keydown", handleKeyDown, { passive: false });
        document.addEventListener("keyup", handleKeyUp);
        spawnInterval = setInterval(spawnVirus, 1200);
        gameLoop();

        return () => {
            clearInterval(spawnInterval);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="immune-clash-wrapper">
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

export default ImmuneClash;
