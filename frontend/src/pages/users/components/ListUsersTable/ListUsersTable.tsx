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
import "./listUsersTable.scss";
import { useAppDispatch, useAppSelector } from "../../../../state/store";
import { deleteUser, getUsers } from "../../usersSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TablePagination } from "@mui/material";

interface Props {
  itemsPerPage: number;
}

const ListUsersTable: FC<Props> = ({ itemsPerPage }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { loading } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Email</TableCell>
              <TableCell className="tableCell">User type</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      {user._id}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      {`${user.fname} ${user.lname}`}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      {user.email}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      {user.accountType}
                    </TableCell>
                    <TableCell
                      className="tableCell"
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      {user.status}
                    </TableCell>

                    <TableCell className="tableCell">
                      <div className="cellAction">
                        <Link
                          to={`/users/edit/${user._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="viewButton">
                            <EditIcon />
                          </div>
                        </Link>
                        {user && (
                          <div
                            className="deleteButton"
                            onClick={() =>
                              dispatch(deleteUser(user._id as string))
                            }
                          >
                            <DeleteIcon />
                          </div>
                        )}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListUsersTable;
