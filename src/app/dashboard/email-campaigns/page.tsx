"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SelectFormOption from "./_components/SelectFormOption";

export default function EmailCampaigns() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="py-10 md:px-10 px-4 w-full">
        <h1 className="font-bold md:text-3xl text-xl">Email Campaigns</h1>
        <hr className="border-white/15 md:my-10 my-4" />
        <SelectFormOption />
      </div>
    </QueryClientProvider>
  );
}
