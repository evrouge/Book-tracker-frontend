import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './components/bookapp';
//===========================================================================
//============================= Hooks =======================================
const App = () => {
  //hook for title
  const [bookTitle, setBookTitle] = useState('');
  //hook for author
  const [bookAuthor, setBookAuthor] = useState('');
  //hook for genre
  const [bookGenre, setBookGenre] = useState('');
  //hook for image
  const [bookImage, setBookImage] = useState('');
  //hook for if the book has been read / default false
  const [bookRead, setBookRead] = useState(false);
  //another hook
  const [books, setBooks] = useState([]);
  //================================= Hooks for updating =========================
  //==============================================================================
  //update title hook
  const [updateTitle, setUpdateTitle] = useState();
  //update author hook
  const [updateAuthor, setUpdateAuthor] = useState();
  //update genre hook
  const [updateGenre, setUpdateGenre] = useState();
  //update image hook
  const [updateImage, setUpdateImage] = useState();
  //update read/checked hook
  const [updateRead, setUpdateRead] = useState();

  //===============================================================================
  //================================ Functions ====================================
  //submit form function
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

  //=========================================================================
  //========================= Update functions ==============================
  // update title function
  const handleUpdateTitle = (event) => {
    setUpdateTitle(event.target.value);
  }

  // update author function


  // update genre function


  // update image function


  // update read checkbox function


  //====================================================================
  //==================== Use Effect ====================================
  useEffect(() => {
    axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
      setBooks(response.data)
    })
  }, [])

  //=====================================================================
  //================================= Delete ============================
  const handleDelete = (bookData) => {
    axios.delete(`https://murmuring-citadel-25803.herokuapp.com/books/${bookData._id}`)
      .then(() => {
        axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
          setBooks(response.data)
        })
      })
  }

  //====================================================================
  //=============================== Read Toggle ========================
  const handleToggleRead = (bookData) => {
    axios.put(`https://murmuring-citadel-25803.herokuapp.com/books/${bookData._id}`,
      {
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        image: bookData.image,
        read: !bookData.read
      }).then(() => {
        axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
          setBooks(response.data)
        })
      })
  }

  //=========================================================================
  //=========================================================================
  return (
    <>
      <h1>Book Tracker App</h1>
      <h2>Add A New Book</h2>
      <section>
        {/* Create section */}
        <form onSubmit={newBookFormSubmit}>
          Title: <input type="text" onChange={newTitleChange} /><br />
          Author: <input type="text" onChange={newAuthorChange} /><br />
          Genre: <input type="text" onChange={newGenreChange} /><br />
          Image URL: <input type="text" onChange={newImageChange} /><br />
          Have you read this book? <input type="checkbox" onChange={newReadOrNotChange} /> Yes<br />
          <input type="submit" value="Submit Book" />
        </form>
      </section>
      {/* Show section */}
      <section>
        <h3>Books you have not read yet:</h3>
        <ul>
          {
            books.map((book) => {
              return <li onClick={(event) => {
                handleToggleRead(book)
              }}> {
                  (book.read) ?
                    <><strike>{book.title}</strike></> : <>{book.title}</>
                } <br />
                {book.author}<br />
                {book.genre}<br />
                <img src={book.image} /> <br />
                <button onClick={(event) => {
                  handleDelete(book)
                }}>Delete</button>
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
