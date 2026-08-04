export const MENU_ITEMS = [
    {
        menuName: "Dashboard",
        title: "Dashboard",
        icon: "icon-dashboard",
        path: "/"
    },
    {
        menuName: "Activity",
        title: "Activity",
        icon: "icon-activity",
        path: "/activity"
    },
    {
        menuName: "Group",
        title: "Group",
        icon: "icon-users",
        path: "/groups"
    },
    {
        menuName: "Event",
        title: "Event",
        icon: "icon-roles",
        path: "/events"
    },
    {
        menuName: "Venue",
        title: "Venues",
        icon: "icon-location-2",
        path: "/venues"
    },
    {
        menuName: "Roles",
        title: "Roles & Permission",
        icon: "icon-roles-permission",
        path: "/roles-permissions"
    },
    {
        menuName: "User",
        title: "Manage User",
        icon: "icon-manage-user",
        path: "/manage-users"
    },
    {
        menuName: "EndUser",
        title: "Manage End User",
        icon: "icon-manage-end-users",
        path: "/manage-end-users"
    },
    {
        menuName: "SupportTicket",
        title: "Support Ticket",
        icon: "icon-support-ticket",
        path: "/supportTicket"
    },
    {
        menuName: "Messaging",
        title: "Messaging",
        icon: "icon-messaging-1",
        path: "/messaging"
    },
    {
        menuName: "Report",
        title: "Reported User",
        icon: "icon-reported-uses",
        path: "/reported-users"
    },
    {
        menuName: "Leaderboard",
        title: "Leaderboard",
        icon: "icon-leaderboard",
        path: "/leaderboard"
    },
    {
        menuName: "Badges",
        title: "Manage Badges",
        icon: "icon-manage-badges",
        path: "/manage-badges"
    },
    {
        menuName: "Masters",
        title: "Masters",
        icon: "icon-masters",
        path: "/master",
        children: [
            {
                menuName: "ProhibitedWord",
                title: "Prohibited Words",
                path: "/master/prohibited-words"
            },
            {
                menuName: "GunMaster",
                title: "Gun Master",
                path: "/master/gun"
            },
            {
                menuName: "Ammunition",
                title: "Ammunition Master",
                path: "/master/ammunition"
            },
            {
                menuName: "Accessory",
                title: "Accessories Master",
                path: "/master/accessories"
            },
            {
                menuName: "GunCategoryMaster",
                title: "Category Master",
                path: "/master/category"
            },
            {
                menuName: "Manufacturer",
                title: "Manufacturer Master",
                path: "/master/manufacturer"
            }
        ]
    }
]