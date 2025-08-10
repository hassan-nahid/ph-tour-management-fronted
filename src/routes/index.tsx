import App from "@/App";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { generateRoutes } from "@/lib/generateRoutes";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItem } from "./adminSidebarItem";
import { userSidebarItem } from "./userSidebarItem";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: withAuth(About),
                path: "about"
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        path: "/admin",
        children: [
            {index:true, element: <Navigate to="/admin/analytics"/>},
          ...generateRoutes(adminSidebarItem)
        ]
    },
    {
        Component: withAuth(DashboardLayout,role.user as TRole),
        path: "/user",
        children: [
            ...generateRoutes(userSidebarItem)
        ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Verify,
        path: "/verify"
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    },

])