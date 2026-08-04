import logo from "../assets/images/logo-white.svg";
import profile from "../assets/images/profile-img.png";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header({ toggleSidebar }) {
  const { logout, user } = useAuth();
  const navigate=useNavigate()
  return (
    <header>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center flex-row g-2 g-sm-3 g-xl-4">
          {/* Logo Section */}
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
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col d-flex align-items-center justify-content-end gap-1 gap-sm-3 gap-xl-4">
            {/* Header Icons */}
            <div className="head-icons">
              <ul className="d-flex align-items-center gap-1 gap-sm-3 gap-xl-4">
                <li className="dropdown no-arrow chat-notification">
                  <button
                    type="button"
                    className="dropdown-toggle btn p-0 border-0 bg-transparent"
                    data-bs-toggle="dropdown"
                  >
                    <i className="demo-icon icon-message-2"></i>
                  </button>
                </li>

                <li className="dropdown no-arrow notification">
                  <button
                    type="button"
                    className="dropdown-toggle btn p-0 border-0 bg-transparent"
                    data-bs-toggle="dropdown"
                  >
                    <i className="demo-icon icon-bell"></i>
                  </button>
                </li>
              </ul>
            </div>

            {/* User Info */}
            <div className="user-info">
              <div className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    src={
                      user?.profileImage ? user.profileImageFullPath : profile
                    }
                    alt="Profile"
                  />
                  <span>{user?.userName}</span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button type="button" className="dropdown-item" onClick={()=>{navigate('/profile')}}>
                      Profile
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={logout}
                    >
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
