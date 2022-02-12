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
  } = props;
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
                        {editting === book._id ? (
                          <input
                            key={title}
                            type="text"
                            className="form-control"
                            value={editData[title]}
                            name={title}
                            onChange={handleEditData}
                          />
                        ) : (
                          book[title]
                        )}
                      </td>
                    )
                  );
                })}
                <td className="table-controls">
                  {editting === book._id ? (
                    <BsCheckLg onClick={handleUpdateEditData} />
                  ) : (
                    <BsPencil onClick={() => handleSetEditData(book)} />
                  )}

                  <BsXLg
                    onClick={() => handleRemoveDocument(book._id, "book")}
                  />
                </td>
              </tr>
            )
          );
        })}
      <TableNewDataRow
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
