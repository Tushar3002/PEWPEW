import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SimpleBar from "simplebar-react";
function SideBar() {
  const [open, setOpen] = useState(false);
  return (
    <aside id="sidebar">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="sidebar-menu-section">
          <ul>
            <li>
              <NavLink to={"/"} className="active">
                <i className="demo-icon icon-dashboard"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/activity"}>
                <i className="demo-icon icon-activity"></i>
                <span>Activity</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/groups"}>
                <i className="demo-icon icon-users"></i>
                <span>Groups</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/events"}>
                <i className="demo-icon icon-roles"></i>
                <span>Events</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/venues"}>
                <i className="demo-icon icon-location-2"></i>
                <span>Venues</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/roles-permissions"}>
                <i className="demo-icon icon-roles-permission"></i>
                <span>Roles & Permission</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/manage-users"}>
                <i className="demo-icon icon-manage-user"></i>
                <span>Manage Users</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/manage-end-users"}>
                <i className="demo-icon icon-manage-end-users"></i>
                <span>Manage End Users</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/supportTicket"}>
                <i className="demo-icon icon-support-ticket"></i>
                <span>Support Ticket</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/messaging"}>
                <i className="demo-icon icon-messaging-1"></i>
                <span>Messaging</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/reported-users"}>
                <i className="demo-icon icon-reported-uses"></i>
                <span>Reported Users</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/leaderboard"}>
                <i className="demo-icon icon-leaderboard"></i>
                <span>Leaderboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/manage-badges"}>
                <i className="demo-icon icon-manage-badges"></i>
                <span>Manage Badges</span>
              </NavLink>
            </li>

            <li className={`has-submenu ${open ? "open" : ""}`}>
              <a
                href="#"
                className="submenu-toggle d-flex w-100 justify-content-between"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                }}
              >
                <span>
                  <i className="demo-icon icon-masters"></i>
                  <span>Masters</span>
                </span>

                <i className="demo-icon icon-down-arrow"></i>
              </a>

              <ul
                className="submenu"
                style={{ display: open ? "block" : "none" }}
              >
                <li>
                  <NavLink to="/master/prohibited-words">Prohibited Words</NavLink>
                </li>
                <li>
                  <NavLink to="/master/gun">Gun Master</NavLink>
                </li>
                <li>
                  <NavLink to="/master/ammunition">Ammunition Master</NavLink>
                </li>
                <li>
                  <NavLink to="/master/accessories">Accessories Master</NavLink>
                </li>
                <li>
                  <NavLink to="/master/category">Category Master</NavLink>
                </li>

                <li>
                  <NavLink to="/master/manufacturer">Manufacturer Master</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </aside>
  );
}

export default SideBar;
