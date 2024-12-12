import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader >
        <div className="flex w-full max-w-sm items-center space-x-1">
          <Input placeholder="Email" />
          <Button type="submit">搜索</Button>
        </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }