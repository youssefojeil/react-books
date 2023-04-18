import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
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

    const updatedBooks = [...books, data];

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

  const valuesToShare = {
    books: books,
    deleteBookById: deleteBookbyId,
    editBookById,
    createBook,
    fetchBooks,
  };
  return (
    <BooksContext.Provider value={valuesToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
