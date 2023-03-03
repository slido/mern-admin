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

interface IProductFormPrompts {
  initialValues: Product;
  onSubmit: (values: Product) => void;
  isEdit: boolean;
}

const ProductForm: FC<IProductFormPrompts> = ({
  initialValues,
  onSubmit,
  isEdit,
}) => {
  const [selectedProduct, setSelectedproduct] =
    useState<Product>(initialValues);
  const { loading } = useAppSelector((state) => state.products);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    onSubmit(selectedProduct);
  };

  // add this line
  useEffect(() => {
    setSelectedproduct(initialValues);
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
            <form onSubmit={handleSubmit}>
              <FormControl className="fItem">
                <TextField
                  onChange={(e) =>
                    setSelectedproduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                  name="title"
                  value={selectedProduct?.title}
                  fullWidth
                  label="Title"
                  className="formInput"
                />
              </FormControl>
              <FormControl className="fItem">
                <TextField
                  name="description"
                  multiline
                  onChange={(e) =>
                    setSelectedproduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  value={selectedProduct?.description}
                  fullWidth
                  label="Description"
                  rows={4}
                />
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
                  onChange={(e) =>
                    setSelectedproduct({
                      ...selectedProduct,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="awailable">Awailable</MenuItem>
                  <MenuItem value="notAwailable">Not Awailable</MenuItem>
                  <MenuItem value="ariving">Ariving</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="fItem">
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={handleSubmit}
                >
                  {isEdit ? "Save" : "Create"}
                </Button>
              </FormControl>
            </form>
          )}
        </div>
        {/* <div className="right"></div> */}
      </div>
    </div>
  );
};

export default ProductForm;
