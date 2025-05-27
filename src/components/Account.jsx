/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Account() {
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccountData() {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

      
        const userResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const userData = await userResponse.json();
        
        // Fetch all books
        const booksResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const booksData = await booksResponse.json();
        
        // Filter books that are checked out by the current user
        const checkedOutBooks = booksData.filter(book => !book.available);
        
        setAccountData({
          ...userData,
          books: checkedOutBooks
        });
      } catch (err) {
        setError("Couldn't load account details");
      } finally {
        setLoading(false);
      }
    }

    fetchAccountData();
  }, []);

  if (loading) {
    return <div className="account-container">Loading...</div>;
  }

  if (error) {
    return <div className="account-container">{error}</div>;
  }

  if (!accountData) {
    return (
      <div className="account-container">
        <h2>Account Details</h2>
        <p>Please log in or create an account to view your account details.</p>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <div className="account-info">
        <p><strong>First Name:</strong> {accountData.firstname}</p>
        <p><strong>Last Name:</strong> {accountData.lastname}</p>
        <p><strong>Email:</strong> {accountData.email}</p>
        
        <h3>Checked Out Books</h3>
        {accountData.books && accountData.books.length > 0 ? (
          <div className="checked-out-books">
            {accountData.books.map((book) => (
              <div key={book.id} className="book-item">
                <img 
                  src={book.coverimage} 
                  alt={book.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover';
                  }}
                  className="book-cover"
                />
                <div className="book-details">
                  <h4>{book.title}</h4>
                  <p>By: {book.author}</p>
                  <p>Description: {book.description}</p>
                  <Link to={`/books/${book.id}`} className="view-details">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No books currently checked out.</p>
        )}
      </div>
    </div>
  );
}

export default Account;