import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./layout.scss";

const Layout = () => {
  //parrent content layout
  return (
    <div className="contentWrapper">
      <Sidebar />
      <div className="contentContainer">
        <Navbar />
        <div className="mainContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
