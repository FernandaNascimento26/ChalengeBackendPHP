// resources/js/app.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Menu from './components/Menu';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Profile from './components/Profile';
import AdminPage from './components/AdminPage';
import ManagerPage from './components/ManagerPage';

import './styles/custom.css'; 

function App() {
  return (
    <Router>
      <UserProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/page1" element={<PrivateRoute><Page1 /></PrivateRoute>} />
          <Route path="/page2" element={<PrivateRoute><Page2 /></PrivateRoute>} />
          <Route path="/page3" element={<PrivateRoute><Page3 /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminPage /></PrivateRoute>} />
          <Route path="/manager" element={<PrivateRoute role="gestor"><ManagerPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
