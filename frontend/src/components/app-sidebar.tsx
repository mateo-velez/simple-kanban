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
import { KanbanIcon, SquareIcon, SquareKanbanIcon, UserIcon } from "lucide-react"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>
          {/* Add simple kanban icon from lucide */}
          <div className="w-8 h-8">
            <KanbanIcon />
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
            <UserIcon />
            <span className="text-sm text-muted-foreground">John Doe</span>
          </div>
        </SidebarFooter>
      </Sidebar>
    )
  }
  