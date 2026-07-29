import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const PrivateLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, loading } = useAuth();

  if (loading) return <Loader/>;

  if (!user) return <Navigate to="/login" replace />;
  
  return (
    <div
      id="wrapper"
      className={`content-wrapper ${!isSidebarOpen ? "toggled" : ""}`}
    >
      <SideBar />

      <div className="page-content-wrapper">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <div className="content-inside">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
//aaaaaaaaaaaa