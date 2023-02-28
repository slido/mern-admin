import { TableCell } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { ReactNode } from "react";

export const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status:"active" },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42,status:"passive" },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45,status:"active" },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16,status:"active" },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 22,status:"active" },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150,status:"passive" },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44,status:"passive" },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36,status:"active" },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65,status:"active" },
];
  
export const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, flex:1 },
    { field: "firstName", headerName: "First name", width: 130, flex:1 },
    { field: "lastName", headerName: "Last name", width: 130, flex:1 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
        width: 70,
        flex: 1
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
            `${ params.row.firstName || "" } ${ params.row.lastName || "" }`,
      flex: 1
    },
    {
        field: "status",
        headerName: "Status",
        width: 180,
        renderCell : (params) => {
            return (
              params.row.status
            );
          }, flex:1
            
          
    },
    
  ];