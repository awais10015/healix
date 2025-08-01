import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import ChatPage from "./Chat";
import { Suspense } from "react";
import SelectedUserContextProvider from "../context/selectedUserContextProvider";
import Loader from "@/components/Loader";

export default function Layout() {
  
  return (
    <SelectedUserContextProvider>
      <SidebarProvider>
        <div className="flex h-screen w-screen overflow-hidden">
          <aside className="w-64 border-r hidden sm:block md:block bg-gray-100">
            <AppSidebar />
          </aside>

          <main className="flex-1 relative overflow-hidden">
            <Suspense fallback={<Loader/>}>
              <ChatPage />
            </Suspense>
          </main>
        </div>
      </SidebarProvider>
    </SelectedUserContextProvider>
  );
}
