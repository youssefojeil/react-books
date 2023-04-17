import React from "react";
import BookShow from "./BookShow";

const BookList = ({ books, onDelete, onEdit }) => {
  console.log(books);
  const renderedBooks = books.map((book) => {
    console.log(book);
    return (
      <BookShow key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
    );
  });
  return <div className="book-list">{renderedBooks}</div>;
};

export default BookList;
