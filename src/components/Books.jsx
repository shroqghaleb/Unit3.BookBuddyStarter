/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div className="books-container">Loading...</div>;
  }

  if (error) {
    return <div className="books-container error">{error}</div>;
  }

  return (
    <div className="books-container">
      <h1>Library Catalog</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>By: {book.author}</p>
            <p className="availability">
              Status: {book.available ? 'Available' : 'Checked Out'}
            </p>
            <Link to={`/books/${book.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;