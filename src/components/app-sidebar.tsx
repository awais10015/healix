"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import SideBarUser from "@/components/SideBarUser";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import selectedUserContext from "@/app/context/selectedUserContext";
import trackThemeContext from "@/app/context/trackThemeContext";
import doctorContext from "@/app/context/doctorContext";

type users = {
  _id: string;
  id: string;
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

export function AppSidebar() {
  const [Admin, setAdmin] = useState("");
  const [patients, setPatients] = useState<users[]>([]);
  const [doctors, setDoctors] = useState<users[]>([]);
  const { user } = useUser();
  const{setSelectedUser} = useContext(selectedUserContext)
  const {selectedTheme} = useContext(trackThemeContext)
  const {doctor} = useContext(doctorContext)
  const {setDoctor} = useContext(doctorContext)
  const fetchDoctors = async () => {
    
    const res = await fetch("/api/doctors");
    const data = await res.json();
    setDoctors(data);
  };
let filter = ""

if (selectedTheme === "dark") {
  filter = "invert"
} else if (selectedTheme === "light") {
  filter = ""
}

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (user?.emailAddresses[0].emailAddress === "awais10015@gmail.com") {
      setAdmin("Doctor");
    }
  }, [user]);

  const handleChat = async (docId: string) => {
    
    if (!docId || !user?.id) {
      console.error("Missing participant IDs");
      return;
    }
     if (Admin === "Doctor") {
      const participants = [doctor, docId];
      try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participants }),
      });
      if (!res.ok) {
        throw new Error("Failed to create or fetch chat");
      }
      const newChat = await res.json();
      console.log("Chat ready:", newChat);
    } catch (error) {
      console.error("Chat creation failed:", error);
    }
    } else {
      const participants = [docId, user?.id];
      try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participants }),
      });
      if (!res.ok) {
        throw new Error("Failed to create or fetch chat");
      }
      const newChat = await res.json();
      console.log("Chat ready:", newChat);
    } catch (error) {
      console.error("Chat creation failed:", error);
    }
    }
    
  };
  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <div className={`w-full h-20 flex justify-center items-center border-b-2 ${filter}`}>
          <Image src="/logo.png" alt="logo" height={100} width={130} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {Admin === "Doctor" ? (
          <div className="scrollbar-hide overflow-hidden">
            {patients.map((patient) => (
              <div
                key={patient._id}
                className=" flex gap-2 justify-start items-center p-4 rounded-lg shadow-sm hover:shadow-sm hover:scale-105 transition cursor-pointer"
                onClick={() => {
                  handleChat(patient.clerkId);
                  console.log("patient.id", patient.clerkId)
                  // onSelectUser(patient);
                  setSelectedUser(patient)
                }}
              >
                <Image
                  src={patient.photo}
                  height={40}
                  width={40}
                  alt="dp"
                  className="rounded-full"
                />
                <p>{patient.firstName}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="scrollbar-hide overflow-hidden">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="flex gap-2 justify-start items-center p-4 rounded-lg shadow-sm hover:shadow-sm hover:scale-105 transition cursor-pointer"
                onClick={() => {
                  handleChat(doctor.id);
                  setDoctor(doctor.id)
                  console.log("doctor.id", doctor.id)
                  // onSelectUser(doctor);
                  setSelectedUser(doctor)
                }}
              >
                <Link href={`/chat?doctorId=${doctor.id}`}>
                  <div className="flex gap-3 justify-start items-center">
                    <Image
                      src={doctor.image}
                      height={40}
                      width={40}
                      alt="dp"
                      className="rounded-full"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SideBarUser />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
