import { role } from "@/constants/role";
import { adminSidebarItem } from "@/routes/adminSidebarItem";
import { userSidebarItem } from "@/routes/userSidebarItem";
import type { TRole } from "@/types";

export const getSidebarItem = (userRole: TRole) => {
    switch (userRole) {
        case role.superAdmin:
            return [...adminSidebarItem];
        case role.admin:
            return [...adminSidebarItem];
        case role.user:
            return [...userSidebarItem];
        default:
            return [];
    }
}