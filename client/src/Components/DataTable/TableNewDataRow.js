import React, { useEffect, useRef } from "react";
import { BsCheckLg, BsEraser } from "react-icons/bs";

const TableNewDataRow = (props) => {
  const { thead, newData, handleNewDataChange, handleAddData, setNewData } =
    props;
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

  return (
    <tr>
      {thead.length !== 0 &&
        thead.map((title, index) => {
          return (
            <td key={title}>
              <input
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                name={title}
                className="form-control"
                onChange={handleNewDataChange}
                value={newData[title] ? newData[title] : ""}
              />
            </td>
          );
        })}
      <td className="table-controls">
        <BsCheckLg onClick={Validate} />
        <BsEraser className="table-edit-icon" onClick={() => setNewData({})} />
      </td>
    </tr>
  );
};

export default TableNewDataRow;
