"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { KanbanIcon, SquareKanbanIcon, UserIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation";


export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Add simple kanban icon from lucide */}
        <div className="w-8 h-8">
          {/* make it clickable and redirect to home */}
          <KanbanIcon className="cursor-pointer hover:text-primary" onClick={() => router.push('/basic/boards')}/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel><SquareKanbanIcon /> <span className="text-sm text-muted-foreground">Boards</span></SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* add simple user like icon from lucide  and name */}

        <div className="flex items-center gap-2 p-2">
          {/* <UserIcon /> */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">John Doe</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
