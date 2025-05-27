/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleBook = () => {
  const [book, setBook] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        setBook(data);
      } catch (error) {
        setError('Failed to fetch book details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!book.available) {
      setError('This book is not available for checkout.');
      return;
    }

    try {
      setIsCheckingOut(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
        { available: false },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const { data } = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
      setBook(data);
      alert('Book checked out successfully!');
      navigate('/account');
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Failed to checkout book. Please try again.'
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleReturn = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setIsCheckingOut(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
        { available: true },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const { data } = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
      setBook(data);
      alert('Book returned successfully!');
      navigate('/account');
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Failed to return book. Please try again.'
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (!book) {
    return <div className="error-message">Book not found</div>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="book-info">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Status:</strong> {book.available ? 'Available' : 'Checked Out'}</p>
        
        {isAuthenticated ? (
          book.available ? (
            <button 
              onClick={handleCheckout} 
              className="checkout-button"
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Checking out...' : 'Checkout Book'}
            </button>
          ) : (
            <button 
              onClick={handleReturn} 
              className="return-button"
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Returning...' : 'Return Book'}
            </button>
          )
        ) : (
          <div className="auth-message">
            <p>Please <button onClick={() => navigate('/login')} className="login-link">log in</button> to checkout or return books.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBook;