import React, { useState, useContext } from "react";
import BookEdit from "./BookEdit";
import BooksContext from "../context/books";

const BookShow = ({ book }) => {
  const { deleteBookById } = useContext(BooksContext);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => {
    deleteBookById(book.id);
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = () => {
    setShowEdit(false);
  };

  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  return (
    <div className="book-show">
      <img alt="books" src="https://picsum.photos/seed/300/200" />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookShow;
