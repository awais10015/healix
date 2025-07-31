"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import trackThemeContext from "@/app/context/trackThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { selectedTheme } = useContext(trackThemeContext);
  let filter = "";

  if (selectedTheme === "dark") {
    filter = "invert";
  } else if (selectedTheme === "light") {
    filter = "";
  }
  return (
    <div className="h-20 w-full px-6 md:px-10 flex justify-between items-center text-md relative">
      <div>
        <Link href="/">
          <Image
            className={`${filter}`}
            src="/logo.svg"
            height={150}
            width={150}
            alt="logo"
          />
        </Link>
      </div>

      <div className="hidden md:flex gap-8">
        <Link
          href="/doctors"
          className="hover:text-orange-800 hover:scale-105 transition-all ease-in-out"
        >
          Consult with Doctor
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
        {/* <SignedOut>
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
        </SignedOut> */}
        <ModeToggle />
        {/* <SignedIn>
          <Link href="/doctors">
            <button className="bg-black text-white px-4 py-2 rounded-3xl hover:cursor-pointer hover:scale-110 transition-all ease-in-out">
              Consult Now
            </button>
          </Link>
          <UserButton />
        </SignedIn> */}
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton className="hover:cursor-pointer" />
            <SignUpButton>
              <button className="bg-[#6c47ff] hover:cursor-pointer text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
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
        <div className="absolute top-20 bg-gray-500 text-lg p-5 right-0 rounded-md  flex flex-col justify-center items-center gap-3 z-50 w-full md:hidden transition-all ease-in-out">
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
          <ModeToggle />
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <div className="flex flex-col">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </div>
      )}
    </div>
  );
};

export default Navbar;
