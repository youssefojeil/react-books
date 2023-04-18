import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const { data } = await axios.get("http://localhost:3001/books");
    setBooks(data);
  };

  const createBook = async (title) => {
    console.log("Create a book with title:", title);

    const { data } = await axios.post("http://localhost:3001/books", {
      title,
    });
    // console.log(data);
    const updatedBooks = [...books, data];
    // console.log(updatedBooks);
    setBooks(updatedBooks);
  };

  const deleteBookbyId = async (id) => {
    await axios.delete("http://localhost:3001/books/" + id);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const { data } = await axios.put("http://localhost:3001/books/" + id, {
      title: newTitle,
    });
    console.log(data);

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...data };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookbyId} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
