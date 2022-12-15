import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './components/bookapp.js';

//===========================================================================
//========================= Boostrap Import ================================
import 'bootstrap/dist/css/bootstrap.min.css';
// buttons
import Button from 'react-bootstrap/Button';
// nav bar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// cards for books
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//===========================================================================
//============================= Hooks =======================================
const App = () => {
  // hook for title
  const [bookTitle, setBookTitle] = useState('');
  // hook for author
  const [bookAuthor, setBookAuthor] = useState('');
  // hook for genre
  const [bookGenre, setBookGenre] = useState('');
  // hook for image
  const [bookImage, setBookImage] = useState('');
  // hook for if the book has been read / default false
  const [bookRead, setBookRead] = useState(false);
  // book hook
  const [books, setBooks] = useState([]);

  //=====================================================================
  //=========================== Hooks for updating ======================
  // update title hook
  const [updateTitle, setUpdateTitle] = useState();
  // update author hook
  const [updateAuthor, setUpdateAuthor] = useState();
  // update genre hook
  const [updateGenre, setUpdateGenre] = useState();
  // update image hook
  const [updateImage, setUpdateImage] = useState();
  // update read/checked hook
  const [updateRead, setUpdateRead] = useState();

  //=========================================================================
  //==================== On Change Functions ================================
  // title change function
  const newTitleChange = (event) => {
    setBookTitle(event.target.value)
  }

  // author change function
  const newAuthorChange = (event) => {
    setBookAuthor(event.target.value)
  }

  // genre change function
  const newGenreChange = (event) => {
    setBookGenre(event.target.value)
  }

  // image change function
  const newImageChange = (event) => {
    setBookImage(event.target.value)
  }

  // read or not checkbox function

  // read or not checkbox function
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
  const handleUpdateAuthor = (event) => {
    setUpdateAuthor(event.target.value);
  }

  // update genre function
  const handleUpdateGenre = (event) => {
    setUpdateGenre(event.target.value)
  }

  // update image function
  const handleUpdateImage = (event) => {
    setUpdateImage(event.target.value)
  }

  // update read checkbox function
  const handleUpdateRead = (event) => {
    setUpdateRead(event.target.checked)
  }

  //===============================================================================
  //================================ Functions ====================================
  //submit form function
  const newBookFormSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
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

  //===================================================================
  //======================== Submit for Update =========================
  const updateSubmit = (bookData) => {
    axios.put(`https://murmuring-citadel-25803.herokuapp.com/books/${bookData._id}/edit`,
      {
        title: updateTitle,
        author: updateAuthor,
        genre: updateGenre,
        image: updateImage,
        read: updateRead
      }
    ).then(() => {
      axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
        setBooks(response.data)
      })
    })
  }

  //====================================================================
  //==================== Use Effect ====================================
  useEffect(() => {
    axios.get('https://murmuring-citadel-25803.herokuapp.com/books').then((response) => {
      setBooks(response.data)
    })
  }, [])

  //=========================================================================
  //=========================================================================
  return (
    <>
      <div>
        {/* nav bar bootstrap / react */}
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">BookTracker</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Books Read</Nav.Link>
              <Nav.Link href="#pricing">Have Not Read</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div>
        <h1>Book Tracker App</h1>
        <h3>Add A New Book</h3>
      </div>
      <section>
        {/* Create a book form at the top of the page */}
        <form onSubmit={newBookFormSubmit}>
          Title: <input type="text" onChange={newTitleChange} /><br />
          Author: <input type="text" onChange={newAuthorChange} /><br />
          Genre: <input type="text" onChange={newGenreChange} /><br />
          Image URL: <input type="text" onChange={newImageChange} /><br />
          Have you read this book? <input type="checkbox" onChange={newReadOrNotChange} /> Yes<br />
          {/* bootstrap / react button */}
          <Button variant="primary" size="lg" input type="submit" value="Submit Book">Submit Book</Button>
        </form>
      </section>

      {/* Show books section, books you have not read stay towards the top of the page */}
      <section>
        <h2 class="books">Books you have not read yet:</h2>
        <Row sm={1} md={3} className="g-4">
          {
            books.map((book, i) => {
              return (<>
                {book.read ?
                  null : <>
                    <div key={i}>
                      {Array.from({
                        length: 1
                      }).map((_, idx) => (
                        <Col>
                          <Card>
                            <Card.Body>
                              <Card.Text>
                                <Book key={i} book={book} updateSubmit={updateSubmit}
                                  handleUpdateTitle={handleUpdateTitle}
                                  handleUpdateAuthor={handleUpdateAuthor}
                                  handleUpdateGenre={handleUpdateGenre}
                                  handleUpdateImage={handleUpdateImage}
                                  handleUpdateRead={handleUpdateRead}
                                  handleDelete={handleDelete} />
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </div>
                  </>}
              </>
              )
            })
          }
        </Row>

        {/* Books you have read are moved to the bottom of the page */}
        <h2 class="books">Books you have read:</h2>
        <Row sm={1} md={3} className="g-4">
          {
            books.map((book, i) => {
              return (<>
                {!book.read ?
                  null : <>
                    <div key={i}>
                      {Array.from({
                        length: 1
                      }).map((_, idx) => (
                        <Col>
                          <Card>
                            <Card.Body>
                              <Card.Text>
                                <Book key={i} book={book} updateSubmit={updateSubmit}
                                  handleUpdateTitle={handleUpdateTitle}
                                  handleUpdateAuthor={handleUpdateAuthor}
                                  handleUpdateGenre={handleUpdateGenre}
                                  handleUpdateImage={handleUpdateImage}
                                  handleUpdateRead={handleUpdateRead}
                                  handleDelete={handleDelete} />
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </div>
                  </>}
              </>
              )
            })
          }
        </Row>
      </section>
    </>
  )
}

//================================================================================
//================================================================================
export default App;
