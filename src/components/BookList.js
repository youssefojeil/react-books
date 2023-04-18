import React, { useContext } from "react";
import BookShow from "./BookShow";
import BooksContext from "../context/books";

const BookList = () => {
  const { books } = useContext(BooksContext);
  console.log(books);

  const renderedBooks = books.map((book) => {
    console.log(book);
    return <BookShow key={book.id} book={book} />;
  });

  return <div className="book-list">{renderedBooks}</div>;
};

export default BookList;
