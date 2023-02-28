import React, { ReactElement, FC } from "react";
import "./home.scss";
import Widget from "../../components/Widget/Widget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Chart/Chart";
import ListProductsTable from "../products/components/ListProductsTable/ListProductsTable";

const Home: FC = () => {
  return (
    <div className="homeConent">
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart aspectRatio={2 / 1} title="Last 6 Monthes (Revenue)" />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Products</div>
        <ListProductsTable itemsPerPage={5} />
      </div>
    </div>
  );
};

export default Home;
