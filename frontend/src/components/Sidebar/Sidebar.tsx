import React from "react";
import "./sidebar.scss";
import Dashboard from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { logoutUser } from "../auth/AuthSlice";
import { useAppDispatch } from "../../state/store";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Slido admin</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <Dashboard />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon />
              <span>Products</span>
            </li>
          </Link>

          <p className="title">SERVICE</p>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon />
              <span>Blog Post</span>
            </li>
          </Link>
          <Link to="/ask" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon />
              <span>Ask a question</span>
            </li>
          </Link>
          <Link to="/jobad" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon />
              <span>Job Ad</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleIcon />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
