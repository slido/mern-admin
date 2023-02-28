import { FC } from "react";
import "./listProducts.scss";

import DataGridList from "../../components/DataGridList/DataGridList";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ListProductsTable from "./components/ListProductsTable/ListProductsTable";

const ListProducts: FC = () => {
  return (
    <div className="userListContainer">
      <div className="dataTableTitle">
        <h1 className="listTitle">Products</h1>
        <Link to="/products/new" style={{ textDecoration: "none" }}>
          <Button className="addButton" variant="outlined">
            Add New
          </Button>
        </Link>
      </div>
      <div className="listElement">
        <ListProductsTable itemsPerPage={10} />
      </div>
    </div>
  );
};

export default ListProducts;
