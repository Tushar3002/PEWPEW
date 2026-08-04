import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { MENU_ITEMS } from "../constants/menuConfig";
import { getStorage } from "../utils/storage";

function SideBar() {
  const [open, setOpen] = useState(false);

  const permissions = getStorage("menuList") || [];
  console.log("Permission", permissions);
  const sidebarMenus = useMemo(() => {
    return MENU_ITEMS.map((menu) => {
      // Masters
      if (menu.children) {
        const children = menu.children
          .map((child) => {
            const permission = permissions.find(
              (p) => p.menuName === child.menuName && p.canRead,
            );

            if (!permission) return null;

            return {
              ...child,
              displayName: permission.displayName,
            };
          })
          .filter(Boolean);

        if (children.length === 0) return null;

        return {
          ...menu,
          children,
        };
      }

      // Normal menu
      const permission = permissions.find(
        (p) => p.menuName === menu.menuName && p.canRead,
      );

      if (!permission) return null;

      return {
        ...menu,
        displayName: permission.displayName,
      };
    }).filter(Boolean);
  }, [permissions]);

  return (
    <aside id="sidebar">
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="sidebar-menu-section">
          <ul>
            {sidebarMenus.map((item) => {
              if (item.children) {
                return (
                  <li
                    key={item.menuName}
                    className={`has-submenu ${open ? "open" : ""}`}
                  >
                    <a
                      href="#"
                      className="submenu-toggle d-flex w-100 justify-content-between"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(!open);
                      }}
                    >
                      <span>
                        <i className={`demo-icon ${item.icon}`}></i>
                        <span>{item.displayName ?? "Masters"}</span>
                      </span>

                      <i className="demo-icon icon-down-arrow"></i>
                    </a>

                    <ul
                      className="submenu"
                      style={{
                        display: open ? "block" : "none",
                      }}
                    >
                      {item.children.map((child) => (
                        <li key={child.menuName}>
                          <NavLink to={child.path}>{child.displayName}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.menuName}>
                  <NavLink to={item.path}>
                    <i className={`demo-icon ${item.icon}`}></i>
                    <span>{item.displayName}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </SimpleBar>
    </aside>
  );
}

export default SideBar;
