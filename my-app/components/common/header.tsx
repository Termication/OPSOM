"use client";

import { Shredder } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="no-underline container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      
      {/* Left: Logo */}
      <div className="flex lg:flex-1">
        <NavLink
          href="/"
          className="no-underline flex items-center gap-2 text-xl font-bold text-gray-900"
        >
          <Shredder
            className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transition duration-200 ease-in-out"
          />
          <span className="font-extrabold lg:text-xl text-gray-900">Opsom</span>
        </NavLink>
      </div>

      {/* Center: Nav Links */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      {/* Right: Auth Actions */}
      <div className="flex lg:justify-end lg:flex-1 items-center gap-4">
        <SignedIn>
          <NavLink href="/upload">Upload PDF</NavLink>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Pro</span>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button variant="outline" asChild>
            <NavLink href="/sign-in">Sign In</NavLink>
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
}
