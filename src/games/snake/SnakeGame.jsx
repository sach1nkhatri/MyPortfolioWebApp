import React, { useEffect, useRef, useState } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const scoreRef = useRef(null);
    const highScoreRef = useRef(null);
    const [gameOverVisible, setGameOverVisible] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 600;
        canvas.height = 600;

        const scale = 20;
        const rows = canvas.height / scale;
        const columns = canvas.width / scale;

        let snake = new Snake();
        let fruit = new Fruit();
        fruit.pickLocation();

        let score = 0;
        let highScore = 0;
        let gameOver = false;
        let speed = 100;

        const interval = setInterval(() => {
            if (!gameOver) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                fruit.update();
                fruit.draw();
                snake.update();
                snake.draw();

                if (snake.eat(fruit)) {
                    score++;
                    scoreRef.current.innerText = score;
                    if (score > highScore) {
                        highScore = score;
                        highScoreRef.current.innerText = highScore;
                    }
                    fruit.pickLocation();
                    speed -= 5;
                }

                snake.checkCollision();
                if (snake.hitSelf()) {
                    gameOver = true;
                    setGameOverVisible(true);
                }
            }
        }, speed);

        const handleKeyDown = (e) => {
            const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (keysToPrevent.includes(e.key)) {
                e.preventDefault();
            }
            const direction = e.key.replace('Arrow', '');
            snake.changeDirection(direction);
        };

        document.addEventListener('keydown', handleKeyDown, { passive: false });

        return () => {
            clearInterval(interval);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const resetGame = () => {
        window.location.reload(); // simplest reset for now
    };

    return (
        <div className="snake-game-wrapper">
            <div id="game-container">
                <h1>Snake Game</h1>
                <canvas id="gameCanvas" ref={canvasRef}></canvas>

                <div id="score-container">
                    <span>Score: <span ref={scoreRef}>0</span></span>
                    <br />
                    <span>High Score: <span ref={highScoreRef}>0</span></span>
                </div>

                {gameOverVisible && (
                    <div id="game-over">
                        <h1>Game Over!</h1>
                        <button id="restart-btn" onClick={resetGame}>Restart</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SnakeGame;

// ====================== CLASS OBJECTS ======================

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 20;
    this.ySpeed = 0;
    this.total = 1;
    this.tail = [];

    this.draw = function () {
        const ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.fillStyle = "#a9ed09";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.beginPath();
            ctx.arc(this.tail[i].x + 10, this.tail[i].y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = "#0fe5fc";
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 10, 0, Math.PI * 2);
        ctx.fill();
    };

    this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = { x: this.x, y: this.y };
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        const canvas = document.getElementById('gameCanvas');
        const scale = 20;
        if (this.x >= canvas.width) this.x = 0;
        if (this.y >= canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width - scale;
        if (this.y < 0) this.y = canvas.height - scale;
    };

    this.changeDirection = function (dir) {
        const scale = 20;
        if (dir === 'Up' && this.ySpeed === 0) {
            this.xSpeed = 0;
            this.ySpeed = -scale;
        } else if (dir === 'Down' && this.ySpeed === 0) {
            this.xSpeed = 0;
            this.ySpeed = scale;
        } else if (dir === 'Left' && this.xSpeed === 0) {
            this.xSpeed = -scale;
            this.ySpeed = 0;
        } else if (dir === 'Right' && this.xSpeed === 0) {
            this.xSpeed = scale;
            this.ySpeed = 0;
        }
    };

    this.eat = function (fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    };

    this.checkCollision = function () {
        // logic included in .hitSelf()
    };

    this.hitSelf = function () {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                return true;
            }
        }
        return false;
    };
}

function Fruit() {
    const canvas = document.getElementById('gameCanvas');
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    this.x = 0;
    this.y = 0;
    this.radius = scale / 2;
    this.breathingSpeed = 0.1;
    this.maxRadius = scale * 0.6;
    this.minRadius = scale / 3;
    this.increasing = true;

    this.pickLocation = function () {
        this.x = (Math.floor(Math.random() * columns)) * scale;
        this.y = (Math.floor(Math.random() * rows)) * scale;
    };

    this.update = function () {
        if (this.increasing) {
            this.radius += this.breathingSpeed;
            if (this.radius >= this.maxRadius) this.increasing = false;
        } else {
            this.radius -= this.breathingSpeed;
            if (this.radius <= this.minRadius) this.increasing = true;
        }
    };

    this.draw = function () {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#ff4136";
        ctx.beginPath();
        ctx.arc(this.x + scale / 2, this.y + scale / 2, this.radius, 0, Math.PI * 2);
        ctx.fill();
    };
}
