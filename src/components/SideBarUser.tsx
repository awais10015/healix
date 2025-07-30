"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

import { UserButton } from "@clerk/nextjs";

const SideBarUser = () => {
  const { user } = useUser();
  return (
    <div className="h-15 flex gap-4 justify-start items-center">
      <UserButton/>
      <p className="text-center">{user?.username || "User"}</p>
    </div>
  );
};

export default SideBarUser;
