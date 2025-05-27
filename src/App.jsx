import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigations from './components/Navigations';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <Navigations />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<SingleBook />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 

