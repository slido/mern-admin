import React, { FC, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../state/store";
import { registerUserAction } from "./AuthSlice";

interface RegisterFormValues {
  email: string;
  fname: string;
  lname: string;
  password: string;
}

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (isLoggedIn && location.pathname === "/register") {
      navigate("/");
    }
  }, [location, navigate]);

  const initialValues = {
    email: "",
    fname: "",
    lname: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Required"),
    fname: Yup.string().required("Required"),
    lname: Yup.string().required("Required"),
  });

  const dispatch = useAppDispatch();
  const submitForm = async (val: RegisterFormValues) => {
    // dispatch(signupUser(val.email, val.fname, val.lname, val.password));
    dispatch(registerUserAction(val));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnMount={true}
      validateOnChange={true}
      onSubmit={async (values: RegisterFormValues, actions) => {
        submitForm(values);
        //actions.resetForm();
      }}
    >
      <Form className="formHolder">
        <div className="form">
          <h1>Register</h1>

          <Field
            as={TextField}
            type="text"
            name="email"
            placeholder="Email"
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage name="email" />

          <Field
            as={TextField}
            type="text"
            name="fname"
            placeholder="First name"
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage name="fname" />

          <Field
            as={TextField}
            type="text"
            name="lname"
            placeholder="Last name"
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage name="lname" />

          <Field
            as={TextField}
            type="password"
            name="password"
            placeholder="Password"
            variant="outlined"
            margin="normal"
          />
          <ErrorMessage name="password" />
          <div className="btns">
            <Button type="submit" variant="outlined">
              Register
            </Button>
            <Link to="/login">
              <Button type="submit" variant="outlined">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
