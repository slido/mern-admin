import React, { FC, useState } from "react";
import { useAppDispatch } from "../../../state/store";
import { createUser, IUser } from "../usersSlice";

import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

const CreateUser: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [duplicateErrors, setDuplicateErrors] = useState("");
  const handleSubmit = (e: IUser) => {
    try {
      const newUser: IUser = {
        fname: e.fname,
        lname: e.lname,
        address: e.address,
        email: e.email,
        accountType: e.accountType,
        status: e.status,
        password: e.password,
      };

      dispatch(createUser(newUser));
      navigate("/users");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate email error
        setDuplicateErrors("Email address already exists");
      } else {
        // Handle other errors
        //console.error(error);
        setDuplicateErrors(error);
      }
    }
  };

  const [userBlank, setUserBlank] = useState({});

  return (
    <UserForm
      onSubmit={handleSubmit}
      initialValues={userBlank}
      isEdit={false}
    />
  );
};

export default CreateUser;
