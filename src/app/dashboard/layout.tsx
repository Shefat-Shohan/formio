"use client";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import SideNav from "./_components/SideNav";

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
        <div className="w-full overflow-x-scroll md:overflow-hidden h-screen">
          {children}
        </div>
      </div>
    </SignedIn>
  );
}
