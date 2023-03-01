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
    console.log(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    setProduct(singleProduct);
  }, [singleProduct]);

  const handleSubmit = (e: Product) => {
    let data = {
      title: e.title,
      description: e.description,
      status: e.status,
      _id: e._id,
    };

    dispatch(updateProduct(data));
    setProduct({
      title: "",
      description: "",
      status: "",
      categories: [],
    });
    navigate("/products");
  };

  return <ProductForm onSubmit={handleSubmit} initialValues={product} />;
};

export default EditProduct;
