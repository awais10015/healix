"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar (visible on all screens, hidden via toggle not via Tailwind) */}
        <aside className="w-64 border-r hidden sm:block md:block bg-gray-100">
          <AppSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 relative overflow-hidden">
          {/* <div className="block md:hidden p-2">
            <SidebarTrigger />
          </div> */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
