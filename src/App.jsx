import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Account from './components/Account';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Router>
      <div>
        <nav className="nav-container">
          <Link to="/books" className="nav-link">Books</Link>
          <Link to="/account" className="nav-link">Account</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Books books={books} />} />
            <Route path="/books" element={<Books books={books} />} />
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

