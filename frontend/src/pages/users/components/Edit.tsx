import React, { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { getUserById, IUser, updateUser } from "../usersSlice";
import UserForm from "./UserForm";

const EditUser: FC = () => {
  const dispatch = useAppDispatch();
  const { singleUser } = useAppSelector((state) => state.users);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(singleUser);
  const { loading } = useAppSelector((state) => state.products);
  const [duplicateErrors, setDuplicateErrors] = useState("");

  useEffect(() => {
    dispatch(getUserById(id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setUser(singleUser);
  }, [singleUser]);

  const handleSubmit = (e: IUser) => {
    const newUser: IUser = {
      _id: id,
      fname: e.fname,
      lname: e.lname,
      address: e.address,
      email: e.email,
      accountType: e.accountType,
      status: e.status,
    };
    try {
      dispatch(updateUser(newUser));
      setUser(newUser);
      navigate("/users");
    } catch (error: any) {
      setDuplicateErrors("Email address already exists");
      console.error("erroooor:", error);
    }
  };

  return (
    <>
      <UserForm onSubmit={handleSubmit} initialValues={user} isEdit={true} />
      {duplicateErrors && <div>{duplicateErrors}</div>}
    </>
  );
};

export default EditUser;
