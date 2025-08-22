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
import Homepage from "@/pages/Homepage";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/Payment/Success";
import Cancel from "@/pages/Payment/Cancel";
import Fail from "@/pages/Payment/Fail";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Homepage,
                index: true
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Tours,
                path: "tours"
            },
            {
                Component: TourDetails,
                path: "tours/:id"
            },
            {
                Component: withAuth(Booking),
                path: "booking/:id"
            },
        ]
    },
    {
        Component: withAuth(DashboardLayout,[role.admin as TRole, role.superAdmin as TRole] ),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            ...generateRoutes(adminSidebarItem)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
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
    {
        Component: Success,
        path: "/payment/success"
    },
    {
        Component: Cancel,
        path: "/payment/cancel"
    },
    {
        Component: Fail,
        path: "/payment/fail"
    },

])