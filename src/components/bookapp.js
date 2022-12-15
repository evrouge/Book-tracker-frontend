import { useState } from 'react';
import '../App.css';
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
                <button onClick={(event) => { props.handleDelete(props.book) }}>Delete</button>
                <button onClick={handleEdit}>Edit</button>

                {edits ?
                    <div>
                        <h2>Edit Book</h2>
                        <form onSubmit={(event) => { event.preventDefault(); props.updateSubmit(props.book); handleEdit() }}>
                            Title: <input type="text" defaultValue={props.book.title} onChange={props.handleUpdateTitle} /><br />
                            Author: <input type="text" defaultValue={props.book.author} onChange={props.handleUpdateAuthor} /><br />
                            Genre: <input type="text" defaultValue={props.book.genre} onChange={props.handleUpdateGenre} /><br />
                            Image: <input type="text" defaultValue={props.book.image} onChange={props.handleUpdateImage} /><br />
                            Have you read this book?<input type="checkbox" defaultChecked={props.book.read} onChange={props.handleUpdateRead} /><br />
                            <input type="submit" value="Update Book" />
                        </form>
                    </div>
                    : null}
            </div>
        </>
    )
}

//========================================================
//========================================================
export default Book;
