import { Routes, Route } from 'react-router-dom';
import GamesLanding from './GamesLanding';
import ImmuneClash from './immuneClash/ImmuneClashGame';
import SnakeGame from './snake/SnakeGame'; // if this exists

const GameApp = () => {
    return (
        <Routes>
            <Route path="/" element={<GamesLanding />} />
            <Route path="immune-clash" element={<ImmuneClash />} />
            <Route path="snake" element={<SnakeGame />} />
        </Routes>
    );
};

export default GameApp;
