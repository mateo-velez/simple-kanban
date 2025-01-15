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
import { clearToken, getConfig } from "@/auth/utils";
import { UserOut, UsersApi } from "@/api-client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AppSidebar() {
    const router = useRouter();

    const userApi = new UsersApi(getConfig());
    const [user, setUser] = useState<UserOut | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userApi.getMeUsersMeGet();
                setUser(res);
                setIsLoading(false);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch user",
                    variant: "destructive",
                });
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        clearToken();
        router.push("/login");
    };

    if (isLoading) {
        return <div></div>;
    }

    return (
        <Sidebar>
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
                {/* add simple user like icon from lucide  and name */}

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
        </Sidebar>
    );
}
