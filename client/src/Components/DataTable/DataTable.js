import React, { useState, useEffect } from "react";
import TableHead from "./TableHead";
import TableData from "./TableData";
import "./DataTable.css";

const DataTable = (props) => {
  const {
    table,
    data,
    handleAddDocument,
    handleUpdateDocument,
    handleRemoveDocument,
    search,
    sort,
    setSearch,
    setSort,
  } = props;
  const [thead, setThead] = useState([]);
  const [newData, setNewData] = useState({});
  const [editData, setEditData] = useState();
  const [editting, setEditting] = useState({});

  useEffect(() => {
    if (data.length !== 0) {
      let headings = [];
      Object.keys(data[0]).forEach((title) => {
        if (title[0] !== "_") {
          headings.push(title.split("book")[1]);
        }
      });
      setThead(headings);
    }
  }, [data]);

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
