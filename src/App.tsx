import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Flow } from "@/components/flow"

// export default function Layout({ children }: { children: React.ReactNode }) {
export default function() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Flow/>
      </main>
    </SidebarProvider>
  )
}