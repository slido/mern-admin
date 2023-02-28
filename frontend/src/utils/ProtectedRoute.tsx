import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../state/store";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const isLoggedin = isAuthenticated ? true : false;
  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
