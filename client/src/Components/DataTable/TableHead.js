import React from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const TableHead = (props) => {
  const { table, thead, search, sort, setSearch, setSort } = props;

  const handleSearch = (e) => {
    const name = `book${e.target.name}`;
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
    let reversed;
    if (sort.field === field) {
      reversed = !sort.reversed;
    } else {
      reversed = false;
    }
    setSort({ field, reversed });
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
                  {sort.field === `book${title}` ? (
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
            return (
              <th key={title}>
                <input
                  type="text"
                  name={title}
                  className="form-control"
                  onChange={handleSearch}
                />
              </th>
            );
          })}
      </tr>
    </>
  );
};

export default TableHead;
