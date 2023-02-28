import { FC, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/store";
import "./login.scss";
import { loginUserAction } from "./AuthSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAuthenticated");
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/");
    }
  }, [location, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Required"),
  });

  const dispatch = useAppDispatch();
  const submitForm = async (val: LoginFormValues) => {
    await dispatch(loginUserAction(val));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnMount={true}
        validateOnChange={true}
        // onSubmit={async (values: LoginFormValues) => {
        //   submitForm(values);
        // }}
        onSubmit={submitForm}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form
            className="formHolder"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="form">
              <h1>Login</h1>
              <Field
                as={TextField}
                type="email"
                name="email"
                placeholder="Email"
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="email" />

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
                  Login
                </Button>
                <Link to="/register">
                  <Button type="submit" variant="outlined">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
