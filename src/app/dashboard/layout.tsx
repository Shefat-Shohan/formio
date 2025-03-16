"use client";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import SideNav from "./_components/SideNav";
import { Toaster } from "@/components/ui/sonner";

export default function DashBoardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <div className="flex">
        <div>
          <SideNav />
        </div>
        <div className="w-full overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll lg:overflow-hidden h-screen bg-[#212121]">
          {children}
          <Toaster />
        </div>
      </div>
    </SignedIn>
  );
}
