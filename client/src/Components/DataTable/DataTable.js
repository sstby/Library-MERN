import React, { useState } from "react";
import TableHead from "./TableHead";
import TableData from "./TableData";
import "./DataTable.css";

const DataTable = (props) => {
  const {
    table,
    thead,
    data,
    handleAddDocument,
    handleUpdateDocument,
    handleRemoveDocument,
    search,
    sort,
    setSearch,
    setSort,
    helpData,
  } = props;
  const [newData, setNewData] = useState({});
  const [editData, setEditData] = useState();
  const [editting, setEditting] = useState({});

  const handleNewDataChange = (e) => {
    let entry = Object.assign({}, newData);
    entry = {
      ...entry,
      [e.target.name]: e.target.value,
    };
    setNewData(entry);
  };

  const handleAddData = () => {
    if (!newData || Object.keys(newData).length === 0) {
      const inputs = document.querySelectorAll(".new-data-input");
      inputs.forEach((input) => {
        input.style.borderColor = "red";
      });
      return;
    }

    handleAddDocument(newData);
    setNewData({});
  };

  const handleSetEditData = (data) => {
    setEditData(Object.assign({}, data));
    setEditting(data._id);
  };

  const handleEditData = (e) => {
    let entry = Object.assign({}, editData);
    entry = {
      ...entry,
      [e.target.name]: e.target.value,
    };
    setEditData(entry);
  };

  const handleUpdateEditData = () => {
    if (!editData || Object.keys(editData).length === 0) {
      const inputs = document.querySelectorAll(".new-data-input");
      inputs.forEach((input) => {
        input.style.borderColor = "red";
      });
      return;
    }
    handleUpdateDocument(editData, "book");
    setEditting({});
    setEditData();
  };

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <TableHead
          helpData={helpData}
          table={table}
          thead={thead}
          search={search}
          sort={sort}
          setSort={setSort}
          setSearch={setSearch}
        />
      </thead>
      <tbody>
        <TableData
          table={table}
          helpData={helpData}
          thead={thead}
          data={data}
          newData={newData}
          editData={editData}
          editting={editting}
          setNewData={setNewData}
          handleEditData={handleEditData}
          handleSetEditData={handleSetEditData}
          handleUpdateEditData={handleUpdateEditData}
          handleNewDataChange={handleNewDataChange}
          handleAddData={handleAddData}
          handleRemoveDocument={handleRemoveDocument}
        />
      </tbody>
    </table>
  );
};

export default DataTable;
