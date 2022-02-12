import React from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const TableHead = (props) => {
  const { table, thead, search, sort, setSearch, setSort, helpData } = props;

  const handleSearch = (e) => {
    let name = `${table === "books" ? "book" : "client"}${e.target.name}`;
    console.log(name);
    const value = e.target.value;
    let newSearch = Object.assign({}, search);
    newSearch = { ...newSearch, [name]: value };
    if (newSearch[name] === "") delete newSearch[name];
    setSearch(newSearch);
  };

  const handleSort = (title) => {
    let field = title;
    if (table === "books") {
      field = "book" + field;
    }
    if (table === "clients") {
      field = "client" + field;
    }
    let reversed;
    if (sort.field === field) {
      reversed = !sort.reversed;
    } else {
      reversed = false;
    }
    setSort({ field, reversed });
  };

  const renderInputType = (data) => {
    if (data === "BorrowDate" || data === "BorrowDeathline") {
      return (
        <input
          type="date"
          name={data}
          className="form-control"
          onChange={handleSearch}
        />
      );
    }
    if (data === "BorrowedBook") {
      return (
        <select className="form-control" onChange={handleSearch} name={data}>
          <option value={null}></option>
          {helpData.map((book) => {
            return (
              <option key={book.bookTitle} value={book._id}>
                {book.bookTitle}
              </option>
            );
          })}
        </select>
      );
    }
    if (data === "BorrowReturned") {
      return (
        <select className="form-control" onChange={handleSearch} name={data}>
          <option value={null}></option>
          <option value={true}>Вернул</option>
          <option value={false}>Не вернул</option>
        </select>
      );
    }
    return (
      <input
        type="text"
        name={data}
        className="form-control"
        onChange={handleSearch}
      />
    );
  };

  return (
    <>
      <tr>
        {thead.length !== 0 &&
          thead.map((title) => {
            return (
              <th key={title} onClick={() => handleSort(title)}>
                <div className="table-head-title">
                  <span>{title}</span>
                  {sort.field === `book${title}` ||
                  sort.field === `client${title}` ? (
                    sort.reversed === false ? (
                      <BsArrowDown />
                    ) : (
                      <BsArrowUp />
                    )
                  ) : null}
                </div>
              </th>
            );
          })}
        <td className="table-controls" rowSpan={2}>
          Actions
        </td>
      </tr>
      <tr>
        {thead.length !== 0 &&
          thead.map((title) => {
            return <th key={title}>{renderInputType(title)}</th>;
          })}
      </tr>
    </>
  );
};

export default TableHead;
