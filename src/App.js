import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

//===========================================================================
//============================= Hooks ===================================
const App = () => {
  //hook for title
  const [bookTitle, setBookTitle] = useState("");
  //hook for author
  const [bookAuthor, setBookAuthor] = useState("");
  //hook for genre
  const [bookGenre, setBookGenre] = useState("");
  //hook for image
  const [bookImage, setBookImage] = useState("");
  //hook for if the book has been read / default false
  const [bookRead, setBookRead] = useState(false);
  //another hook
  const [books, setBooks] = useState([]);

  //===============================================================================
  //================================ Functions ====================================
  //submit form button function
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

  //title change function
  const newTitleChange = (event) => {
    setBookTitle(event.target.value)
  }

  //author change function
  const newAuthorChange = (event) => {
    setBookAuthor(event.target.value)
  }

  //genre change function
  const newGenreChange = (event) => {
    setBookGenre(event.target.value)
  }

  //image change function
  const newImageChange = (event) => {
    setBookImage(event.target.value)
  }

  //read or not checkbox function
  const newReadOrNotChange = (event) => {
    setBookRead(event.target.checked)
  }

  //====================================================================
  //==================== use effect ====================================
  useEffect(() => {
    axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
      setBooks(response.data)
    })
  }, [])

  //====================================================================
  //=============================== Read Toggle ========================
  const handleToggleRead = (bookData) => {
    axios.put(`https://murmuring-citadel-25803.herokuapp.com/books/${bookData._id}`,
      {
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        image: bookData.image,
        read: bookData.read
      })
  }

  //=========================================================================
  //=========================================================================
  return (
    <>
      <h1>Book Tracker App</h1>
      <h2>Your Books</h2>
      <section>
        <form onSubmit={newBookFormSubmit}>
          Title: <input type="text" onChange={newTitleChange} /><br />
          Author: <input type="text" onChange={newAuthorChange} /><br />
          Genre: <input type="text" onChange={newGenreChange} /><br />
          Image URL: <input type="text" onChange={newImageChange} /><br />
          Have you read this book? <input type="checkbox" onChange={newReadOrNotChange} /> Yes<br />
          <input type="submit" value="Submit Book" />
        </form>
      </section>
      <section>
        <h3>Books you have not read yet:</h3>
        <ul>
          {
            books.map((book) => {
              return <li onClick={(event) => {
                handleToggleRead(book)
              }}>

              </li>
            })
          }
        </ul>
        <h3>Books you have read:</h3>
      </section>
    </>
  )
}

//================================================================================
//================================================================================
export default App;
