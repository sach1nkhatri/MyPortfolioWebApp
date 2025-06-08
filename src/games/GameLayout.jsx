import { Outlet } from 'react-router-dom';

const GameLayout = () => {
    return (
        <div style={{
            margin: 0,
            padding: 0,
            backgroundColor: '#0d1b2a',
            minHeight: '100vh',
            color: '#fff',
            fontFamily: 'Courier New, monospace',
            textAlign: 'center'
        }}>
            <Outlet />
        </div>
    );
};

export default GameLayout;
