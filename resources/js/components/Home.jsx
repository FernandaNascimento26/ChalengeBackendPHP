import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import '../styles/custom.css';

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="home-container">
            {user ? (
                <h1>Bem-vindo, {user.name || user.email}!</h1>
            ) : (
                <h1>Você não está logado</h1>
            )}
        </div>
    );
};

export default Home;
