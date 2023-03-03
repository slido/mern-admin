import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "../../../../components/Chart/Chart";
import "./detailed.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppDispatch, useAppSelector } from "../../../../state/store";
import ListUsersTable from "../ListUsersTable/ListUsersTable";
import { getUserById, IUser } from "../../usersSlice";

const UserDetailed: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const { singleUser } = useAppSelector((state) => state.users);
  const [user, setUser] = useState<IUser>(singleUser);

  useEffect(() => {
    dispatch(getUserById(id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    setUser(singleUser);
  }, [singleUser]);

  return (
    <div className="single">
      <div className="dataTableTitle">
        <Button
          className="addButton"
          variant="outlined"
          onClick={() => navigate("/users")}
        >
          <ArrowBackIosIcon />
          Back
        </Button>

        <Button
          className="addButton"
          variant="outlined"
          onClick={() => navigate(`/users/edit/${id}`)}
        >
          Edit
        </Button>
      </div>
      <div className="top">
        <div className="left">
          <h1 className="title">User Info</h1>
          <div className="item">
            <img
              src="https://cdn.midjourney.com/604a3fb5-7d78-4b15-8bae-82f7d35cf224/grid_0.png"
              alt=""
              className="itemImg"
            />
            <div className="details">
              <h2 className="itemTitle">{user.fname}</h2>
              <div className="detailItem">
                <span className="itemKey">description:</span>
                <span className="itemValue">{user.lname}</span>
              </div>

              <div className="detailItem">
                <span className="itemKey">Country:</span>
                <span className="itemValue">USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="listTitle">Latest Products</div>
        <ListUsersTable itemsPerPage={5} />
      </div>
    </div>
  );
};

export default UserDetailed;
