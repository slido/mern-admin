import React, { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { getProductById, Product, updateProduct } from "../productsSlice";
import ProductForm from "./ProductForm";

const EditProduct: FC = () => {
  const dispatch = useAppDispatch();
  const { singleProduct } = useAppSelector((state) => state.products);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>(singleProduct);
  const { loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setProduct(singleProduct);
  }, [singleProduct]);

  const handleSubmit = (e: Product) => {
    const editedProduct: Product = {
      _id: id,
      title: e.title,
      description: e.description,
      status: e.status,
    };
    try {
      dispatch(updateProduct(editedProduct));
      setProduct({});
      navigate("/products");
    } catch (error: any) {
      //setDuplicateErrors("Email address already exists");
      console.error("erroooor:", error);
    }
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      initialValues={product}
      isEdit={true}
    />
  );
};

export default EditProduct;
