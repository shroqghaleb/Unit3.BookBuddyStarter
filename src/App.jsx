import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Account from './components/Account';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const {data} = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
      console.log(data);
      setBooks(data);
    }

    fetchBooks();
  }, []);

  // Home component to display books
  const Home = () => {
    return (
      <div className="books-container">
        <h1>Books {books.length}</h1>
        <ul className="books-list">
          {books.map((book) => {
            return (
              <li key={book.id}>{book.title}</li>
            )
          })}
        </ul>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <nav className="nav-container">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/account" className="nav-link">Account</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 

