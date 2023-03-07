import React, { FC, useState } from "react";
import { useAppDispatch } from "../../../state/store";
import { createProduct, Product } from "../productsSlice";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

const CreateProduct: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: Product) => {
    try {
      const newProduct: Product = {
        title: e.title,
        description: e.description,
        status: e.status,
      };
      dispatch(createProduct(newProduct));
      navigate("/products");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate email error
        console.error(error);
        //setDuplicateErrors("Email address already exists");
      } else {
        // Handle other errors
        console.error(error);
        //setDuplicateErrors(error);
      }
    }
  };

  const [product, setProduct] = useState({});

  return (
    <ProductForm
      onSubmit={handleSubmit}
      initialValues={product}
      isEdit={false}
    />
  );
};

export default CreateProduct;
