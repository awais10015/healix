import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ChevronUp } from "lucide-react";
import SideBarUser from "@/components/SideBarUser";


export function AppSidebar() {
  return (
    // <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Hello I am header</SidebarHeader>
        <SidebarContent>Hello I am content</SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SideBarUser />
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
     /* </SidebarProvider> */
  );
}
