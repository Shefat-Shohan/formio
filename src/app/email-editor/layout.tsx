"use client";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
export default function DashBoardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <div className="flex">
        <div className="w-full overflow-x-scroll overflow-y-hidden lg:overflow-hidden h-screen bg-[#212121]">
          {children}
          <Toaster />
        </div>
      </div>
    </SignedIn>
  );
}
