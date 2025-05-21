/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setAccountData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  if (loading) {
    return <div className="account-container">Loading...</div>;
  }

  if (error) {
    return <div className="account-container">Error: {error}</div>;
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
      </div>
    </div>
  );
};

export default Account;