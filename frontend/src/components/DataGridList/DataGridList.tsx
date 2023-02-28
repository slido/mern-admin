import React from "react";
import "./datagridlist.scss";
import { DataGrid } from "@mui/x-data-grid";
import { rows, columns } from "../../utils/datagridData";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const DataGridList = ({ title }: any) => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <Link to="123" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="dataGridContent">
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default DataGridList;
