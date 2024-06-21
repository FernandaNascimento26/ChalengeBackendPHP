import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/custom.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('common_user');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    console.log('User Type selected:', userType); 

    try {
      
      const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token 
        },
        body: JSON.stringify({ name, email, password, user_type: userType }),
        credentials: 'include', 
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate('/login');
      } else {
        setError(data.errors);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <h2>Cadastro</h2>
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{JSON.stringify(error)}</p>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userType" className="form-label">Tipo de usuário</label>
          <select
            className="form-control"
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="gestor">Gestor</option>
            <option value="common_user">Usuario Comum</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
