import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "../Chart/Chart";
import TableComponent from "../Table/TableComponent";
import "./detailed.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getProductById, Product } from "../../pages/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../state/store";
import ListProductsTable from "../../pages/products/components/ListProductsTable/ListProductsTable";

const Detailed: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const { singleProduct } = useAppSelector((state) => state.products);
  const [product, setProduct] = useState<Product>(singleProduct);

  useEffect(() => {
    dispatch(getProductById(id!));
    console.log(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    setProduct(singleProduct);
  }, [singleProduct]);

  return (
    <div className="single">
      <div className="dataTableTitle">
        <Button
          className="addButton"
          variant="outlined"
          onClick={() => navigate("/products")}
        >
          <ArrowBackIosIcon />
          Back
        </Button>

        <Button
          className="addButton"
          variant="outlined"
          onClick={() => navigate(`/products/edit/${id}`)}
        >
          Edit
        </Button>
      </div>
      <div className="top">
        <div className="left">
          <h1 className="title">Product Info</h1>
          <div className="item">
            <img
              src="https://cdn.midjourney.com/604a3fb5-7d78-4b15-8bae-82f7d35cf224/grid_0.png"
              alt=""
              className="itemImg"
            />
            <div className="details">
              <h2 className="itemTitle">{product.title}</h2>
              <div className="detailItem">
                <span className="itemKey">description:</span>
                <span className="itemValue">{product.description}</span>
              </div>

              <div className="detailItem">
                <span className="itemKey">Country:</span>
                <span className="itemValue">USA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Chart aspectRatio={3 / 1} title="User Spendings (last 6 months)" />
        </div>
      </div>
      <div className="bottom">
        <div className="listTitle">Latest Products</div>
        <ListProductsTable itemsPerPage={5} />
      </div>
    </div>
  );
};

export default Detailed;
