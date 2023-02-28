import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./listProductsTable.scss";
import { useAppDispatch, useAppSelector } from "../../../../state/store";
import { deleteProduct, getProducts } from "../../productsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TablePagination } from "@mui/material";

interface Props {
  itemsPerPage: number;
}

const ListProductsTable: FC<Props> = ({ itemsPerPage }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { loading } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead className="thclr">
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Title</TableCell>
              <TableCell className="tableCell">Description</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      {product._id}
                    </TableCell>
                    {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      {product.title}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      {product.description}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      <span className={`status ${product.status}`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <div className="cellAction">
                        <Link
                          to={`/products/edit/${product?._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="viewButton">
                            <EditIcon />
                          </div>
                        </Link>
                        <div
                          className="deleteButton"
                          onClick={() => dispatch(deleteProduct(product?._id))}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListProductsTable;
