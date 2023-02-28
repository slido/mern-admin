import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { deactivateSnackbar } from "./SnackBarSlice";

const SnackBar = () => {
  const { open, message, severity } = useAppSelector((state) => state.snackBar);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(deactivateSnackbar());
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </>
  );
};

export default SnackBar;
