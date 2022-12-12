import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

//===========================================================================
//============================= Use State ===================================
const App = () => {
  //use state for title
  const [bookTitle, setBookTitle] = useState([]);
  //use state for author
  const [bookAuthor, setBookAuthor] = useState([]);
  //use state for genre
  const [bookGenre, setBookGenre] = useState([]);
  //use state for image
  const [bookImage, setBookImage] = useState([]);
  //use state for if the book has been read / default false
  const [bookRead, setBookRead] = useState(false);
  //another hook
  const [books, setBooks] = useState([]);

  //===============================================================================
  //================================ Functions ====================================
  const newBookFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      'https://murmuring-citadel-25803.herokuapp.com/books', {
      title: bookTitle,
      author: bookAuthor,
      genre: bookGenre,
      image: bookImage,
      read: bookRead
    }
    ).then(() => {
      axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
        setBooks(response.data)
      })
    })
  }

  //====================================================================
  //==================== use effect ====================================
  useEffect(() => {
    axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
      setBooks(response.data)
    })
  }, [])

  //=========================================================================
  //=========================================================================
  return (
    <>
      <h1>Book Tracker App</h1>
      <h2>Your Books</h2>
      <h3>Books you have not read yet:</h3>
      <form onSubmit={newBookFormSubmit}>
        Title: <input type="text" /><br />
        Author: <input type="text" /><br />
        Genre: <input type="text" /><br />
        Image URL: <input type="text" /><br />
        Have you read this book? <input type="checkbox" /> Yes<br />
        <input type="submit" value="Submit Book" />
      </form>
      <h3>Books you have read:</h3>
    </>
  )
}

//================================================================================
//================================================================================
export default App;
