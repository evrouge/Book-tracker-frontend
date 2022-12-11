import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  //use state
  const [bookTitle, setBookTitle] = useState([]);
  const [bookAuthor, setBookAuthor] = useState([]);
  const [bookGenre, setBookGenre] = useState([]);
  const [bookImage, setBookImage] = useState([]);
  const [bookRead, setBookRead] = useState(false);
  const [books, setBooks] = useState([]);




  const newBookFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      'https://papaya-mochi-57fe5a.netlify.app', {
      title: bookTitle,
      author: bookAuthor,
      genre: bookGenre,
      image: bookImage,
      read: bookRead
    }
    ).then(() => {
      axios.get('https://papaya-mochi-57fe5a.netlify.app').then((response) => {
        setBooks(response.data)
      })
    })
  }

  //use effect
  useEffect(() => {
    axios.get('https://papaya-mochi-57fe5a.netlify.app').then((response) => {
      setBooks(response.data)
    })
  }, [])

  return (
    <>
      <h1>book tracker</h1>
      <h2>your books</h2>
      <form onSubmit={newBookFormSubmit}>
        Title: <input type="text" />
        <input type="submit" value="create book" />
      </form>
    </>
  )

}







export default App;
