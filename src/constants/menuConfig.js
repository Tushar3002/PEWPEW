export const MENU_ITEMS = [
    {
        menuName: "Dashboard",
        icon: "icon-dashboard",
        path: "/"
    },
    {
        menuName: "Activity",
        icon: "icon-activity",
        path: "/activity"
    },
    {
        menuName: "Group",
        icon: "icon-users",
        path: "/groups"
    },
    {
        menuName: "Event",
        icon: "icon-roles",
        path: "/events"
    },
    {
        menuName: "Venue",
        icon: "icon-location-2",
        path: "/venues"
    },
    {
        menuName: "Role",
        icon: "icon-roles-permission",
        path: "/roles-permissions"
    },
    {
        menuName: "User",
        icon: "icon-manage-user",
        path: "/manage-users"
    },
    {
        menuName: "EndUser",
        icon: "icon-manage-end-users",
        path: "/manage-end-users"
    },
    {
        menuName: "SupportTicket",
        icon: "icon-support-ticket",
        path: "/supportTicket"
    },
    {
        menuName: "MyMessaging",
        icon: "icon-messaging-1",
        path: "/messaging"
    },
    {
        menuName: "Report",
        icon: "icon-reported-uses",
        path: "/reported-users"
    },
    {
        menuName: "Leaderboard",
        icon: "icon-leaderboard",
        path: "/leaderboard"
    },
    {
        menuName: "Badge",
        icon: "icon-manage-badges",
        path: "/manage-badges"
    },
    {
        menuName: "Masters",
        icon: "icon-masters",
        path: "/master",
        children: [
            {
                menuName: "ProhibitedWord",
                path: "/master/prohibited-words"
            },
            {
                menuName: "GunMaster",
                path: "/master/gun"
            },
            {
                menuName: "Ammunition",
                path: "/master/ammunition"
            },
            {
                menuName: "Accessory",
                path: "/master/accessories"
            },
            {
                menuName: "GunCategoryMaster",
                path: "/master/category"
            },
            {
                menuName: "Manufacturer",
                path: "/master/manufacturer"
            }
        ]
    }
]