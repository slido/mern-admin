import { Button, FormControl, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { IUser } from "../users/usersSlice";
import "./profile.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateProfile } from "../../components/auth/AuthSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter email in email format")
    .required("Email is required"),
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  //password: Yup.string().required("Password is required"),
});

const Profile: FC = () => {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<IUser>({
    fname: profile.fName,
    lname: profile.lName,
    email: profile.email,
    password: profile.password,
    _id: profile.id,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: IUser) => {
    const newUser: IUser = {
      _id: user._id,
      fname: e.fname, // Update fname with the new value
      lname: e.lname,
      address: e.address,
      email: e.email,
      accountType: e.accountType,
      status: e.status,
      password: e.password,
    };

    try {
      await dispatch(updateProfile(newUser));
      setUser(newUser);
    } catch (error: any) {
      console.error("erroooor:", error);
    }
  };

  useEffect(() => {
    setUser({
      fname: profile.fName,
      lname: profile.lName,
      email: profile.email,
      _id: profile.id,
    });
  }, [profile]);

  return (
    <div className="newProductForm">
      <div className="top">
        <div className="dataTableTitle">
          <h1 className="listTitle">Edit Profile</h1>

          <Button
            className="addButton"
            variant="outlined"
            onClick={() => navigate(`/`)}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <Formik
            key={user._id}
            initialValues={user}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ errors, setFieldValue }) => (
              <Form>
                {
                  //!isEdit ? (
                  <FormControl className="fItem">
                    <Field
                      as={TextField}
                      name="email"
                      value={user.email}
                      fullWidth
                      label="E-mail"
                      className="formInput"
                      error={!!errors.email}
                      onChange={(e: any) => {
                        setFieldValue("email", e.target.value);
                        setUser({
                          ...user,
                          email: e.target.value,
                        });
                      }}
                    />
                    {!!errors.email ? <div>{errors.email}</div> : null}
                  </FormControl>
                  // ) : null
                }
                <FormControl className="fItem">
                  <Field
                    as={TextField}
                    name="fname"
                    value={user.fname}
                    fullWidth
                    label="First Name"
                    className="formInput"
                    error={!!errors.fname}
                    onChange={(e: any) => {
                      setFieldValue("fname", e.target.value);
                      setUser({
                        ...user,
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
                    value={user.lname}
                    fullWidth
                    label="Last Name"
                    className="formInput"
                    error={!!errors.lname}
                    onChange={(e: any) => {
                      setFieldValue("lname", e.target.value);
                      setUser({
                        ...user,
                        lname: e.target.value,
                      });
                    }}
                  />
                  {!!errors.lname ? <div>{errors.lname}</div> : null}
                </FormControl>

                <>
                  <FormControl className="fItem">
                    <Field
                      as={TextField}
                      name="password"
                      value={user.password}
                      fullWidth
                      type="password"
                      label="Password"
                      className="formInput"
                      error={!!errors.password}
                      onChange={(e: any) => {
                        setFieldValue("password", e.target.value);
                        setUser({
                          ...user,
                          password: e.target.value,
                        });
                      }}
                    />
                    {!!errors.password ? <div>{errors.password}</div> : null}
                  </FormControl>
                </>

                <FormControl className="fItem">
                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    type="submit"
                  >
                    Save
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
        </div>
        {/* <div className="right"></div> */}
      </div>
    </div>
  );
};

export default Profile;
