import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../auth/Login.jsx";
import DashBoard from "../pages/DashBoard/DashBoard.jsx";
import PrivateLayout from "../layouts/PrivateLayout.jsx";
import Activity from "../pages/Activity/Activity.jsx";
import ManageUser from "../pages/ManageUsers/ManageUser.jsx";
import Events from "../pages/Events/Events.jsx";
import LeaderBoard from "../pages/LeaderBoard/LeaderBoard.jsx";

import Messaging from "../pages/Messaging.jsx";
import ReportedUsers from "../pages/ReportedUsers/ReportedUsers.jsx";

import SupportTicket from "../pages/SupportTicket/SupportTicket.jsx";
import Venues from "../pages/Venue/Venues.jsx";
import ManageUserFormPage from "../pages/ManageUsers/ManageUserFormPage.jsx";
import RolesPermission from "../pages/RolesAndPermissions/RolesPermission.jsx";
import RolesPermissionFormPage from "../pages/RolesAndPermissions/RolesPermissionFormPage.jsx";
import ManageEndUser from "../pages/ManageEndUsers/ManageEndUser.jsx";
import ManageEndUserView from "../pages/ManageEndUsers/View/ManageEndUserView.jsx";
import ActivityDetail from "../pages/Activity/ActivityDetail.jsx";
import VenueDetail from "../pages/Venue/VenueDetail.jsx";
import EventsDetail from "../pages/Events/EventsDetail.jsx";
import Group from "../pages/Groups/Group.jsx";
import GroupDetails from "../pages/Groups/GroupDetails.jsx";
import GroupActivity from "../pages/Groups/GroupActivity.jsx";
import GroupMembers from "../pages/Groups/GroupMembers.jsx";
import GuestRoute from "./GuestRoute.jsx";
import ManageBadges from "../pages/Badges/ManageBadges.jsx";
import ProhibitedWords from "../pages/Master/ProhibitedWords/ProhibitedWords.jsx";
import GunMaster from "../pages/Master/GunMaster/GunMaster.jsx";
import AmmunitionMaster from "../pages/Master/AmmunitionMaster/AmmunitionMaster.jsx";
import Manufacturer from "../pages/Master/ManufacturerMaster/Manufacturer.jsx";
import CategoryMaster from "../pages/Master/CategoryMaster/CategoryMaster.jsx";
import AccessoriesMaster from "../pages/Master/AccessoriesMaster/AccessoriesMaster.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import PermissionRoute from "./PermissionRoute.jsx";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "manage-users",
        element: (
          <PermissionRoute menuName="User">
            <Outlet />
          </PermissionRoute>
        ),
        children: [
          {
            index: true,
            element: <ManageUser />,
          },
          {
            path: "add",
            element: <ManageUserFormPage />,
          },
          {
            path: "edit/:id",
            element: <ManageUserFormPage />,
          },
        ],
      },
      {
        path: "/roles-permissions",
        element: (
          <PermissionRoute menuName="Role">
            <Outlet />
          </PermissionRoute>
        ),
        children: [
          {
            index: true,
            element: <RolesPermission />,
          },
          {
            path: "add",
            element: <RolesPermissionFormPage />,
          },
          {
            path: "edit/:id",
            element: <RolesPermissionFormPage />,
          },
        ],
      },
      {
        path: "/manage-end-users",
        element: (
          <PermissionRoute menuName="EndUser">
            <Outlet />
          </PermissionRoute>
        ),
        children: [
          {
            index: true,
            element: <ManageEndUser />,
          },
          {
            path: "view/:id",
            element: <ManageEndUserView />,
          },
        ],
      },

      {
        path: "/activity",
        element: (
          <PermissionRoute menuName="Activity">
            <Outlet />
          </PermissionRoute>
        ),
        children: [
          {
            index: true,
            element: <Activity />,
          },
          {
            path: "view/:id",
            element: <ActivityDetail />,
          },
        ],
      },
      {
        path: "/venues",

        element: (
          <PermissionRoute menuName="Venue">
            <Outlet />
          </PermissionRoute>
        ),
        children: [
          {
            index: true,
            element: <Venues />,
          },
          {
            path: "add",
            element: <VenueDetail />,
          },
          {
            path: "view/:id",
            element: <VenueDetail />,
          },
        ],
      },
      {
        path: "/events",
        element: (
          <PermissionRoute menuName="Event">
            <Outlet />
          </PermissionRoute>
        ),
        children: [
          {
            index: true,
            element: <Events />,
          },
          {
            path: "view/:id",
            element: <EventsDetail />,
          },
        ],
      },
      {
        path: "/groups",
        element: (
          <PermissionRoute menuName="Group">
            <Outlet />
          </PermissionRoute>
        ),
        children: [
          {
            index: true,
            element: <Group />,
          },
          {
            path: "view/:id",
            children: [
              {
                index: true,
                element: <GroupDetails />,
              },
              {
                path: "members",
                element: <GroupMembers />,
              },
            ],
          },
          {
            path: "activity/:id",
            element: <GroupActivity />,
          },
        ],
      },
      {
        path: "/manage-badges",
        element: (
          <PermissionRoute menuName="Venue">
            <ManageBadges />
          </PermissionRoute>
        ),
      },
      {
        path: "/reported-users",
        element: (
          <PermissionRoute menuName="Venue">
            <ReportedUsers />
          </PermissionRoute>
        ),
      },
      {
        path: "/leaderboard",
        element: (
          <PermissionRoute menuName="Venue">
            <LeaderBoard />
          </PermissionRoute>
        ),
      },
      {
        path: "/messaging",
        element: (
          <PermissionRoute menuName="Venue">
            <Messaging />
          </PermissionRoute>
        ),
      },
      {
        path: "/supportTicket",
        element: (
          <PermissionRoute menuName="Venue">
            <SupportTicket />
          </PermissionRoute>
        ),
      },
      {
        path: "/master",
        children: [
          {
            path: "prohibited-words",
            element: (
              <PermissionRoute menuName="Venue">
                <ProhibitedWords />
              </PermissionRoute>
            ),
          },
          {
            path: "gun",
            element: (
              <PermissionRoute menuName="Venue">
                <GunMaster />
              </PermissionRoute>
            ),
          },
          {
            path: "ammunition",
            element: (
              <PermissionRoute menuName="Venue">
                <AmmunitionMaster />
              </PermissionRoute>
            ),
          },
          {
            path: "accessories",
            element: (
              <PermissionRoute menuName="Venue">
                <AccessoriesMaster />
              </PermissionRoute>
            ),
          },
          {
            path: "category",
            element: (
              <PermissionRoute menuName="Venue">
                <CategoryMaster />
              </PermissionRoute>
            ),
          },
          {
            path: "manufacturer",
            element: (
              <PermissionRoute menuName="Venue">
                <Manufacturer />
              </PermissionRoute>
            ),
          },
        ],
      },
    ],
  },
]);
export default router;
