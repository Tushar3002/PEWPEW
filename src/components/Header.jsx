import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo-white.svg";
import profile from "../assets/images/profile-img.png";
import { useAuth } from "../context/AuthContext";

function Header({ toggleSidebar }) {
  const { logout } = useAuth();
  return (
    <header>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center flex-row g-2 g-sm-3 g-xl-4">
          <div className="col-auto">
            <div className="logo-section">
              <button
                type="button"
                className="sidebar-toggle"
                onClick={toggleSidebar}
              >
                <i className="demo-icon icon-toggle-1"></i>
                <i className="demo-icon icon-down-arrow"></i>
              </button>

              <div className="logo">
                <Link to={"/"}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col d-flex align-items-center justify-content-end gap-1 gap-sm-3 gap-xl-4">
            {/* Mobile Search Toggle */}
            <button className="search-toggle d-block d-md-none" type="button">
              <i className="demo-icon icon-search"></i>
              <i className="demo-icon icon-cross"></i>
            </button>

            {/* Header Icons */}
            <div className="head-icons">
              <ul className="d-flex align-items-center gap-1 gap-sm-3 gap-xl-4">
                <li className="dropdown no-arrow chat-notification">
                  <a className="dropdown-toggle" data-bs-toggle="dropdown">
                    <i className="demo-icon icon-message-2"></i>
                  </a>
                </li>

                <li className="dropdown no-arrow notification">
                  <a className="dropdown-toggle" data-bs-toggle="dropdown">
                    <i className="demo-icon icon-bell"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* User Info */}
            <div className="user-info">
              <div className="dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <img src={profile} alt="profile-avatar" />
                  <span>Jane Doe</span>
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="profile.html">
                      Profile
                    </a>
                  </li>
                  <li>
                    <button onClick={logout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
