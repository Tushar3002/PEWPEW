import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login.jsx";
import DashBoard from "../pages/DashBoard/DashBoard.jsx";
import PrivateLayout from "../layouts/PrivateLayout.jsx";
import Activity from "../pages/Activity.jsx";
import ManageBadges from "../pages/ManageBadges.jsx";
import ManageUser from "../pages/ManageUser.jsx";
import ManageUserEdit from "../pages/ManageUserEdit.jsx";
import Events from "../pages/Events.jsx";
import LeaderBoard from "../pages/LeaderBoard.jsx";
import ManageEndUser from "../pages/ManageEndUser.jsx";
import Messaging from "../pages/Messaging.jsx";
import ReportedUsers from "../pages/ReportedUsers.jsx";
import RolesPermission from "../pages/RolesPermission.jsx";
import SupportTicket from "../pages/SupportTicket.jsx";
import Venues from "../pages/Venues.jsx";

const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        element:<PrivateLayout/>,
        children:[
            {
                path:'/',
                element:<DashBoard/>
            },{
                path:'/activity',
                element:<Activity/>
            },{
                path:'/manage-badges',
                element:<ManageBadges/>
            },{
                path:'/manage-users',
                element:<ManageUser/>
            },{
                path:'/manage-users-edit',
                element:<ManageUserEdit/>
            },{
                path:'/events',
                element:<Events/>
            },{
                path:'/leaderboard',
                element:<LeaderBoard/>
            },
            {
                path:'/managebadges',
                element:<ManageBadges/>
            },
            {
                path:'/manage-end-users',
                element:<ManageEndUser/>
            },{
                path:'/messaging',
                element:<Messaging/>
            },{
                path:'/reported-users',
                element:<ReportedUsers/>
            },{
                path:'/roles-permissions',
                element:<RolesPermission/>
            },{
                path:'/supportTicket',
                element:<SupportTicket/>
            },{
                path:'/venues',
                element:<Venues/>
            }
        ]
    
    }
])
export default router;