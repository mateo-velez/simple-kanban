"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { KanbanIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearToken } from "@/auth/utils";
import { Configuration, UsersApi } from "@/api-client";
import { useCallback } from "react";
import { useAuthClient } from "@/hooks/use-auth-client";
import { Spinner } from "./ui/spinner";

export function AppSidebar() {
    const router = useRouter();

    const fetchUser = useCallback(async (config: Configuration) => {
        const userApi = new UsersApi(config);
        return await userApi.getMeApiUsersMeGet();
    }, []);

    const { data: user } = useAuthClient(fetchUser);

    const handleLogout = () => {
        clearToken();
        router.push("/login");
    };

    if (user === null) {
        return (
            <Sidebar>
                <div className="flex items-center justify-center h-full">
                    <Spinner />
                </div>
            </Sidebar>
        );
    }

    return (
        <Sidebar>
            <div className="flex flex-col h-full bg-card-foreground/15">
                <SidebarHeader>
                    <div
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-sm cursor-pointer hover:text-primary"
                        onClick={() => router.push("/boards")}
                    >
                        <KanbanIcon size={28} />
                    </div>
                </SidebarHeader>
                <SidebarContent />
                <SidebarFooter>
                    <div className="flex items-center gap-2 p-2 justify-between">
                        <div
                            className="flex-1 flex items-center gap-2 hover:bg-gray-200 cursor-pointer hover:text-primary rounded-full"
                            onClick={() => router.push("/me")}
                        >
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <UserIcon size={26} />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground">
                                {user?.email?.split("@")[0]}
                            </span>
                        </div>
                        <Button
                            size="icon"
                            className="p-0 bg-red-500 hover:bg-red-800"
                            onClick={handleLogout}
                        >
                            <LogOutIcon />
                        </Button>
                    </div>
                </SidebarFooter>
            </div>
        </Sidebar>
    );
}
