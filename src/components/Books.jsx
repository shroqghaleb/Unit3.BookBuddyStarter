/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { Link } from 'react-router-dom';

const Books = ({ books }) => {
  return (
    <div className="books-container">
      <h1>Library Catalog</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>By: {book.author}</p>
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