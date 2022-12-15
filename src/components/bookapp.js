import { useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';

//==========================================================
//================== Props =================================
const Book = (props) => {

    //=====================================================
    //================ Edit Hook ============================
    const [edits, setEdits] = useState(false);

    //========================================================
    //================= Edit Function ========================
    const handleEdit = () => {
        setEdits(!edits);
    }

    //=============================================================
    //==============================================================
    return (
        <>
            <div>
                <img src={props.book.image} /> <br />
                <h3>{props.book.title}</h3>
                <h3>{props.book.author}</h3>
                <h3>{props.book.genre}</h3>
                <h3>{props.book.read}</h3>
                
                {/* bootstap / react buttons */}
                <Button variant="outline-primary" onClick={(event) => { props.handleDelete(props.book) }}>Delete</Button>
                <Button variant="outline-primary" onClick={handleEdit}>Edit</Button>

                {edits ?
                    <div>
                        {/* Edit your book form / shows when edit button is clicked */}
                        <h2>Edit Book</h2>
                        {/* handleEdit() allows the update book button to disappear after editing book */}
                        <form onSubmit={(event) => { event.preventDefault(); props.updateSubmit(props.book); handleEdit() }}>
                            Title: <input type="text" defaultValue={props.book.title} onChange={props.handleUpdateTitle} /><br />
                            Author: <input type="text" defaultValue={props.book.author} onChange={props.handleUpdateAuthor} /><br />
                            Genre: <input type="text" defaultValue={props.book.genre} onChange={props.handleUpdateGenre} /><br />
                            Image: <input type="text" defaultValue={props.book.image} onChange={props.handleUpdateImage} /><br />
                            Have you read this book?<input type="checkbox" defaultChecked={props.book.read} onChange={props.handleUpdateRead} /><br />
                            <Button variant="primary" size="sm" type="submit" value="Update Book">Update Book</Button>
                        </form>
                    </div>
                    // If book is not being updated, null will allow the edit section to be hidden
                    : null}
            </div>
        </>
    )
}

//========================================================
//========================================================
export default Book;
