import { useState, useEffect } from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

 

/*function App() {
  const [token, setToken] = useState(null) */
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
  
  return (
    <div>
      <h1>Books {books.length}</h1>
  
      <ul>
        {
          books.map((book) => {
            return (
              <li key={book.id}>{book.title}</li>
            )
          } )
        }
      </ul>
  
    </div>
  )
  }


export default App 

