import { Navigate, Outlet } from "react-router-dom";
import { getStorage } from "../utils/storage";

const GuestRoute = () => {
  // const token = localStorage.getItem("token");
  const token = getStorage("token")

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;