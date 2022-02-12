import React from "react";
import TableNewDataRow from "./TableNewDataRow";
import { BsXLg, BsPencil, BsCheckLg } from "react-icons/bs";

const TableData = (props) => {
  const {
    thead,
    newData,
    data,
    editData,
    editting,
    handleEditData,
    handleSetEditData,
    handleUpdateEditData,
    handleNewDataChange,
    handleAddData,
    handleRemoveDocument,
    setNewData,
    helpData,
    table,
  } = props;

  const renderText = (data, title) => {
    if (title === "clientBorrowedBook") {
      let value;
      for (let el of helpData) {
        if (el._id === data[title]) value = el.bookTitle;
      }

      return value;
    }
    if (title === "clientBorrowDate" || title === "clientBorrowDeathline") {
      return data[title].split("T")[0];
    }
    if (title === "clientBorrowReturned") {
      return data[title] ? "Вернул" : "Не вернул";
    }
    return data[title];
  };

  const renderEditInput = (data) => {
    let isDate = false;
    if (data === "clientBorrowDate" || data === "clientBorrowDeathline") {
      isDate = true;
    }
    if (data === "clientBorrowedBook") {
      return (
        <select
          name={data}
          className="form-control"
          value={editData[data]._id}
          onChange={handleEditData}
        >
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
    if (data === "clientBorrowReturned") {
      return (
        <select
          name={data}
          className="form-control"
          value={editData[data]._id}
          onChange={handleEditData}
        >
          <option value={null}></option>
          <option value={true}>Вернул</option>
          <option value={false}>Не вернул</option>
        </select>
      );
    }
    return (
      <input
        key={data}
        type={isDate ? "date" : "text"}
        className="form-control"
        value={isDate ? editData[data].split("T")[0] : editData[data]}
        name={data}
        onChange={handleEditData}
      />
    );
  };

  return (
    <>
      {data.length !== 0 &&
        data.map((book, index) => {
          return (
            book._id !== null && (
              <tr key={index}>
                {Object.keys(book).map((title) => {
                  return (
                    title[0] !== "_" && (
                      <td key={title}>
                        {editting === book._id
                          ? renderEditInput(title)
                          : renderText(book, title)}
                      </td>
                    )
                  );
                })}
                <td className="table-controls align-middle">
                  <div className="table-controls__container">
                    {editting === book._id ? (
                      <BsCheckLg onClick={handleUpdateEditData} />
                    ) : (
                      <BsPencil onClick={() => handleSetEditData(book)} />
                    )}

                    <BsXLg
                      onClick={() => handleRemoveDocument(book._id, table)}
                    />
                  </div>
                </td>
              </tr>
            )
          );
        })}
      <TableNewDataRow
        helpData={helpData}
        newData={newData}
        thead={thead}
        data={data}
        handleNewDataChange={handleNewDataChange}
        handleAddData={handleAddData}
        setNewData={setNewData}
      />
    </>
  );
};

export default TableData;
