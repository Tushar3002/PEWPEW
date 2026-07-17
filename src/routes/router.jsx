import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login.jsx";
import DashBoard from "../pages/DashBoard/DashBoard.jsx";
import PrivateLayout from "../layouts/PrivateLayout.jsx";
import Activity from "../pages/Activity/Activity.jsx";
import ManageBadges from "../pages/ManageBadges.jsx";
import ManageUser from "../pages/ManageUsers/ManageUser.jsx";
import Events from "../pages/Events.jsx";
import LeaderBoard from "../pages/LeaderBoard.jsx";

import Messaging from "../pages/Messaging.jsx";
import ReportedUsers from "../pages/ReportedUsers.jsx";

import SupportTicket from "../pages/SupportTicket.jsx";
import Venues from "../pages/Venues.jsx";
import ManageUserFormPage from "../pages/ManageUsers/ManageUserFormPage.jsx";
import RolesPermission from "../pages/RolesAndPermissions/RolesPermission.jsx";
import RolesPermissionFormPage from "../pages/RolesAndPermissions/RolesPermissionFormPage.jsx";
import ManageEndUser from "../pages/ManageEndUsers/ManageEndUser.jsx";
import ManageEndUserView from "../pages/ManageEndUsers/View/ManageEndUserView.jsx";
import ActivityDetail from "../pages/Activity/ActivityDetail.jsx";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "manage-users",
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
        children:[
          {
            index:true,
            element: <RolesPermission />,
          },{
            path:"add",
            element:<RolesPermissionFormPage/>
          },{
            path:"edit/:id",
            element:<RolesPermissionFormPage/>
          }
        ]
      },
      {
        path: "/manage-end-users",
        children:[
          {
            index:true,
            element:<ManageEndUser/>
          },
          {
            path:'view/:id',
            element:<ManageEndUserView/>
          }
        ]
      },
      
      {
        path: "/activity",
        children:[
          {
            index:true,
            element:<Activity/>
          },{
            path:"view/:id",
            element:<ActivityDetail/>
          }
        ]
      },
      {
        path: "/manage-badges",
        element: <ManageBadges />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard />,
      },
      {
        path: "/managebadges",
        element: <ManageBadges />,
      },
      
      {
        path: "/messaging",
        element: <Messaging />,
      },
      {
        path: "/reported-users",
        element: <ReportedUsers />,
      },
      
      {
        path: "/supportTicket",
        element: <SupportTicket />,
      },
      {
        path: "/venues",
        element: <Venues />,
      },
    ],
  },
]);
export default router;
