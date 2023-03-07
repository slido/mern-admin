import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/store";
import { Product } from "../productsSlice";
import "./productform.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface IProductFormPrompts {
  initialValues: Product;
  onSubmit: (values: Product) => void;
  isEdit: boolean;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Product description is required"),
  status: Yup.string().required("Status is required"),
});

const ProductForm: FC<IProductFormPrompts> = ({
  initialValues,
  onSubmit,
  isEdit,
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(initialValues);
  const { loading } = useAppSelector((state) => state.products);
  const navigate = useNavigate();

  const handleSubmit = (values: Product, { setSubmitting }: any) => {
    console.log("values:", values);
    console.log("selectedProduct:", selectedProduct);
    onSubmit(values);
    setSubmitting(false);
  };

  useEffect(() => {
    setSelectedProduct(initialValues);
  }, [initialValues]);

  return (
    <div className="newProductForm">
      <div className="top">
        <div className="dataTableTitle">
          <h1 className="listTitle">
            {isEdit ? "Edit Product" : "Create Product"}
          </h1>

          <Button
            className="addButton"
            variant="outlined"
            onClick={() => navigate(`/products/`)}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          {!loading && (
            <Formik
              key={initialValues._id}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ errors, setFieldValue }) => (
                <Form>
                  <FormControl className="fItem">
                    <Field
                      as={TextField}
                      error={!!errors.title}
                      name="title"
                      value={selectedProduct.title}
                      fullWidth
                      label="Title"
                      className="formInput"
                      onChange={(e: any) => {
                        setFieldValue("title", e.target.value);
                        setSelectedProduct({
                          ...selectedProduct,
                          title: e.target.value,
                        });
                      }}
                    />
                    {!!errors.title ? <div>{errors.title}</div> : null}
                  </FormControl>
                  <FormControl className="fItem">
                    <Field
                      as={TextField}
                      name="description"
                      multiline
                      error={!!errors.description}
                      value={selectedProduct?.description}
                      fullWidth
                      label="Description"
                      rows={4}
                      onChange={(e: any) => {
                        setFieldValue("description", e.target.value);
                        setSelectedProduct({
                          ...selectedProduct,
                          description: e.target.value,
                        });
                      }}
                    />
                    {!!errors.description ? (
                      <div>{errors.description}</div>
                    ) : null}
                  </FormControl>
                  <FormControl className="fItem">
                    <InputLabel id="demo-simple-select-helper-label">
                      Status
                    </InputLabel>
                    <Select
                      name="status"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedProduct?.status}
                      label="Status"
                      error={!!errors.status}
                      onChange={(e) => {
                        setFieldValue("status", e.target.value);
                        setSelectedProduct({
                          ...selectedProduct,
                          status: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="awailable">Awailable</MenuItem>
                      <MenuItem value="notAwailable">Not Awailable</MenuItem>
                      <MenuItem value="ariving">Ariving</MenuItem>
                    </Select>
                    {!!errors.status ? <div>{errors.status}</div> : null}
                  </FormControl>
                  <FormControl className="fItem">
                    <Button
                      fullWidth
                      variant="contained"
                      disableElevation
                      type="submit"
                    >
                      {isEdit ? "Save" : "Create"}
                    </Button>
                  </FormControl>
                </Form>
              )}
            </Formik>
          )}
        </div>
        {/* <div className="right"></div> */}
      </div>
    </div>
  );
};

export default ProductForm;
