import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
// import { useEffect, useState } from "react";
import ChatPage from "./Chat";
import { Suspense } from "react";

// type users = {
//   _id: string;
//   clerkId: string;
//   email: string;
//   username: string;
//   photo: string;
//   image: string;
//   name: string;
//   firstName: string;
//   lastName: string;
//   __v: number;
// };
// type LayoutProps = {
//   children: React.ReactNode;
//   selectedUser: users | null;
// };
export default function Layout() {
  // const [selectedUser, setSelectedUser] = useState<users | null>(null);
  // useEffect(() => {
  //  console.log(selectedUser)
  // }, [selectedUser])

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <aside className="w-64 border-r hidden sm:block md:block bg-gray-100">
          {/* <AppSidebar onSelectUser={setSelectedUser} /> */}
          <AppSidebar />
        </aside>

        <main className="flex-1 relative overflow-hidden">
          <Suspense fallback={<div>Loading chat...</div>}>
            <ChatPage />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
