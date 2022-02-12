import React, { useEffect, useRef } from "react";
import { BsCheckLg, BsEraser } from "react-icons/bs";

const TableNewDataRow = (props) => {
  const {
    thead,
    newData,
    handleNewDataChange,
    handleAddData,
    setNewData,
    helpData,
  } = props;
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, thead.length);
  }, [thead]);

  const Validate = () => {
    let isValid = true;
    for (let input of inputsRef.current) {
      if (input.value === "") {
        isValid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#ced4da";
      }
    }
    if (isValid) {
      handleAddData();
    }
  };

  const renderInputType = (data, index) => {
    if (data === "BorrowDate" || data === "BorrowDeathline") {
      return (
        <input
          ref={(el) => (inputsRef.current[index] = el)}
          type="date"
          name={data}
          className="form-control"
          onChange={handleNewDataChange}
          value={newData[data] ? newData[data] : ""}
        />
      );
    }
    if (data === "BorrowedBook") {
      return (
        <select
          ref={(el) => (inputsRef.current[index] = el)}
          className="form-control"
          value={newData[data] ? newData[data] : ""}
          onChange={handleNewDataChange}
          name={data}
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
    if (data === "BorrowReturned") {
      return (
        <select
          ref={(el) => (inputsRef.current[index] = el)}
          className="form-control"
          value={newData[data] ? newData[data] : false}
          onChange={handleNewDataChange}
          name={data}
        >
          <option value={true}>Вернул</option>
          <option value={false}>Не вернул</option>
        </select>
      );
    }
    return (
      <input
        ref={(el) => (inputsRef.current[index] = el)}
        type="text"
        name={data}
        className="form-control"
        onChange={handleNewDataChange}
        value={newData[data] ? newData[data] : ""}
      />
    );
  };

  return (
    <tr>
      {thead.length !== 0 &&
        thead.map((title, index) => {
          return <td key={title}>{renderInputType(title, index)}</td>;
        })}
      <td className="table-controls align-middle">
        <div className="table-controls__container">
          <BsCheckLg onClick={Validate} />
          <BsEraser
            className="table-edit-icon"
            onClick={() => setNewData({})}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableNewDataRow;
