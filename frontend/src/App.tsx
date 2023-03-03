import React, { FC, useCallback, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import mainTheme from "./theme/customTheme";
import "./theme/mainTheme.css";
import Home from "./pages/home/Home";
import LoginForm from "./components/auth/Login";
import Register from "./components/auth/Register";
import Layout from "./components/Layout/Layout";
import ListProducts from "./pages/products/ListProducts";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./App.scss";
import GenerateBlogPost from "./pages/generateBlogPost/GenerateBlogPost";
import { useAppDispatch } from "./state/store";
import { getUser, logoutUser } from "./components/auth/AuthSlice";
import SnackBar from "./components/SnackBar/SnackBar";
import CreateProduct from "./pages/products/components/Create";
import EditProduct from "./pages/products/components/Edit";
import Ask from "./pages/ask/Ask";
import JobAd from "./pages/jobAd/JobAd";
import ListUsers from "./pages/users/ListUsers";
import CreateUser from "./pages/users/components/Create";
import EditUser from "./pages/users/components/Edit";
import ProductDetailed from "./pages/products/components/ProductDetailed/ProductDetailed";
import UserDetailed from "./pages/users/components/UserDetailed/UserDetailed";

const App: FC = () => {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getUser());
  }, [dispatch]);

  const Logout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <SnackBar />
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="products">
                  <Route index element={<ListProducts />} />
                  <Route path=":id" element={<ProductDetailed />} />
                  <Route path="new" element={<CreateProduct />} />
                  <Route path="edit/:id" element={<EditProduct />} />
                </Route>
                <Route path="users">
                  <Route index element={<ListUsers />} />
                  <Route path=":id" element={<UserDetailed />} />
                  <Route path="new" element={<CreateUser />} />
                  <Route path="edit/:id" element={<EditUser />} />
                </Route>
                <Route path="/blog" element={<GenerateBlogPost />} />
                <Route path="/ask" element={<Ask />} />
                <Route path="/jobad" element={<JobAd />} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
