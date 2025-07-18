"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-20 w-full px-6 md:px-10 flex justify-between items-center text-md relative">
      <div>
        <Link href="/">
          <Image src="/logo.svg" height={150} width={150} alt="logo" />
        </Link>
      </div>

      <div className="hidden md:flex gap-6">
        <Link
          href="/doctors"
          className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
        >
          Doctor
        </Link>
        <Link
          href="/reports"
          className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
        >
          Reports
        </Link>
        <Link
          href="/reviews"
          className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
        >
          Reviews
        </Link>
        <Link
          href="/about"
          className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
        >
          About
        </Link>
      </div>

      <div className="hidden md:flex gap-4 items-center">
        
        <SignedOut>
          {/* <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton> */}
          <Link
            href="/sign-up"
            className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
          >
            SignUp
          </Link>
          <Link
            href="/sign-in"
            className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
          >
            SignIn
          </Link>
        </SignedOut>
<ModeToggle/>
        <SignedIn>
          <Link href="/doctors">
            <button className="bg-black text-white px-4 py-2 rounded-3xl hover:cursor-pointer hover:scale-110 transition-all ease-in-out">
              Consult Now
            </button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 bg-white p-5 right-1 rounded-md  flex flex-col justify-center items-center gap-3 z-50 w-full md:hidden">
          <Link
            href="/doctors"
            className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
          >
            Doctor
          </Link>
          <Link
            href="/reports"
            className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
          >
            Reports
          </Link>
          <Link
            href="/reviews"
            className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
          >
            Reviews
          </Link>
          <Link
            href="/about"
            className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
          >
            About
          </Link>
          <div className="border-t pt-3 mt-2 flex flex-col gap-2 justify-center items-center">
            <div className="cursor-pointer">Login</div>
            <button className="bg-black text-white px-4 py-2 rounded-3xl text-sm">
              Consult Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
