/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBook = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        setBook(data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <div className="book-info">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Status:</strong> {book.available ? 'Available' : 'Checked Out'}</p>
      </div>
    </div>
  );
};

export default SingleBook;