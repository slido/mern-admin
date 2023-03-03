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

  useEffect(() => {
    dispatch(getUserById(id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    setUser(singleUser);
  }, [singleUser]);

  const handleSubmit = (e: IUser) => {
    const newUser: IUser = {
      _id: e._id,
      fname: e.fname,
      lname: e.lname,
      address: e.address,
      email: e.email,
      accountType: e.accountType,
      status: e.status,
    };

    dispatch(updateUser(newUser));
    setUser({});
    navigate("/users");
  };

  return (
    <UserForm onSubmit={handleSubmit} initialValues={user} isEdit={true} />
  );
};

export default EditUser;
