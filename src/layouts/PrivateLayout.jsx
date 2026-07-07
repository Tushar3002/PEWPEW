import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const PrivateLayout = () => {
  // const { user, loading } = useAuth();

  // if (loading) return <div>Loading...</div>;

  // if (!user) return <Navigate to="/login" replace />;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
