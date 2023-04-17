import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const createBook = (title) => {
    console.log("Create a book with title:", title);

    const updatedBooks = [
      ...books,
      {
        id: Math.round(Math.random() * 999),
        title: title,
      },
    ];

    setBooks(updatedBooks);
  };

  const deleteBookbyId = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBookById = (id, newTitle) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, title: newTitle };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <BookList books={books} onDelete={deleteBookbyId} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
