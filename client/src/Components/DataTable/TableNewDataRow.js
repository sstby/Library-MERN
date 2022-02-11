import React from "react";
import { BsCheckLg, BsEraser } from "react-icons/bs";

const TableNewDataRow = (props) => {
  const { thead, data, handleNewDataChange, handleAddData } = props;
  return (
    <tr>
      {thead.length !== 0 &&
        thead.map((title) => {
          return (
            <td key={title}>
              <input
                type="text"
                name={title}
                className="form-control new-data-input"
                onChange={handleNewDataChange}
                value={data ? data[title] : ""}
              />
            </td>
          );
        })}
      <td className="table-controls">
        <BsCheckLg onClick={handleAddData} />
        <BsEraser className="table-edit-icon" />
      </td>
    </tr>
  );
};

export default TableNewDataRow;
