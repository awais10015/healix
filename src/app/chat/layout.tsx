"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import ChatPage from "./Chat";

type users = {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  image: string;
  name: string;
  firstName: string;
  lastName: string;
  __v: number;
};
// type LayoutProps = {
//   children: React.ReactNode;
//   selectedUser: users | null;
// };
export default function Layout({ children }: { children: React.ReactNode }) {
  const [selectedUser, setSelectedUser] = useState<users | null>(null);
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <aside className="w-64 border-r hidden sm:block md:block bg-gray-100">
          <AppSidebar onSelectUser={setSelectedUser} />
        </aside>

        <main className="flex-1 relative overflow-hidden">
          <ChatPage  />
        </main>
      </div>
    </SidebarProvider>
  );
}
