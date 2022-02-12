import React, { useState, useEffect } from "react";
import { selectData, sortData } from "./functions";
import Axios from "axios";
import DataTable from "./Components/DataTable/DataTable";

const URL = "http://localhost:3001";

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

  //Сортировка книг
  useEffect(() => {
    if (bookSort.field !== null) {
      setBooks((books) => sortData(bookSort, books));
    }
  }, [bookSort]);

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

  const handleRemoveDocument = (id, collection) => {
    Axios.delete(`${URL}/delete/${collection}/${id}`);
    setIsUpdated(true);
  };

  return (
    <div className="container">
      <DataTable
        table={"books"}
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
        search={clientSearch}
        sort={clientSort}
        setSearch={setClientSearch}
        setSort={setClientSort}
        data={selectedClients.length === 0 ? clients : selectedClients}
        handleAddDocument={handleAddBook}
        handleUpdateDocument={handleUpdateBook}
        handleRemoveDocument={handleRemoveDocument}
      />
    </div>
  );
};

export default App;
