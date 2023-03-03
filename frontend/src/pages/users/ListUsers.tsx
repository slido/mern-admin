import { FC } from "react";
import "./listUsers.scss";

import DataGridList from "../../components/DataGridList/DataGridList";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ListUsersTable from "./components/ListUsersTable/ListUsersTable";

const ListUsers: FC = () => {
  return (
    <div className="userListContainer">
      <div className="dataTableTitle">
        <h1 className="listTitle">Users</h1>
        <Link to="/users/new" style={{ textDecoration: "none" }}>
          <Button className="addButton" variant="outlined">
            Add New
          </Button>
        </Link>
      </div>
      <div className="listElement">
        <ListUsersTable itemsPerPage={10} />
      </div>
    </div>
  );
};

export default ListUsers;
