import { Button, FormControl, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/store";
import { IUser } from "../usersSlice";
import "./userform.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface IUserFormPrompts {
  initialValues: IUser;
  onSubmit: (values: IUser) => void;
  isEdit: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter email in email format")
    .required("Email is required"),
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  password: Yup.string().required("Password is required"),
});

const UserForm: FC<IUserFormPrompts> = ({
  initialValues,
  onSubmit,
  isEdit,
}) => {
  const [selectedUser, setSelectedUser] = useState<IUser>(initialValues);
  const { loading } = useAppSelector((state) => state.products);
  const navigate = useNavigate();

  const handleSubmit = (values: IUser, { setSubmitting }: any) => {
    console.log("values:", values);
    console.log("selectedUser:", selectedUser);
    onSubmit(values);
    setSubmitting(false);
  };

  useEffect(() => {
    setSelectedUser(initialValues);
  }, [initialValues]);

  return (
    <div className="newProductForm">
      <div className="top">
        <div className="dataTableTitle">
          <h1 className="listTitle">{isEdit ? "Edit User" : "Create User"}</h1>

          <Button
            className="addButton"
            variant="outlined"
            onClick={() => navigate(`/users/`)}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          {!loading && (
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <FormControl className="fItem">
                    <Field
                      as={TextField}
                      name="email"
                      value={selectedUser.email}
                      fullWidth
                      label="E-mail"
                      className="formInput"
                      error={!!errors.email}
                      onChange={(e: any) => {
                        setFieldValue("email", e.target.value);
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        });
                      }}
                    />
                    {!!errors.email ? <div>{errors.email}</div> : null}
                  </FormControl>
                  <FormControl className="fItem">
                    <Field
                      as={TextField}
                      name="fname"
                      value={selectedUser.fname}
                      fullWidth
                      label="First Name"
                      className="formInput"
                      error={!!errors.fname}
                      onChange={(e: any) => {
                        setFieldValue("fname", e.target.value);
                        setSelectedUser({
                          ...selectedUser,
                          fname: e.target.value,
                        });
                      }}
                    />
                    {!!errors.fname ? <div>{errors.fname}</div> : null}
                  </FormControl>
                  <FormControl className="fItem">
                    <Field
                      as={TextField}
                      name="lname"
                      value={selectedUser.lname}
                      fullWidth
                      label="Last Name"
                      className="formInput"
                      error={!!errors.lname}
                      onChange={(e: any) => {
                        setFieldValue("lname", e.target.value);
                        setSelectedUser({
                          ...selectedUser,
                          lname: e.target.value,
                        });
                      }}
                    />
                    {!!errors.lname ? <div>{errors.lname}</div> : null}
                  </FormControl>

                  {!isEdit ? (
                    <>
                      <FormControl className="fItem">
                        <Field
                          as={TextField}
                          name="password"
                          value={selectedUser.password}
                          fullWidth
                          label="Password"
                          className="formInput"
                          error={!!errors.password}
                          onChange={(e: any) => {
                            setFieldValue("password", e.target.value);
                            setSelectedUser({
                              ...selectedUser,
                              password: e.target.value,
                            });
                          }}
                        />
                        {!!errors.password ? (
                          <div>{errors.password}</div>
                        ) : null}
                      </FormControl>
                    </>
                  ) : null}

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

export default UserForm;
