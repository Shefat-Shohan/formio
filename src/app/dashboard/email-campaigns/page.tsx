"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SelectFormOption from "./_components/SelectFormOption";

export default function EmailCampaigns() {
  const [loading, setLoading] = useState(false);
  const generateAiInsight = () => {};
  return (
    <div className="py-10 md:px-10 px-4 w-full">
      <h1 className="font-bold md:text-3xl text-xl">Email Campaigns</h1>
      <hr className="border-white/15 my-10" />
      <SelectFormOption />
    </div>
  );
}
