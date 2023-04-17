import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBook = async () => {
    const { data } = await axios.get("http://localhost:3001/books");
    setBooks(data);
  };

  const createBook = async (title) => {
    console.log("Create a book with title:", title);

    const { data } = await axios.post("http://localhost:3001/books", {
      title,
    });
    console.log(data);
    const updatedBooks = [...books, data];
    console.log(updatedBooks);
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
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookbyId} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
