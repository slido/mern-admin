import React, { FC, useState } from "react";
import { useAppDispatch } from "../../../state/store";
import { createProduct, Product } from "../productsSlice";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

const CreateProduct: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: Product) => {
    let data = {
      title: e.title,
      description: e.description,
      status: e.status,
    };
    console.log(data);
    dispatch(createProduct(data));
    navigate("/products");
  };

  const [product, setProduct] = useState({
    title: "",
    description: "",
    status: "",
    categories: [],
  });

  return <ProductForm onSubmit={handleSubmit} initialValues={product} />;
};

export default CreateProduct;
