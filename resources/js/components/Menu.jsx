
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../styles/custom.css'; 

const Menu = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUnauthorizedAccess = (e) => {
    e.preventDefault();
    navigate('/unauthorized');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        {!user && <li><Link to="/login">Login</Link></li>}
        {!user && <li><Link to="/register">Cadastro</Link></li>}
        {user && <li><Link to="/profile">Perfil</Link></li>}
        {user && <li><Link to="/page1">Página 1</Link></li>}
        {user && <li><Link to="/page2">Página 2</Link></li>}
        {user && <li><Link to="/page3">Página 3</Link></li>}
        {user && user.user_type === 'admin' ? (
          <li><Link to="/admin">Admin</Link></li>
        ) : (
          user && <li><a href="/unauthorized" onClick={handleUnauthorizedAccess}>Admin</a></li>
        )}
        {user && user.user_type === 'gestor' ? (
          <li><Link to="/manager">Gestor</Link></li>
        ) : (
          user && <li><a href="/unauthorized" onClick={handleUnauthorizedAccess}>Manager</a></li>
        )}
        {user && <li><button onClick={logout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Menu;
