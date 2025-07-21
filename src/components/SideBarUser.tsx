// components/SideBarUser.tsx
"use client"

import { useUser } from "@clerk/nextjs";
import React from 'react';


 import {
  UserButton,
} from "@clerk/nextjs";


const SideBarUser = () => {
  const { user } = useUser();
  return( 
  <>
  <UserButton/>
  <p className="text-center">{user?.username || "User"}</p>
  </>
  )
};

export default SideBarUser;
