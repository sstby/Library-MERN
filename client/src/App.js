import React, { useState, useEffect } from "react";
import Axios from "axios";
import DataTable from "./Components/DataTable/DataTable";

const URL = "http://localhost:3001";

const App = () => {
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    Axios.get(`${URL}/get-all-books`).then((response) => {
      setBooks(response.data);
    });
    Axios.get(`${URL}/get-all-clients`).then((response) => {
      setClients(response.data);
    });
  }, []);

  const getFormatedDate = (day) => {
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  };

  const addCollection = (location) => {
    /* Axios.post(`${URL}/insert`, {
      data: {
        bookTitle: "Гарри Поттер и философский камень",
        bookGenre: "Приключения",
        bookAuthor: "Джоан Роулинг",
        bookPublishing: "Махаон",
        bookSector: "Детские",
      },
    }); */
    const date = new Date();
    let dateDeathline = new Date(date);
    dateDeathline.setDate(dateDeathline.getDate() + 30);
    console.log(getFormatedDate(date));
    console.log(getFormatedDate(dateDeathline));
    Axios.post(`${URL}/insert-client`, {
      data: {
        firstName: "John",
        lastName: "Doe",
        borrowedBooks: {
          bookName: "Гарри Поттер и философский камень",
          borrowDate: getFormatedDate(date),
          borrowDeathline: getFormatedDate(dateDeathline),
          isBack: false,
        },
      },
    });
  };

  const handleAddCollection = (value, db) => {
    const entry = {
      data: {
        bookTitle: value.Title,
        bookAuthor: value.Author,
        bookGenre: value.Genre,
        bookSector: value.Sector,
        bookPublishing: value.Publishing,
      },
    };
    Axios.post(`${URL}/insert-${db}`, entry);
    setBooks([...books, entry.data]);
  };

  const handleUpdateCollection = (value, db) => {
    const entry = {
      bookTitle: value.bookTitle,
      bookAuthor: value.bookAuthor,
      bookGenre: value.bookGenre,
      bookSector: value.bookSector,
      bookPublishing: value.bookPublishing,
    };
    const id = value._id;
    Axios.put(`${URL}/update-${db}`, { data: entry, id });
    const updatedBooks = books.slice();
    for (let book of updatedBooks) {
      if (book._id === id) {
        for (let field of Object.keys(entry)) {
          book[field] = entry[field];
        }
      }
    }
    setBooks(updatedBooks);
  };

  return (
    <div className="container">
      <DataTable
        data={books}
        handleAddCollection={handleAddCollection}
        handleUpdateCollection={handleUpdateCollection}
      />
      {/* <button className="btn btn-primary" onClick={() => addCollection("book")}>
        Temp
      </button> */}
    </div>
  );
};

export default App;
