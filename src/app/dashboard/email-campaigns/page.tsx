"use client"
import SelectFormOption from "./_components/SelectFormOption";

export default function EmailCampaigns() {
  return (
    <div className="py-10 md:px-10 px-4 w-full">
      <h1 className="font-bold md:text-3xl text-xl">Email Campaigns</h1>
      <hr className="border-white/15 my-10" />
      <SelectFormOption />
    </div>
  );
}
