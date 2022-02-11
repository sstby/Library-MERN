import React from "react";

const TableHead = ({ thead }) => {
  return (
    <>
      <tr>
        {thead.length !== 0 &&
          thead.map((title) => {
            return <th key={title}>{title}</th>;
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
                <input type="text" name={title} className="form-control" />
              </th>
            );
          })}
      </tr>
    </>
  );
};

export default TableHead;
