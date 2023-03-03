import React from "react";
import "./sidebar.scss";
import Dashboard from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, NavLink } from "react-router-dom";
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

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <Dashboard />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <p className="title">LISTS</p>

          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <StoreIcon />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <AccountCircleIcon />
              <span>Users</span>
            </li>
          </NavLink>

          <p className="title">SERVICE</p>
          <NavLink
            to="/blog"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <CreditCardIcon />
              <span>Blog Post</span>
            </li>
          </NavLink>
          <NavLink
            to="/ask"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <CreditCardIcon />
              <span>Ask a question</span>
            </li>
          </NavLink>
          <NavLink
            to="/jobad"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <CreditCardIcon />
              <span>Job Ad</span>
            </li>
          </NavLink>
          <p className="title">USER</p>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <AccountCircleIcon />
              <span>Profile</span>
            </li>
          </NavLink>
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
