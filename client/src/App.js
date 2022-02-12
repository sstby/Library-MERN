import React, { useState, useEffect } from "react";
import { selectData, sortData } from "./functions";
import Axios from "axios";
import DataTable from "./Components/DataTable/DataTable";

const URL = "http://localhost:3001";
const BOOKS_HEADERS = ["Title", "Author", "Genre", "Sector", "Publishing"];
const CLIENTS_HEADERS = [
  "FirstName",
  "LastName",
  "BorrowedBook",
  "BorrowDate",
  "BorrowDeathline",
  "BorrowReturned",
];

const App = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientSearch, setClientSearch] = useState({});
  const [selectedClients, setSelectedClients] = useState([]);
  const [clientSort, setClientSort] = useState({
    field: null,
    reversed: false,
  });

  const [books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [bookSort, setBookSort] = useState({
    field: null,
    reversed: false,
  });

  //Затянуть данные из бд
  const getData = async () => {
    Axios.get(`${URL}/get-all-books`).then((response) => {
      setBooks(response.data);
    });
    Axios.get(`${URL}/get-all-clients`).then((response) => {
      setClients(response.data);
    });
  };

  //Затянуть данные из бд при первом запуске
  useEffect(() => {
    getData();
  }, []);

  //Затянуть данные из бд при её обновлении
  useEffect(() => {
    if (isUpdated) {
      setTimeout(getData, 100);
      setIsUpdated(false);
    }
  }, [isUpdated]);

  //Поиск книг
  useEffect(() => {
    if (Object.keys(bookSearch).length !== 0) {
      const result = selectData(bookSearch, books);
      if (result) {
        setSelectedBooks(result);
      } else {
        let res = {};
        for (let key of Object.keys(books[0])) {
          res = {
            ...res,
            [key]: null,
          };
        }
        setSelectedBooks([res]);
      }
    } else setSelectedBooks(books);
  }, [bookSearch, books]);

  //Поиск клиентов
  useEffect(() => {
    if (Object.keys(clientSearch).length !== 0) {
      const result = selectData(clientSearch, clients);
      if (result) {
        setSelectedClients(result);
      } else {
        let res = {};
        for (let key of Object.keys(clients[0])) {
          res = {
            ...res,
            [key]: null,
          };
        }
        setSelectedClients([res]);
      }
    } else setSelectedClients(clients);
  }, [clientSearch, clients]);

  //Сортировка книг
  useEffect(() => {
    if (bookSort.field !== null) {
      setBooks((books) => sortData(bookSort, books));
    }
  }, [bookSort]);

  //Сортировка клиентов
  useEffect(() => {
    if (clientSort.field !== null) {
      setClients((clients) => sortData(clientSort, clients));
    }
  }, [clientSort]);

  const handleAddBook = (value) => {
    const entry = {
      data: {
        bookTitle: value.Title,
        bookAuthor: value.Author,
        bookGenre: value.Genre,
        bookSector: value.Sector,
        bookPublishing: value.Publishing,
      },
    };
    Axios.post(`${URL}/insert-book`, entry);
    setIsUpdated(true);
  };

  const handleAddClient = (value) => {
    const entry = {
      data: {
        clientFirstName: value.FirstName,
        clientLastName: value.LastName,
        clientBorrowedBook: value.BorrowedBook,
        clientBorrowDate: value.BorrowDate,
        clientBorrowDeathline: value.BorrowDeathline,
        clientBorrowReturned: value.BorrowReturned,
      },
    };
    Axios.post(`${URL}/insert-client`, entry);
    setIsUpdated(true);
  };

  const handleUpdateBook = (value) => {
    const entry = {
      bookTitle: value.bookTitle,
      bookAuthor: value.bookAuthor,
      bookGenre: value.bookGenre,
      bookSector: value.bookSector,
      bookPublishing: value.bookPublishing,
    };
    const id = value._id;
    Axios.put(`${URL}/update-book`, { data: entry, id });
    setIsUpdated(true);
  };

  const handleUpdateClient = (value) => {
    console.log(value);
    const entry = {
      clientFirstName: value.clientFirstName,
      clientLastName: value.clientLastName,
      clientBorrowedBook: value.clientBorrowedBook,
      clientBorrowDate: value.clientBorrowDate,
      clientBorrowDeathline: value.clientBorrowDeathline,
      clientBorrowReturned: value.clientBorrowReturned,
    };
    const id = value._id;
    Axios.put(`${URL}/update-client`, { data: entry, id });
    setIsUpdated(true);
  };

  const handleRemoveDocument = (id, collection) => {
    Axios.delete(`${URL}/delete/${collection}/${id}`);
    setIsUpdated(true);
  };

  return (
    <div className="container">
      <DataTable
        table={"books"}
        thead={BOOKS_HEADERS}
        search={bookSearch}
        sort={bookSort}
        setSearch={setBookSearch}
        setSort={setBookSort}
        data={selectedBooks.length === 0 ? books : selectedBooks}
        handleAddDocument={handleAddBook}
        handleUpdateDocument={handleUpdateBook}
        handleRemoveDocument={handleRemoveDocument}
      />
      <DataTable
        table={"clients"}
        helpData={books}
        thead={CLIENTS_HEADERS}
        search={clientSearch}
        sort={clientSort}
        setSearch={setClientSearch}
        setSort={setClientSort}
        data={selectedClients.length === 0 ? clients : selectedClients}
        handleAddDocument={handleAddClient}
        handleUpdateDocument={handleUpdateClient}
        handleRemoveDocument={handleRemoveDocument}
      />
    </div>
  );
};

export default App;
